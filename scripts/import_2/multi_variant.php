<?php

// Configuration
$shopifyConfig = [
    'shop_domain' => 'khelan-store.myshopify.com',
    'access_token' => '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',
    'api_version' => '2023-10'
];

$csvFile = 'products_export-3.csv';
$imageDownloadPath = 'downloaded_images/';

// Create image download directory
if (!file_exists($imageDownloadPath)) {
    mkdir($imageDownloadPath, 0777, true);
}

class ShopifyCSVImporter {
    private $shopDomain;
    private $accessToken;
    private $apiVersion;
    private $imageDownloadPath;
    
    public function __construct($config, $imageDownloadPath) {
        $this->shopDomain = $config['shop_domain'];
        $this->accessToken = $config['access_token'];
        $this->apiVersion = $config['api_version'];
        $this->imageDownloadPath = $imageDownloadPath;
    }
    
    /**
     * Process CSV file and import products
     */
    public function processCSV($csvFile) {
        echo "Reading CSV file: {$csvFile}\n";
        $csvData = $this->readCSV($csvFile);
        echo "Found " . count($csvData) . " rows in CSV\n";
        
        $products = $this->groupProductVariants($csvData);
        echo "Grouped into " . count($products) . " products\n";
        
        // Test API connection first
        if (!$this->testAPIConnection()) {
            echo "ERROR: Cannot connect to Shopify API. Please check your credentials.\n";
            return;
        }
        
        foreach ($products as $productHandle => $productData) {
            echo "\n--- Processing product: {$productHandle} ---\n";
            echo "Product title: " . $productData['main_data']['Title'] . "\n";
            echo "Number of variants: " . count($productData['variants']) . "\n";
            
            // Download images
            $images = $this->downloadProductImages($productData);
            echo "Downloaded " . count($images) . " images\n";
            
            // Create/Update product in Shopify
            $result = $this->createOrUpdateProduct($productData, $images);
            
            if ($result) {
                echo "✓ Product processed successfully\n";
            } else {
                echo "✗ Failed to process product\n";
            }
            
            // Add delay to avoid rate limiting
            sleep(1);
        }
    }
    
    /**
     * Read CSV file
     */
    private function readCSV($csvFile) {
        $data = [];
        if (($handle = fopen($csvFile, "r")) !== FALSE) {
            $headers = fgetcsv($handle, 1000, ",", '"', "\\");
            
            while (($row = fgetcsv($handle, 1000, ",", '"', "\\")) !== FALSE) {
                if (count($row) == count($headers)) {
                    $data[] = array_combine($headers, $row);
                }
            }
            fclose($handle);
        }
        return $data;
    }
    
    /**
     * Group CSV rows by product handle (variants belong to same product)
     */
    private function groupProductVariants($csvData) {
        $products = [];
        
        foreach ($csvData as $row) {
            $handle = trim($row['Handle']);
            if (empty($handle)) continue;
            
            if (!isset($products[$handle])) {
                $products[$handle] = [
                    'main_data' => $row,
                    'variants' => []
                ];
            }
            
            // If this row has variant data, add it as a variant
            if (!empty($row['Option1 Value']) || !empty($row['Variant Price'])) {
                $products[$handle]['variants'][] = $row;
            }
        }
        
        return $products;
    }
    
    /**
     * Test API connection
     */
    private function testAPIConnection() {
        echo "Testing Shopify API connection...\n";
        $response = $this->makeShopifyRequest('GET', '/shop.json');
        
        if ($response && isset($response['shop'])) {
            echo "✓ API connection successful\n";
            echo "Shop: " . $response['shop']['name'] . "\n";
            echo "Domain: " . $response['shop']['domain'] . "\n";
            return true;
        } else {
            echo "✗ API connection failed\n";
            return false;
        }
    }
    private function downloadProductImages($productData) {
        $images = [];
        $mainData = $productData['main_data'];
        
        // Download main product image
        if (!empty($mainData['Image Src'])) {
            $imageUrl = trim($mainData['Image Src']);
            $localPath = $this->downloadImage($imageUrl, $mainData['Handle'] . '_main');
            if ($localPath) {
                $images[] = [
                    'local_path' => $localPath,
                    'position' => 1,
                    'alt_text' => $mainData['Image Alt Text'] ?? ''
                ];
            }
        }
        
        // Download variant images
        foreach ($productData['variants'] as $index => $variant) {
            if (!empty($variant['Variant Image'])) {
                $imageUrl = trim($variant['Variant Image']);
                $localPath = $this->downloadImage($imageUrl, $mainData['Handle'] . '_variant_' . $index);
                if ($localPath) {
                    $images[] = [
                        'local_path' => $localPath,
                        'position' => $index + 2,
                        'alt_text' => $variant['Image Alt Text'] ?? ''
                    ];
                }
            }
        }
        
        return $images;
    }
    
    /**
     * Download single image
     */
    private function downloadImage($imageUrl, $filename) {
        if (empty($imageUrl)) return false;
        
        $extension = pathinfo($imageUrl, PATHINFO_EXTENSION);
        if (empty($extension)) $extension = 'jpg';
        
        $localPath = $this->imageDownloadPath . $filename . '.' . $extension;
        
        // Skip if already downloaded
        if (file_exists($localPath)) {
            return $localPath;
        }
        
        try {
            $imageData = file_get_contents($imageUrl);
            if ($imageData !== false) {
                file_put_contents($localPath, $imageData);
                echo "Downloaded: {$imageUrl} -> {$localPath}\n";
                return $localPath;
            }
        } catch (Exception $e) {
            echo "Error downloading image {$imageUrl}: " . $e->getMessage() . "\n";
        }
        
        return false;
    }
    
    /**
     * Create or update product in Shopify
     */
    private function createOrUpdateProduct($productData, $images) {
        $mainData = $productData['main_data'];
        
        // Check if product already exists
        $existingProduct = $this->getProductByHandle($mainData['Handle']);
        
        if ($existingProduct) {
            echo "Product already exists, updating...\n";
            return $this->updateProduct($existingProduct['id'], $productData, $images);
        } else {
            echo "Creating new product...\n";
            return $this->createProduct($productData, $images);
        }
    }
    
    /**
     * Create new product
     */
    private function createProduct($productData, $images) {
        $mainData = $productData['main_data'];
        
        // Prepare product data
        $product = [
            'title' => $mainData['Title'],
            'body_html' => $mainData['Body (HTML)'],
            'vendor' => $mainData['Vendor'],
            'product_type' => $mainData['Type'],
            'tags' => $mainData['Tags'],
            'published' => $mainData['Published'] === 'true',
            'handle' => $mainData['Handle'],
            'status' => $mainData['Status'] === 'active' ? 'active' : 'draft',
            'variants' => []
        ];
        
        // Add SEO data
        if (!empty($mainData['SEO Title']) || !empty($mainData['SEO Description'])) {
            $product['seo'] = [
                'title' => $mainData['SEO Title'] ?? '',
                'description' => $mainData['SEO Description'] ?? ''
            ];
        }
        
        // Add variants
        foreach ($productData['variants'] as $variantData) {
            $variant = [
                'option1' => $variantData['Option1 Value'] ?? 'Default Title',
                'option2' => $variantData['Option2 Value'] ?? null,
                'option3' => $variantData['Option3 Value'] ?? null,
                'price' => $variantData['Variant Price'],
                'sku' => $variantData['Variant SKU'] ?? '',
                'inventory_policy' => $variantData['Variant Inventory Policy'] ?? 'deny',
                'inventory_management' => $variantData['Variant Inventory Tracker'] ?? 'shopify',
                'fulfillment_service' => $variantData['Variant Fulfillment Service'] ?? 'manual',
                'requires_shipping' => $variantData['Variant Requires Shipping'] === 'true',
                'taxable' => $variantData['Variant Taxable'] === 'true',
                'barcode' => $variantData['Variant Barcode'] ?? '',
                'grams' => (int)$variantData['Variant Grams'],
                'weight' => (float)$variantData['Variant Grams'] / 1000, // Convert to kg
                'weight_unit' => 'kg'
            ];
            
            if (!empty($variantData['Variant Compare At Price'])) {
                $variant['compare_at_price'] = $variantData['Variant Compare At Price'];
            }
            
            $product['variants'][] = $variant;
        }
        
        // Set up options
        if (!empty($mainData['Option1 Name'])) {
            $product['options'] = [
                ['name' => $mainData['Option1 Name']]
            ];
            
            if (!empty($mainData['Option2 Name'])) {
                $product['options'][] = ['name' => $mainData['Option2 Name']];
            }
            
            if (!empty($mainData['Option3 Name'])) {
                $product['options'][] = ['name' => $mainData['Option3 Name']];
            }
        }
        
        // Create product
        $response = $this->makeShopifyRequest('POST', '/products.json', [
            'product' => $product
        ]);
        
        if ($response && isset($response['product'])) {
            $productId = $response['product']['id'];
            echo "Created product: {$mainData['Title']} (ID: {$productId})\n";
            
            // Upload images
            $this->uploadProductImages($productId, $images);
            
            return $response['product'];
        } else {
            echo "Failed to create product: {$mainData['Title']}\n";
            return false;
        }
    }
    
    /**
     * Update existing product
     */
    private function updateProduct($productId, $productData, $images) {
        $mainData = $productData['main_data'];
        
        // For updates, you might want to implement specific update logic
        // For now, we'll just upload new images
        $this->uploadProductImages($productId, $images);
        
        echo "Updated product: {$mainData['Title']} (ID: {$productId})\n";
    }
    
    /**
     * Upload images to Shopify product
     */
    private function uploadProductImages($productId, $images) {
        foreach ($images as $image) {
            if (!file_exists($image['local_path'])) continue;
            
            $imageData = base64_encode(file_get_contents($image['local_path']));
            $filename = basename($image['local_path']);
            
            $imagePayload = [
                'image' => [
                    'attachment' => $imageData,
                    'filename' => $filename,
                    'position' => $image['position'],
                    'alt' => $image['alt_text']
                ]
            ];
            
            $response = $this->makeShopifyRequest('POST', "/products/{$productId}/images.json", $imagePayload);
            
            if ($response) {
                echo "Uploaded image: {$filename} to product {$productId}\n";
            } else {
                echo "Failed to upload image: {$filename}\n";
            }
            
            // Add delay to avoid rate limiting
            sleep(0.5);
        }
    }
    
    /**
     * Get product by handle
     */
    private function getProductByHandle($handle) {
        $response = $this->makeShopifyRequest('GET', "/products.json?handle={$handle}");
        
        if ($response && isset($response['products']) && count($response['products']) > 0) {
            return $response['products'][0];
        }
        
        return false;
    }
    
    /**
     * Make Shopify API request
     */
    private function makeShopifyRequest($method, $endpoint, $data = null) {
        $url = "https://{$this->shopDomain}/admin/api/{$this->apiVersion}{$endpoint}";
        
        echo "Making {$method} request to: {$endpoint}\n";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'X-Shopify-Access-Token: ' . $this->accessToken
        ]);
        
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        } elseif ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        if ($curlError) {
            echo "CURL Error: {$curlError}\n";
            return false;
        }
        
        echo "HTTP Response Code: {$httpCode}\n";
        
        if ($httpCode >= 200 && $httpCode < 300) {
            $decodedResponse = json_decode($response, true);
            if ($decodedResponse === null) {
                echo "Error: Invalid JSON response\n";
                echo "Raw response: {$response}\n";
                return false;
            }
            return $decodedResponse;
        } else {
            echo "API Error (HTTP {$httpCode}): {$response}\n";
            
            // Try to decode error response
            $errorResponse = json_decode($response, true);
            if ($errorResponse && isset($errorResponse['errors'])) {
                echo "Error details: " . json_encode($errorResponse['errors'], JSON_PRETTY_PRINT) . "\n";
            }
            
            return false;
        }
    }
}

// Usage
try {
    $importer = new ShopifyCSVImporter($shopifyConfig, $imageDownloadPath);
    $importer->processCSV($csvFile);
    echo "Import completed successfully!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>