<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

date_default_timezone_set('Asia/Kolkata');

// Shopify credentials
define('SHOPIFY_STORE', 'khelan-store.myshopify.com'); // ✅ replace!
define('ACCESS_TOKEN', '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'); // ✅ replace!

$client = new Client([
    'base_uri' => "https://" . SHOPIFY_STORE . "/admin/api/2024-07/",
    'headers' => [
        'X-Shopify-Access-Token' => ACCESS_TOKEN,
        'Content-Type' => 'application/json',
    ],
]);

$downloadDir = __DIR__ . '/downloaded_images';
if (!is_dir($downloadDir)) {
    mkdir($downloadDir, 0755, true);
}

$csvFile = __DIR__ . '/products_list.csv'; // ✅ adjust file name
$rows = array_map('str_getcsv', file($csvFile));
$headers = array_map('trim', array_shift($rows));

// Convert CSV rows to associative arrays
$data = [];
foreach ($rows as $row) {
    $data[] = array_combine($headers, $row);
}

$imageManager = new ImageManager(new Driver());

// Step 1: Group rows by product handle
$groupedProducts = [];
foreach ($data as $row) {
    $handle = $row['Handle'] ?? '';
    if (!isset($groupedProducts[$handle])) {
        $groupedProducts[$handle] = [];
    }
    $groupedProducts[$handle][] = $row;
}

foreach ($groupedProducts as $handle => $productVariants) {
    $firstRow = $productVariants[0];
    echo "\n🔄 Processing product: {$firstRow['Title']}\n";

    // Check if product already exists
    $existingResponse = $client->get('products.json', [
        'query' => ['title' => trim($firstRow['Title'])],
    ]);
    $existingProducts = json_decode($existingResponse->getBody(), true);

    $found = false;
    if (!empty($existingProducts['products'])) {
        foreach ($existingProducts['products'] as $existingProduct) {
            if (strcasecmp(trim($existingProduct['title']), trim($firstRow['Title'])) === 0) {
                $found = true;
                break;
            }
        }
    }
    if ($found) {
        echo "❌ Product '{$firstRow['Title']}' already exists. Skipping.\n";
        continue;
    }

    // ✅ Upload all images before creating the product
    $imageUrls = array_map('trim', explode(',', $firstRow['Image Src'] ?? ''));
    $uploadedImages = []; // store [original_url => resource_url]

    foreach ($imageUrls as $imageUrl) {
        if (!$imageUrl) continue;

        try {
            $imageData = @file_get_contents($imageUrl);
            if ($imageData === false) throw new Exception("Failed download");

            $filename = basename(parse_url($imageUrl, PHP_URL_PATH));
            $localPath = "$downloadDir/$filename";
            file_put_contents($localPath, $imageData);

            $mimeType = mime_content_type($localPath);
            if ($mimeType !== 'image/jpeg') {
                $jpgPath = "$downloadDir/" . pathinfo($filename, PATHINFO_FILENAME) . '.jpg';
                $imageManager->read($localPath)->toJpeg(90)->save($jpgPath);
                $localPath = $jpgPath;
            }

            $uploadedImage = uploadImageToShopifyProduct($client, $localPath);
            if ($uploadedImage) {
                $uploadedImages[$imageUrl] = $uploadedImage;
            }

        } catch (Exception $e) {
            echo "❌ Image error: {$e->getMessage()}\n";
            continue;
        }
    }

    // ✅ Build images payload
    $imagesPayload = [];
    foreach ($uploadedImages as $originalUrl => $resourceUrl) {
        $imagesPayload[] = ["src" => $resourceUrl];
    }

    // ✅ Build variants
    $variants = [];
    foreach ($productVariants as $variantRow) {
        $variants[] = [
            "sku" => $variantRow['Variant SKU'] ?? '',
            "inventory_management" => strtolower($variantRow['Variant Inventory Tracker'] ?? 'shopify'),
            "inventory_policy" => strtolower($variantRow['Variant Inventory Policy'] ?? 'deny'),
            "fulfillment_service" => $variantRow['Variant Fulfillment Service'] ?? 'manual',
            "price" => $variantRow['Variant Price'] ?? '0',
            "compare_at_price" => $variantRow['Variant Compare At Price'] ?? null,
            "requires_shipping" => ($variantRow['Variant Requires Shipping'] ?? 'TRUE') === 'TRUE',
            "taxable" => ($variantRow['Variant Taxable'] ?? 'TRUE') === 'TRUE',
            "barcode" => $variantRow['Variant Barcode'] ?? '',
            "cost" => $variantRow['Cost per item'] ?? '0',
            "tax_code" => $variantRow['Variant Tax Code'] ?? null,
            "option1" => $variantRow['Option1 Value'] ?? null,
            "option2" => $variantRow['Option2 Value'] ?? null,
            "option3" => $variantRow['Option3 Value'] ?? null,
        ];
    }

    // ✅ Build options array
    $options = [];
    $optionNames = [];
    for ($i = 1; $i <= 3; $i++) {
        $name = trim($firstRow["Option{$i} Name"] ?? '');
        $value = trim($firstRow["Option{$i} Value"] ?? '');
        if ($name && $value && !in_array($name, $optionNames)) {
            $options[] = [
                "name" => $name,
                "values" => [$value],
            ];
            $optionNames[] = $name;
        }
    }

    // ✅ Build final product payload
    $productData = [
        "product" => [
            "handle" => $firstRow['Handle'] ?? '',
            "title" => $firstRow['Title'],
            "body_html" => $firstRow['Body (HTML)'] ?? '',
            "vendor" => $firstRow['Vendor'] ?? '',
            "product_type" => $firstRow['Type'] ?? '',
            "tags" => $firstRow['Tags'] ?? '',
            "published" => ($firstRow['Published'] ?? 'TRUE') === 'TRUE',
            "status" => strtolower($firstRow['Status column value show in shopify'] ?? 'active'),
            "options" => $options,
            "variants" => $variants,
            "images" => $imagesPayload,
        ]
    ];

    // ✅ Create product
    try {
        $response = $client->post('products.json', ['json' => $productData]);
        $created = json_decode($response->getBody(), true);
        $productId = $created['product']['id'];
        echo "✅ Created product ID: $productId with " . count($variants) . " variants.\n";
    } catch (Exception $e) {
        echo "❌ Product creation error: {$e->getMessage()}\n";
        continue;
    }

    // ✅ Get created product to retrieve image IDs
    $productResponse = $client->get("products/$productId.json");
    $productDetails = json_decode($productResponse->getBody(), true);
    $images = $productDetails['product']['images'] ?? [];

    // ✅ Associate each variant with its image_id (example logic: first image to first variant, adjust as needed)
    foreach ($productDetails['product']['variants'] as $index => $variant) {
        $variantId = $variant['id'];
        $imageId = $images[$index]['id'] ?? null;

        if ($imageId) {
            try {
                $client->put("variants/{$variantId}.json", [
                    'json' => ['variant' => ['id' => $variantId, 'image_id' => $imageId]],
                ]);
                echo "✅ Associated variant $variantId with image $imageId\n";
            } catch (Exception $e) {
                echo "❌ Variant image association error: {$e->getMessage()}\n";
            }
        }
    }
}


// ✅ Staged upload function
function uploadImageToShopifyProduct($client, $imagePath) {
    $filename = basename($imagePath);
    $mimeType = mime_content_type($imagePath);
    $fileSize = filesize($imagePath);

    try {
        $mutation = <<<GQL
        mutation {
            stagedUploadsCreate(input: [{
                resource: FILE,
                filename: "$filename",
                mimeType: "$mimeType",
                fileSize: "$fileSize",
                httpMethod: POST
            }]) {
                stagedTargets {
                    url
                    resourceUrl
                    parameters {
                        name
                        value
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
        GQL;

        $response = $client->post('graphql.json', ['json' => ['query' => $mutation]]);
        $data = json_decode($response->getBody(), true);

        if (!empty($data['errors']) || !empty($data['data']['stagedUploadsCreate']['userErrors'])) {
            print_r($data['errors'] ?? $data['data']['stagedUploadsCreate']['userErrors']);
            return false;
        }

        $uploadInfo = $data['data']['stagedUploadsCreate']['stagedTargets'][0];
        $uploadUrl = $uploadInfo['url'];
        $resourceUrl = $uploadInfo['resourceUrl'];
        $params = $uploadInfo['parameters'];

        $multipart = [];
        foreach ($params as $param) {
            $multipart[] = ['name' => $param['name'], 'contents' => $param['value']];
        }
        $multipart[] = ['name' => 'file', 'contents' => fopen($imagePath, 'r'), 'filename' => $filename];

        $uploadResponse = (new Client())->post($uploadUrl, [
            'multipart' => $multipart,
            'timeout' => 120,
        ]);

        if (!in_array($uploadResponse->getStatusCode(), [200, 201, 204])) {
            echo "❌ Upload HTTP error: {$uploadResponse->getStatusCode()}\n";
            return false;
        }

        echo "✅ Uploaded to staging server.\n";
        return $resourceUrl;

    } catch (Exception $e) {
        echo "❌ Staged upload error: {$e->getMessage()}\n";
        return false;
    }
}
