<?php
require_once 'vendor/autoload.php';

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

foreach ($data as $index => $product) {
    echo "\n🔄 Processing product #" . ($index + 1) . ": {$product['Title']}\n";

    // ✅ Check if product with same title exists
    try {
        $existingResponse = $client->get('products.json', [
            'query' => ['title' => $product['Title']],
        ]);
        $existingProducts = json_decode($existingResponse->getBody(), true);

        $found = false;
        if (!empty($existingProducts['products'])) {
            foreach ($existingProducts['products'] as $existingProduct) {
                if (strcasecmp(trim($existingProduct['title']), trim($product['Title'])) === 0) {
                    $found = true;
                    break;
                }
            }
        }

        if ($found) {
            echo "❌ Product '{$product['Title']}' already exists. Skipping.\n";
            continue;
        }
    } catch (Exception $e) {
        echo "❌ Error checking existing: {$e->getMessage()}\n";
        continue;
    }

    // ✅ Download image
    $imageUrl = trim($product['Image Src'] ?? '');
    if (empty($imageUrl)) {
        echo "⚠️  No Image Src. Skipping.\n";
        continue;
    }

    $filename = basename(parse_url($imageUrl, PHP_URL_PATH));
    $localPath = "$downloadDir/$filename";

    try {
        $imageData = file_get_contents($imageUrl);
        if ($imageData === false) throw new Exception("Failed download");
        file_put_contents($localPath, $imageData);
        echo "✅ Downloaded image: $localPath\n";
    } catch (Exception $e) {
        echo "❌ Download error: {$e->getMessage()}\n";
        continue;
    }

    // ✅ Convert to JPEG
    try {
        $mimeType = mime_content_type($localPath);
        if ($mimeType !== 'image/jpeg') {
            $jpgPath = "$downloadDir/" . pathinfo($filename, PATHINFO_FILENAME) . '.jpg';
            $imageManager->read($localPath)->toJpeg(90)->save($jpgPath);
            $localPath = $jpgPath;
            echo "🔄 Converted to JPEG: $localPath\n";
        }
    } catch (Exception $e) {
        echo "❌ Conversion error: {$e->getMessage()}\n";
        continue;
    }

    // ✅ Upload image (staged)
    $uploadedImage = uploadImageToShopifyProduct($client, $localPath);
    if (!$uploadedImage) {
        echo "❌ Image upload failed. Skipping product.\n";
        continue;
    }

    // ✅ Options
    $options = [];
    for ($i = 1; $i <= 3; $i++) {
        $name = $product["Option{$i} Name"] ?? '';
        $value = $product["Option{$i} Value"] ?? '';
        if ($name && $value) {
            $options[] = [
                "name" => $name,
                "values" => [$value],
            ];
        }
    }

    // ✅ Metafields
    $metafields = [];
    if (!empty($product['Food product form (product.metafields.shopify.food-product-form)'])) {
        $metafields[] = [
            "namespace" => "shopify",
            "key" => "food-product-form",
            "value" => $product['Food product form (product.metafields.shopify.food-product-form)'],
            "type" => "single_line_text_field",
        ];
    }
    if (!empty($product['Snowboard binding mount (product.metafields.test_data.binding_mount)'])) {
        $metafields[] = [
            "namespace" => "test_data",
            "key" => "binding_mount",
            "value" => $product['Snowboard binding mount (product.metafields.test_data.binding_mount)'],
            "type" => "single_line_text_field",
        ];
    }
    if (!empty($product['Snowboard length (product.metafields.test_data.snowboard_length)'])) {
        $metafields[] = [
            "namespace" => "test_data",
            "key" => "snowboard_length",
            "value" => $product['Snowboard length (product.metafields.test_data.snowboard_length)'],
            "type" => "single_line_text_field",
        ];
    }

    // ✅ Final product payload
    $productData = [
        "product" => [
            "handle" => $product['Handle'] ?? '',
            "title" => $product['Title'],
            "body_html" => $product['Body (HTML)'] ?? '',
            "vendor" => $product['Vendor'] ?? '',
            "product_type" => $product['Type'] ?? '',
            "tags" => $product['Tags'] ?? '',
            "published" => ($product['Published'] ?? 'TRUE') === 'TRUE',
            "status" => strtolower($product['Status column value show in shopify'] ?? 'active'),
            "options" => $options,
            "variants" => [[
                "sku" => $product['Variant SKU'] ?? '',
                "grams" => (int)($product['Variant Grams'] ?? 0),
                "inventory_management" => strtolower($product['Variant Inventory Tracker'] ?? 'shopify'),
                "inventory_policy" => strtolower($product['Variant Inventory Policy'] ?? 'deny'),
                "fulfillment_service" => $product['Variant Fulfillment Service'] ?? 'manual',
                "price" => $product['Variant Price'] ?? '0',
                "compare_at_price" => $product['Variant Compare At Price'] ?? null,
                "requires_shipping" => ($product['Variant Requires Shipping'] ?? 'TRUE') === 'TRUE',
                "taxable" => ($product['Variant Taxable'] ?? 'TRUE') === 'TRUE',
                "barcode" => $product['Variant Barcode'] ?? '',
                // "weight" => isset($product['Variant Grams']) ? ((float)$product['Variant Grams']) / 1000 : 0,
                // "weight_unit" => $product['Variant Weight Unit'] ?? 'kg',
                "cost" => $product['Cost per item'] ?? '0',
                "tax_code" => $product['Variant Tax Code'] ?? null,
                "image" => [
                    "src" => $uploadedImage,
                ]
            ]],
            "images" => [[
            "src" => $uploadedImage,
            "position" => (int)($product['Image Position'] ?? 1),
            "alt" => $product['Image Alt Text'] ?? '',
        ]],
            "metafields" => $metafields,
        ]
    ];

    // ✅ Create product
    try {
        $response = $client->post('products.json', ['json' => $productData]);
        $created = json_decode($response->getBody(), true);
        echo "✅ Created product ID: {$created['product']['id']}\n";
    } catch (Exception $e) {
        echo "❌ Product creation error: {$e->getMessage()}\n";
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
