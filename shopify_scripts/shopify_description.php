<?php
/**
 * Shopify Product Description Generator using OpenAI API and GraphQL
 * This script fetches products via Shopify GraphQL and generates descriptions using OpenAI
 */

class ShopifyOpenAIDescriptionGenerator {
    private $shop_url;
    private $access_token;
    private $openai_api_key;
    private $api_version = '2023-10';
    
    public function __construct($shop_url, $access_token, $openai_api_key) {
        $this->shop_url = $shop_url;
        $this->access_token = $access_token;
        $this->openai_api_key = $openai_api_key;
    }
    
    /**
     * Make GraphQL request to Shopify
     */
    private function makeGraphQLRequest($query, $variables = []) {
        $url = "https://{$this->shop_url}/admin/api/{$this->api_version}/graphql.json";
        
        $headers = [
            'X-Shopify-Access-Token: ' . $this->access_token,
            'Content-Type: application/json'
        ];
        
        $payload = [
            'query' => $query,
            'variables' => $variables
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($http_code >= 200 && $http_code < 300) {
            $decoded = json_decode($response, true);
            if (isset($decoded['errors'])) {
                throw new Exception("GraphQL Error: " . json_encode($decoded['errors']));
            }
            return $decoded;
        } else {
            throw new Exception("GraphQL request failed with code: $http_code, Response: $response");
        }
    }
    
    /**
     * Make REST API request for product updates
     */
    private function makeRestRequest($endpoint, $method = 'PUT', $data = null) {
        $url = "https://{$this->shop_url}/admin/api/{$this->api_version}/{$endpoint}";
        
        $headers = [
            'X-Shopify-Access-Token: ' . $this->access_token,
            'Content-Type: application/json'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        
        if ($data && $method == 'PUT') {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($http_code >= 200 && $http_code < 300) {
            return json_decode($response, true);
        } else {
            throw new Exception("REST API request failed with code: $http_code, Response: $response");
        }
    }
    
    /**
     * Get all products using GraphQL with pagination
     */
    public function getAllProducts() {
        $all_products = [];
        $has_next_page = true;
        $cursor = null;
        
        while ($has_next_page) {
            $query = '
                query getProducts($first: Int!, $after: String) {
                    products(first: $first, after: $after) {
                        edges {
                            node {
                                id
                                title
                                handle
                                vendor
                                productType
                                tags
                                descriptionHtml
                                status
                                totalInventory
                                priceRangeV2 {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                images(first: 1) {
                                    edges {
                                        node {
                                            url
                                            altText
                                        }
                                    }
                                }
                                variants(first: 1) {
                                    edges {
                                        node {
                                            id
                                            title
                                            price
                                            compareAtPrice
                                            inventoryQuantity
                                        }
                                    }
                                }
                            }
                            cursor
                        }
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                        }
                    }
                }
            ';
            
            $variables = [
                'first' => 50,
                'after' => $cursor
            ];
            
            $response = $this->makeGraphQLRequest($query, $variables);
            
            if (isset($response['data']['products']['edges'])) {
                foreach ($response['data']['products']['edges'] as $edge) {
                    // Convert GraphQL ID to REST ID for updates
                    $gql_id = $edge['node']['id'];
                    $rest_id = $this->convertGQLIdToRestId($gql_id);
                    $edge['node']['rest_id'] = $rest_id;
                    
                    $all_products[] = $edge['node'];
                    $cursor = $edge['cursor'];
                }
                
                $has_next_page = $response['data']['products']['pageInfo']['hasNextPage'];
            } else {
                $has_next_page = false;
            }
        }
        
        return $all_products;
    }
    
    /**
     * Get products by collection using GraphQL
     */
    public function getProductsByCollection($collection_handle) {
        $query = '
            query getProductsByCollection($handle: String!, $first: Int!) {
                collectionByHandle(handle: $handle) {
                    id
                    title
                    products(first: $first) {
                        edges {
                            node {
                                id
                                title
                                handle
                                vendor
                                productType
                                tags
                                descriptionHtml
                                status
                                totalInventory
                                priceRangeV2 {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                images(first: 1) {
                                    edges {
                                        node {
                                            url
                                            altText
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ';
        
        $variables = [
            'handle' => $collection_handle,
            'first' => 250
        ];
        
        $response = $this->makeGraphQLRequest($query, $variables);
        $products = [];
        
        if (isset($response['data']['collectionByHandle']['products']['edges'])) {
            foreach ($response['data']['collectionByHandle']['products']['edges'] as $edge) {
                $gql_id = $edge['node']['id'];
                $rest_id = $this->convertGQLIdToRestId($gql_id);
                $edge['node']['rest_id'] = $rest_id;
                
                $products[] = $edge['node'];
            }
        }
        
        return $products;
    }
    
    /**
     * Convert GraphQL ID to REST API ID
     */
    private function convertGQLIdToRestId($gql_id) {
        // GraphQL ID format: gid://shopify/Product/123456789
        // Extract the numeric ID from the end
        $parts = explode('/', $gql_id);
        return end($parts);
    }
    
    /**
     * Generate description using OpenAI API
     */
    public function generateDescriptionWithOpenAI($product) {
        $title = $product['title'] ?? 'Product';
        $vendor = $product['vendor'] ?? '';
        $product_type = $product['productType'] ?? '';
        $tags = is_array($product['tags']) ? implode(', ', $product['tags']) : $product['tags'];
        $price = $product['priceRangeV2']['minVariantPrice']['amount'] ?? '';
        
        // Create a detailed prompt for OpenAI
        $prompt = $this->createOpenAIPrompt($title, $vendor, $product_type, $tags, $price);
        
        $headers = [
            'Authorization: Bearer ' . $this->openai_api_key,
            'Content-Type: application/json'
        ];
        
        $data = [
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an expert copywriter specializing in grocery store product descriptions. Create engaging, informative, and SEO-friendly product descriptions that help customers make purchasing decisions.'
                ],
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'max_tokens' => 1000,
            'temperature' => 0.7
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($http_code == 200) {
            $decoded = json_decode($response, true);
            if (isset($decoded['choices'][0]['message']['content'])) {
                return $decoded['choices'][0]['message']['content'];
            } else {
                throw new Exception("OpenAI API returned unexpected response: " . $response);
            }
        } else {
            throw new Exception("OpenAI API request failed with code: $http_code, Response: $response");
        }
    }
    
    /**
     * Create detailed prompt for OpenAI
     */
    private function createOpenAIPrompt($title, $vendor, $product_type, $tags, $price) {
        $prompt = "Create a compelling product description for this grocery store item:\n\n";
        $prompt .= "Product Name: $title\n";
        
        if (!empty($vendor)) {
            $prompt .= "Brand/Vendor: $vendor\n";
        }
        
        if (!empty($product_type)) {
            $prompt .= "Category: $product_type\n";
        }
        
        if (!empty($tags)) {
            $prompt .= "Tags/Features: $tags\n";
        }
        
        if (!empty($price)) {
            $prompt .= "Price: $price\n";
        }
        
        $prompt .= "\nPlease create a product description that includes:\n";
        $prompt .= "- An engaging opening that highlights what makes this product special\n";
        $prompt .= "- Key features and benefits relevant to grocery shoppers\n";
        $prompt .= "- Usage suggestions and serving ideas\n";
        $prompt .= "- Storage and freshness information\n";
        $prompt .= "- Why customers should choose this product\n";
        $prompt .= "- A compelling call-to-action\n\n";
        
        $prompt .= "Format the description in HTML with appropriate headings, paragraphs, and lists for easy reading.\n";
        $prompt .= "Make it informative yet concise (200-400 words).\n";
        $prompt .= "Focus on benefits that matter to families and home cooks.\n";
        $prompt .= "Use a friendly, trustworthy tone that builds confidence in the purchase.\n\n";
        
        // Add specific instructions for different product types
        if (stripos($title, 'ice cream') !== false || stripos($product_type, 'ice cream') !== false) {
            $prompt .= "Special note: This is an ice cream product. Focus on flavor, texture, occasions for enjoyment, and proper freezer storage.\n";
        } elseif (stripos($product_type, 'fresh') !== false || stripos($product_type, 'produce') !== false) {
            $prompt .= "Special note: This is fresh produce. Emphasize freshness, nutritional benefits, and proper storage.\n";
        } elseif (stripos($product_type, 'dairy') !== false) {
            $prompt .= "Special note: This is a dairy product. Highlight nutritional benefits, freshness, and refrigeration needs.\n";
        }
        
        return $prompt;
    }
    
    /**
     * Update product description using REST API
     */
    public function updateProductDescription($product_id, $description) {
        $data = [
            'product' => [
                'id' => $product_id,
                'body_html' => $description
            ]
        ];
        
        return $this->makeRestRequest("products/$product_id.json", 'PUT', $data);
    }
    
    /**
     * Process all products and generate descriptions with OpenAI
     */
    public function processAllProducts() {
        echo "Fetching products from Shopify using GraphQL...\n";
        $products = $this->getAllProducts();
        
        echo "Found " . count($products) . " products\n\n";
        
        $updated_count = 0;
        $error_count = 0;
        
        foreach ($products as $product) {
            $product_id = $product['rest_id'];
            $title = $product['title'];
            
            try {
                echo "Generating AI description for: $title\n";
                
                // Generate description with OpenAI
                $new_description = $this->generateDescriptionWithOpenAI($product);
                
                // Update the product
                $this->updateProductDescription($product_id, $new_description);
                
                echo "✅ Updated: $title\n";
                echo "Preview: " . substr(strip_tags($new_description), 0, 100) . "...\n\n";
                $updated_count++;
                
                // Rate limiting - Shopify: 2 requests/sec, OpenAI: 3 requests/min for free tier
                sleep(1); // 1 second delay to be safe
                
            } catch (Exception $e) {
                echo "❌ Error updating '$title': " . $e->getMessage() . "\n\n";
                $error_count++;
            }
        }
        
        echo "\n=== Final Summary ===\n";
        echo "Total products: " . count($products) . "\n";
        echo "Successfully updated: $updated_count\n";
        echo "Errors: $error_count\n";
        echo "Script completed!\n";
    }
    
    /**
     * Process products by collection handle
     */
    public function processProductsByCollection($collection_handle) {
        echo "Fetching products from collection: $collection_handle\n";
        
        $products = $this->getProductsByCollection($collection_handle);
        
        echo "Found " . count($products) . " products in collection\n\n";
        
        $updated_count = 0;
        $error_count = 0;
        
        foreach ($products as $product) {
            $product_id = $product['rest_id'];
            $title = $product['title'];
            
            try {
                echo "Generating AI description for: $title\n";
                
                $new_description = $this->generateDescriptionWithOpenAI($product);
                
                $this->updateProductDescription($product_id, $new_description);
                
                echo "✅ Updated: $title\n";
                echo "Preview: " . substr(strip_tags($new_description), 0, 100) . "...\n\n";
                $updated_count++;
                
                sleep(1);
                
            } catch (Exception $e) {
                echo "❌ Error updating '$title': " . $e->getMessage() . "\n\n";
                $error_count++;
            }
        }
        
        echo "\n=== Summary ===\n";
        echo "Collection: $collection_handle\n";
        echo "Successfully updated: $updated_count\n";
        echo "Errors: $error_count\n";
    }
    
    /**
     * Test OpenAI connection
     */
    public function testOpenAI() {
        try {
            $test_product = [
                'title' => 'Test Product',
                'vendor' => 'Test Brand',
                'productType' => 'Test Category',
                'tags' => 'organic, healthy',
                'priceRangeV2' => ['minVariantPrice' => ['amount' => '10.99']]
            ];
            
            $description = $this->generateDescriptionWithOpenAI($test_product);
            echo "✅ OpenAI connection successful!\n";
            echo "Sample description: " . substr(strip_tags($description), 0, 200) . "...\n";
            return true;
        } catch (Exception $e) {
            echo "❌ OpenAI connection failed: " . $e->getMessage() . "\n";
            return false;
        }
    }
}

// Configuration
$config = [
    'shop_url' => 'khelan-store.myshopify.com',    // Replace with your shop URL
    'access_token' => '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',    // Replace with your Shopify access token
    'openai_api_key' => 'your-openai-api-key'        // Replace with your OpenAI API key
];

// Usage Examples:
try {
    // Initialize the generator
    $generator = new ShopifyOpenAIDescriptionGenerator(
        $config['shop_url'], 
        $config['access_token'],
        $config['openai_api_key']
    );
    
    // Test OpenAI connection first
    echo "=== Testing OpenAI Connection ===\n";
    if (!$generator->testOpenAI()) {
        exit("Please check your OpenAI API key and try again.\n");
    }
    
    echo "\n=== Processing Products ===\n";
    
    // Option 1: Process all products
    $generator->processAllProducts();
    
    // Option 2: Process specific collection (uncomment to use)
    /*
    echo "\n=== Processing Specific Collection ===\n";
    $collection_handle = 'your-collection-handle'; // Replace with actual collection handle
    $generator->processProductsByCollection($collection_handle);
    */
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

?>