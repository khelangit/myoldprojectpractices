<?php
// Shopify credentials
$shopify_domain = "khelan-store.myshopify.com";  // Your store domain
$access_token   = "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";  // Your Shopify Admin API access token
$collection_id = 493634978089;  // Your collection ID

// Step 1: Fetch all products from the collection
$ch = curl_init("https://$shopify_domain/admin/api/2025-01/collections/$collection_id/products.json?limit=250");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-Shopify-Access-Token: $access_token",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Insecure, for testing only
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Debug output
echo "HTTP Status Code: $http_code\n";
echo "cURL Error: $error\n";
echo "Raw Response: $response\n";

$product_data = json_decode($response, true);

if (!isset($product_data['products']) || empty($product_data['products'])) {
    echo "❌ No products found in this collection.\n";
    exit;
}

// Step 2: Loop through each product
foreach ($product_data['products'] as $product) {
    $product_id     = $product['id'];
    $product_title  = $product['title'] ?? 'Untitled Product';
    
    // Handle tags (string or array)
    $product_tags = $product['tags'] ?? '';
    if (is_string($product_tags)) {
        $product_tags = array_filter(explode(',', $product_tags)); // Convert string to array, remove empty entries
    } elseif (!is_array($product_tags)) {
        $product_tags = []; // Fallback to empty array if tags are malformed
    }
    $product_tags = !empty($product_tags) ? implode(', ', array_map('trim', $product_tags)) : 'all recipes';
    
    $product_vendor = $product['vendor'] ?? 'Unknown Vendor';

    // Step 3: Generate static description with dynamic data
    $description  = "<p>Relax and refresh yourself with <strong>{$product_title}</strong>, carefully selected to deliver authentic aroma and taste in every sip. Perfect for {$product_tags}, this tea is your ideal companion for daily wellness and relaxation.</p>\n";

$description .= "<ul>\n";
$description .= "  <li>🍃 Rich in natural antioxidants that promote health and wellness</li>\n";
$description .= "  <li>☕ Delivers a soothing aroma and refreshing taste with every cup</li>\n";
$description .= "  <li>🌞 Perfect morning energizer and calming evening drink</li>\n";
$description .= "  <li>🛡️ Hygienically packed to preserve freshness and flavor</li>\n";
$description .= "  <li>🍂 Versatile – enjoy plain, with milk, or blended with spices</li>\n";
$description .= "  <li>💡 Easy to prepare, making it a must-have for tea lovers</li>\n";
$description .= "</ul>\n";

$description .= "<p><strong>Why choose {$product_title}?</strong></p>\n";
$description .= "<p>Loved by tea enthusiasts, {$product_title} combines taste, health, and comfort in one. Whether it’s to kickstart your morning or to relax after a long day, this tea makes every moment special.</p>\n";

$description .= "<p><em>Tip:</em> For best taste, store in an airtight container and brew with freshly boiled water.</p>\n";

$description .= "<p>Bring home <strong>{$product_title}</strong> today and enjoy a refreshing tea experience filled with natural goodness.</p>\n";


    // Step 4: Update product in Shopify
    $update_data = [
        "product" => [
            "id" => $product_id,
            "body_html" => $description
        ]
    ];

    $ch = curl_init("https://$shopify_domain/admin/api/2025-01/products/$product_id.json");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "X-Shopify-Access-Token: $access_token",
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($update_data));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Insecure, for testing
    $update_response = curl_exec($ch);
    $update_http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $update_error = curl_error($ch);
    curl_close($ch);

    if ($update_http_code >= 200 && $update_http_code < 300) {
        echo "✅ Updated: {$product_title} (ID: {$product_id})\n";
    } else {
        echo "❌ Failed to update: {$product_title} (ID: {$product_id}). HTTP Code: $update_http_code, Response: $update_response, cURL Error: $update_error\n";
    }
}

echo "🎉 All products in collection updated!\n";
?>