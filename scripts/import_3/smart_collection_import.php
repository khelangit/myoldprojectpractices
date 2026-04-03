<?php

// Shopify credentials
$shopify_store = "khelan-store.myshopify.com";
$access_token = "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";

// Shopify API call function
function callShopifyAPI($method, $endpoint, $data = null) {
    global $shopify_store, $access_token;
    $url = "https://{$shopify_store}/admin/api/2023-10/{$endpoint}";
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "X-Shopify-Access-Token: {$access_token}"
    ]);
    
    if ($method === "POST") {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    } elseif ($method === "PUT") {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    if(curl_errno($ch)){
        echo 'Request Error:' . curl_error($ch);
    }
    curl_close($ch);
    return json_decode($response, true);
}

// Check if Smart Collection exists
function checkSmartCollectionExists($title) {
    $endpoint = "smart_collections.json?title=" . urlencode($title);
    $response = callShopifyAPI("GET", $endpoint);
    return !empty($response['smart_collections']) ? $response['smart_collections'][0]['id'] : false;
}

// Create Smart Collection
function createSmartCollection($title, $column, $condition) {
    $smart_collection = [
        "smart_collection" => [
            "title" => $title,
            "rules" => [
                [
                    "column" => $column,
                    "relation" => "equals",
                    "condition" => $condition
                ]
            ]
        ]
    ];
    $response = callShopifyAPI("POST", "smart_collections.json", $smart_collection);
    return $response['smart_collection']['id'] ?? null;
}

// CSV processing
if (($handle = fopen("shopify_products_export.csv", "r")) !== FALSE) {
    $header = fgetcsv($handle, 1000, ",", '"', "\\");

    while (($row = fgetcsv($handle, 1000, ",", '"', "\\")) !== FALSE) {
        if(empty(array_filter($row))) {
            continue; // skip empty rows
        }

        if(count($row) != count($header)){
            echo "⚠️ Skipping row due to column mismatch.\n";
            continue;
        }

        $data = array_combine($header, $row);

        // 1. Create product
        $product = [
            "product" => [
                "title" => $data['Title'],
                "product_type" => $data['Product Type'],
                "tags" => $data['Tags']
            ]
        ];
        $response = callShopifyAPI("POST", "products.json", $product);
        $product_id = $response['product']['id'] ?? null;
        echo "✅ Product created: {$data['Title']} (ID {$product_id})\n";

        // 2. Smart Collection for Type
        if ($product_id && !empty($data['Product Type'])) {
            $existing_type_collection_id = checkSmartCollectionExists($data['Product Type']);
            if (!$existing_type_collection_id) {
                $type_collection_id = createSmartCollection($data['Product Type'], "product_type", $data['Product Type']);
                echo "🗂️ Smart Collection created for type: {$data['Product Type']} (ID {$type_collection_id})\n";
            } else {
                echo "🔎 Smart Collection already exists for type: {$data['Product Type']} (ID {$existing_type_collection_id})\n";
            }
        }

        // 3. Smart Collections for each Tag
        if ($product_id && !empty($data['Tags'])) {
            $tags = explode(",", $data['Tags']);
            foreach($tags as $tag){
                $tag = trim($tag);
                if($tag != ""){
                    $existing_tag_collection_id = checkSmartCollectionExists($tag);
                    if (!$existing_tag_collection_id) {
                        $tag_collection_id = createSmartCollection($tag, "tag", $tag);
                        echo "🏷️ Smart Collection created for tag: {$tag} (ID {$tag_collection_id})\n";
                    } else {
                        echo "🔎 Smart Collection already exists for tag: {$tag} (ID {$existing_tag_collection_id})\n";
                    }
                }
            }
        }
    }
    fclose($handle);
}

echo "🎯 All products and smart collections imported successfully.\n";

?>
