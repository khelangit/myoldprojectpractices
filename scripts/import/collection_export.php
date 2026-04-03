<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

define('SHOPIFY_STORE', 'khelan-store.myshopify.com');
define('ACCESS_TOKEN', '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');

$client = new Client([
    'base_uri' => "https://" . SHOPIFY_STORE . "/admin/api/2024-07/",
    'headers' => [
        'X-Shopify-Access-Token' => ACCESS_TOKEN,
        'Content-Type' => 'application/json',
    ],
]);

$outputCsv = __DIR__ . '/shopify_products_export.csv';
$fp = fopen($outputCsv, 'w');

// Write CSV header
fputcsv($fp, ['ID', 'Title', 'Handle', 'Product Type', 'Tags'], ",", '"', "\\");

// Shopify uses pagination. Loop through all pages.
$page = 1;
$limit = 250; // Shopify max is 250 per page
$hasMore = true;
$nextPageInfo = null;

while ($hasMore) {
    try {
        $params = [
            'limit' => $limit,
        ];
        if ($nextPageInfo) {
            $response = $client->get('products.json', [
                'query' => ['limit' => $limit, 'page_info' => $nextPageInfo],
            ]);
        } else {
            $response = $client->get('products.json', ['query' => $params]);
        }

        $products = json_decode($response->getBody(), true)['products'];

        foreach ($products as $product) {
            fputcsv($fp, [
                $product['id'],
                $product['title'],
                $product['handle'],
                $product['product_type'],
                $product['tags'],
            ], ",", '"', "\\");
        }

        // Check for pagination
        $linkHeader = $response->getHeader('Link');
        if ($linkHeader) {
            $matches = [];
            preg_match('/<([^>]+)>; rel="next"/', $linkHeader[0], $matches);
            if (!empty($matches[1])) {
                $urlParts = parse_url($matches[1]);
                parse_str($urlParts['query'], $queryParts);
                $nextPageInfo = $queryParts['page_info'];
            } else {
                $hasMore = false;
            }
        } else {
            $hasMore = false;
        }

    } catch (Exception $e) {
        echo "❌ Error fetching products: " . $e->getMessage() . "\n";
        $hasMore = false;
    }
}

fclose($fp);
echo "✅ Export completed to {$outputCsv}\n";
