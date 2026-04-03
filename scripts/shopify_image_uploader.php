<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

date_default_timezone_set('Asia/Kolkata');

// Shopify credentials
define('SHOPIFY_STORE', 'khelan-store.myshopify.com');
define('ACCESS_TOKEN', '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');

$client = new Client();
$downloadDir = __DIR__ . '/downloaded_images';
$backupJsonFile = __DIR__ . '/upload_results.json';
$maxFileSizeMB = 20;
$imageUrls = [
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/banana-raw-burro.jpg',
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/swagathgroceryrestaurant-product_a9f948a3-cb18-35ea-bacf-2d78770fe3d4-0b3bc.jpg',
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/banana-raw-burro.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/banana.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/coconut-mature.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/banana-manzano.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/swagathgroceryrestaurant-swagath-cst-upc-117257-3caf9.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/swagathgroceryrestaurant-250991229004-854d1.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/cfm-sugarcane-4790.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/swagathgroceryrestaurant-coconut-dry-whole-1-6cfd8.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/coconut-young.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/mangoes-green-4311.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/lime.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/guava.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/papaya.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/pomegranate.jpg',
'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/orange-navel.jpg',

    // Add more URLs as needed
];

// Ensure download directory exists
if (!is_dir($downloadDir)) {
    mkdir($downloadDir, 0755, true);
    echo "📁 Created directory: $downloadDir\n";
}

// Load existing results
$existingResults = file_exists($backupJsonFile) ? json_decode(file_get_contents($backupJsonFile), true) : [];
$uploadedFiles = [];

foreach ($imageUrls as $index => $url) {
    echo "\n🔄 Processing " . ($index + 1) . "/" . count($imageUrls) . ": $url\n";

    // Download image
    try {
        $response = $client->get($url, ['headers' => ['User-Agent' => 'Mozilla/5.0']]);
        $body = $response->getBody()->getContents();

        $fileSizeMB = strlen($body) / (1024 * 1024);
        if ($fileSizeMB > $maxFileSizeMB) {
            echo "⚠️  File size {$fileSizeMB}MB exceeds {$maxFileSizeMB}MB limit\n";
            continue;
        }

        $filename = basename(parse_url($url, PHP_URL_PATH));
        $localPath = "$downloadDir/$filename";
        file_put_contents($localPath, $body);
        echo "✅ Downloaded locally: $localPath ({$fileSizeMB}MB)\n";
    } catch (Exception $e) {
        echo "❌ Download error: {$e->getMessage()}\n";
        continue;
    }

    // Convert to JPG with Intervention Image
    try {
        $imageManager = new ImageManager(new Driver());
        $image = $imageManager->read($localPath);
        
        // Convert non-RGB images
        $mimeType = mime_content_type($localPath);

        if ($mimeType !== 'image/jpeg') {
            $jpgFilename = pathinfo($filename, PATHINFO_FILENAME) . '.jpg';
            $jpgPath = "$downloadDir/$jpgFilename";
            $image->toJpeg(95)->save($jpgPath);
            echo "🔄 Converted to JPG: $jpgPath\n";
        } else {
            $jpgPath = $localPath;
        }

        // Staged Upload to Shopify
        $uploadResult = uploadImageToShopifyStaged($jpgPath);
        if ($uploadResult) {
            $uploadedFiles[] = [
                'timestamp' => date('c'),
                'original_url' => $url,
                'local_path' => $jpgPath,
                'status' => 'uploaded',
                'shopify_id' => $uploadResult['id'] ?? null,
                'shopify_url' => $uploadResult['url'] ?? null,
            ];
        } else {
            echo "❌ Upload failed\n";
        }

    } catch (Exception $e) {
        echo "❌ Conversion/Upload error: {$e->getMessage()}\n";
    }
}

// Save results
file_put_contents($backupJsonFile, json_encode(array_merge($existingResults, $uploadedFiles), JSON_PRETTY_PRINT));
echo "\n💾 Results saved to $backupJsonFile\n";

echo "\n=== Summary ===\n";
echo "Total processed: " . count($imageUrls) . "\n";
echo "Successfully uploaded: " . count($uploadedFiles) . "\n";
echo "Failed: " . (count($imageUrls) - count($uploadedFiles)) . "\n";

/**
 * Upload image to Shopify using staged upload process
 */
function uploadImageToShopifyStaged($imagePath)
{
    global $client;

    $filename = basename($imagePath);
    $mimeType = mime_content_type($imagePath);
    $fileSize = filesize($imagePath);

    try {
        // Step 1: Request a staging URL from Shopify
        $stagingMutation = <<<GQL
        mutation generateStagedUpload {
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

        $response = $client->post("https://" . SHOPIFY_STORE . "/admin/api/2024-07/graphql.json", [
            'headers' => [
                'X-Shopify-Access-Token' => ACCESS_TOKEN,
                'Content-type' => 'application/json',
            ],
            'json' => [
                'query' => $stagingMutation,
            ]
        ]);

        $responseData = json_decode($response->getBody(), true);
        
        if (isset($responseData['errors'])) {
            echo "❌ Staging request errors: \n";
            print_r($responseData['errors']);
            return false;
        }

        if (isset($responseData['data']['stagedUploadsCreate']['userErrors']) && !empty($responseData['data']['stagedUploadsCreate']['userErrors'])) {
            echo "❌ Staging user errors: \n";
            print_r($responseData['data']['stagedUploadsCreate']['userErrors']);
            return false;
        }

        $uploadInfo = $responseData['data']['stagedUploadsCreate']['stagedTargets'][0] ?? null;
        if (!$uploadInfo) {
            echo "❌ Failed to get staging upload URL\n";
            return false;
        }

        $uploadUrl = $uploadInfo['url'];
        $resourceUrl = $uploadInfo['resourceUrl'];
        $parameters = $uploadInfo['parameters'];

        echo "📤 Got staging URL, uploading file...\n";

        // Step 2: Upload file to Shopify's staging server
        $multipart = [];
        foreach ($parameters as $param) {
            $multipart[] = [
                'name' => $param['name'],
                'contents' => $param['value']
            ];
        }
        $multipart[] = [
            'name' => 'file',
            'contents' => fopen($imagePath, 'r'),
            'filename' => $filename,
        ];

        $uploadResponse = $client->post($uploadUrl, [
            'multipart' => $multipart,
            'timeout' => 120, // 2 minutes timeout for large files
        ]);

        $uploadStatusCode = $uploadResponse->getStatusCode();
        if ($uploadStatusCode !== 204 && $uploadStatusCode !== 201) {
            echo "❌ File upload to staging failed. HTTP $uploadStatusCode\n";
            return false;
        }

        echo "✅ File uploaded to staging server (HTTP $uploadStatusCode)\n";

        // Step 3: Register file in Shopify Files
        $registerMutation = <<<GQL
        mutation fileCreate {
            fileCreate(files: [{
                originalSource: "$resourceUrl",
                alt: "Uploaded from S3"
            }]) {
                files {
                    id
                    alt
                    preview {
                        image {
                            url
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
        GQL;

        $registerResponse = $client->post("https://" . SHOPIFY_STORE . "/admin/api/2024-07/graphql.json", [
            'headers' => [
                'X-Shopify-Access-Token' => ACCESS_TOKEN,
                'Content-type' => 'application/json',
            ],
            'json' => [
                'query' => $registerMutation,
            ]
        ]);

        $registerData = json_decode($registerResponse->getBody(), true);
        
        if (isset($registerData['errors'])) {
            echo "❌ File registration errors: \n";
            print_r($registerData['errors']);
            return false;
        }

        if (isset($registerData['data']['fileCreate']['userErrors']) && !empty($registerData['data']['fileCreate']['userErrors'])) {
            echo "❌ File registration user errors: \n";
            print_r($registerData['data']['fileCreate']['userErrors']);
            return false;
        }

        if (isset($registerData['data']['fileCreate']['files'][0])) {
            $fileInfo = $registerData['data']['fileCreate']['files'][0];
            echo "✅ Uploaded to Shopify:\n";
            echo "   • ID: {$fileInfo['id']}\n";
            if (isset($fileInfo['preview']['image']['url'])) {
                echo "   • Preview URL: {$fileInfo['preview']['image']['url']}\n";
            }
            return [
                'id' => $fileInfo['id'],
                'url' => $fileInfo['preview']['image']['url'] ?? null,
            ];
        } else {
            echo "❌ File registration failed (No file data returned)\n";
            return false;
        }

    } catch (Exception $e) {
        echo "❌ Staged upload error: {$e->getMessage()}\n";
        return false;
    }
}
?>