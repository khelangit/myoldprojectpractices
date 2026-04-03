<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Pool;
use GuzzleHttp\Exception\RequestException;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

date_default_timezone_set('Asia/Kolkata');

// 🔑 Shopify credentials
define('SHOPIFY_STORE', 'khelan-store.myshopify.com'); // ✅ replace
define('ACCESS_TOKEN', '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'); // ✅ replace

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

// ✅ Load CSV data
$csvFile = __DIR__ . '/products_list.csv'; // adjust file name
$rows = array_map('str_getcsv', file($csvFile));
$headers = array_map('trim', array_shift($rows));

$data = [];
foreach ($rows as $row) {
    $data[] = array_combine($headers, $row);
}

// ✅ Image manager
$imageManager = new ImageManager(new Driver());

// ✅ Async image downloads using Guzzle Pool
$httpClient = new Client();

echo "🔄 Starting async image downloads...\n";

$imageRequests = function () use ($data, $downloadDir, $httpClient) {
    foreach ($data as $index => $product) {
        $imageUrl = trim($product['Image Src'] ?? '');
        if (empty($imageUrl)) continue;

        $filename = basename(parse_url($imageUrl, PHP_URL_PATH));
        $localPath = "$downloadDir/$filename";

        yield function() use ($httpClient, $imageUrl, $localPath, $index) {
            return $httpClient->getAsync($imageUrl, ['sink' => $localPath]);
        };
    }
};

$pool = new Pool($httpClient, $imageRequests(), [
    'concurrency' => 3,
    'fulfilled' => function ($response, $index) {
        echo "✅ Image downloaded #$index\n";
    },
    'rejected' => function (RequestException $e, $index) {
        echo "❌ Image download failed #$index: {$e->getMessage()}\n";
    },
]);

$promise = $pool->promise();
$promise->wait();

echo "✅ All images downloaded.\n";

// ✅ Process each product
foreach ($data as $index => $product) {
    echo "\n🔄 Processing product #" . ($index + 1) . ": {$product['Title']}\n";

    // ✅ Prepare image path
    $imageUrl = trim($product['Image Src'] ?? '');
    if (empty($imageUrl)) {
        echo "⚠️ No Image Src. Skipping.\n";
        continue;
    }
    $filename = basename(parse_url($imageUrl, PHP_URL_PATH));
    $localPath = "$downloadDir/$filename";

    // ✅ Convert to JPEG if needed
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

    // ✅ Upload image to staging server via GraphQL
    $uploadedImage = uploadImageToShopifyProduct($client, $localPath);
    if (!$uploadedImage) {
        echo "❌ Image upload failed. Skipping product.\n";
        continue;
    }

    // ✅ Build product payload
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
            "variants" => [[
                "sku" => $product['Variant SKU'] ?? '',
                "price" => $product['Variant Price'] ?? '0',
                "inventory_management" => "shopify",
                "inventory_policy" => "deny",
                "fulfillment_service" => "manual",
                "requires_shipping" => true,
                "taxable" => true,
                // "weight" => isset($product['Variant Grams']) ? ((float)$product['Variant Grams']) / 1000 : 0,
                // "weight_unit" => $product['Variant Weight Unit'] ?? 'kg',
                "image" => [
                    "src" => $uploadedImage,
                ]
            ]],
            "images" => [[
                "src" => $uploadedImage,
            ]],
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

echo "\n🎉 All done!\n";
