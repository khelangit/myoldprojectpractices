<?php

$access_token = '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';
$store = 'testing-janvi.myshopify.com';
$s3_image_url = 'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/swagathgroceryrestaurant-product_a9f948a3-cb18-35ea-bacf-2d78770fe3d4-0b3bc.jpg';

// Step 1: Download S3 image to local file
$temp_path = tempnam(sys_get_temp_dir(), 'shopify_') . '.jpg';
file_put_contents($temp_path, file_get_contents($s3_image_url));

$filename = basename($temp_path);
$mime_type = mime_content_type($temp_path);
$file_size = filesize($temp_path);

// Step 2: Request a staging URL from Shopify
$graphql_endpoint = "https://$store/admin/api/2024-01/graphql.json";

$staging_query = <<<GQL
mutation generateStagedUpload {
  stagedUploadsCreate(input: [
    {
      resource: FILE,
      filename: "$filename",
      mimeType: "$mime_type",
      fileSize: "$file_size",
      httpMethod: POST
    }
  ]) {
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

$ch = curl_init($graphql_endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "X-Shopify-Access-Token: $access_token"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['query' => $staging_query]));
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
$upload_info = $result['data']['stagedUploadsCreate']['stagedTargets'][0] ?? null;

if (!$upload_info) {
    echo "❌ Failed to get upload target: " . json_encode($result);
    exit;
}

$url = $upload_info['url'];
$resource_url = $upload_info['resourceUrl'];
$params = $upload_info['parameters'];

// Step 3: Upload file to Shopify's staging server
$post_fields = [];
foreach ($params as $param) {
    $post_fields[$param['name']] = $param['value'];
}
$post_fields['file'] = new CURLFile($temp_path, $mime_type, $filename);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpcode === 204 || $httpcode === 201) {
    echo "✅ File uploaded to Shopify staging server (HTTP $httpcode). Proceeding...\n";
} else {
    echo "❌ File upload to Shopify staging failed. HTTP $httpcode\n";
    unlink($temp_path);
    exit;
}

// Step 4: Register file in Shopify Files
$register_query = <<<GQL
mutation fileCreate {
  fileCreate(files: [{
    originalSource: "$resource_url",
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

$ch = curl_init($graphql_endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "X-Shopify-Access-Token: $access_token"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['query' => $register_query]));
$response = curl_exec($ch);
curl_close($ch);

// Clean up temp file
unlink($temp_path);

// Print response
echo "📦 GraphQL fileCreate response:\n$response\n";

$result = json_decode($response, true);
if (isset($result['errors'])) {
    echo "❌ Shopify GraphQL Error: " . json_encode($result['errors'], JSON_PRETTY_PRINT) . "\n";
}
if (!empty($result['data']['fileCreate']['userErrors'])) {
    echo "⚠️ User Errors:\n";
    foreach ($result['data']['fileCreate']['userErrors'] as $error) {
        echo "- {$error['field'][0]}: {$error['message']}\n";
    }
}
