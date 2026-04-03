import os
import json
import requests
from PIL import Image
import mimetypes
import urllib.parse
from datetime import datetime
import pytz
from typing import List, Dict, Optional

# Shopify credentials
SHOPIFY_STORE = 'khelan-store.myshopify.com'
ACCESS_TOKEN = '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'

# Configuration
DOWNLOAD_DIR = 'downloaded_images'
BACKUP_JSON_FILE = 'upload_results.json'
MAX_FILE_SIZE_MB = 20
TIMEZONE = pytz.timezone('Asia/Kolkata')

# Image URLs
IMAGE_URLS = [
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/banana-raw-burro.jpg',
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/swagathgroceryrestaurant-product_a9f948a3-cb18-35ea-bacf-2d78770fe3d4-0b3bc.jpg',
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/banana-raw-burro.jpg',
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/banana.jpg',
    'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tz/coconut-mature.jpg',
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
]

def create_directory_if_not_exists(directory: str) -> None:
    """Create directory if it doesn't exist."""
    if not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
        print(f"📁 Created directory: {directory}")

def load_existing_results(json_file: str) -> List[Dict]:
    """Load existing upload results from JSON file."""
    if os.path.exists(json_file):
        try:
            with open(json_file, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            print(f"⚠️ Could not load existing results from {json_file}")
            return []
    return []

def save_results(results: List[Dict], json_file: str) -> None:
    """Save results to JSON file."""
    try:
        with open(json_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"💾 Results saved to {json_file}")
    except IOError as e:
        print(f"❌ Failed to save results: {e}")

def download_image(url: str, download_dir: str) -> Optional[str]:
    """Download image from URL to local directory."""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        file_size_mb = len(response.content) / (1024 * 1024)
        if file_size_mb > MAX_FILE_SIZE_MB:
            print(f"⚠️ File size {file_size_mb:.2f}MB exceeds {MAX_FILE_SIZE_MB}MB limit")
            return None
        
        filename = os.path.basename(urllib.parse.urlparse(url).path)
        if not filename:
            filename = 'image_' + str(hash(url)) + '.jpg'
        
        local_path = os.path.join(download_dir, filename)
        
        with open(local_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Downloaded locally: {local_path} ({file_size_mb:.2f}MB)")
        return local_path
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Download error: {e}")
        return None
    except IOError as e:
        print(f"❌ File write error: {e}")
        return None

def convert_to_jpeg(image_path: str, download_dir: str) -> Optional[str]:
    """Convert image to JPEG format if not already."""
    try:
        mime_type, _ = mimetypes.guess_type(image_path)
        
        if mime_type == 'image/jpeg':
            return image_path
        
        with Image.open(image_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            filename_without_ext = os.path.splitext(os.path.basename(image_path))[0]
            jpg_filename = f"{filename_without_ext}.jpg"
            jpg_path = os.path.join(download_dir, jpg_filename)
            
            img.save(jpg_path, 'JPEG', quality=95)
            print(f"🔄 Converted to JPG: {jpg_path}")
            return jpg_path
            
    except Exception as e:
        print(f"❌ Conversion error: {e}")
        return None

def upload_image_to_shopify_staged(image_path: str) -> Optional[Dict]:
    """Upload image to Shopify using staged upload process."""
    try:
        filename = os.path.basename(image_path)
        mime_type, _ = mimetypes.guess_type(image_path)
        file_size = os.path.getsize(image_path)
        
        # Step 1: Request a staging URL from Shopify
        staging_mutation = """
        mutation generateStagedUpload {
            stagedUploadsCreate(input: [{
                resource: FILE,
                filename: "%s",
                mimeType: "%s",
                fileSize: "%s",
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
        """ % (filename, mime_type, file_size)
        
        headers = {
            'X-Shopify-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'application/json',
        }
        
        response = requests.post(
            f"https://{SHOPIFY_STORE}/admin/api/2024-07/graphql.json",
            headers=headers,
            json={'query': staging_mutation},
            timeout=30
        )
        
        response_data = response.json()
        
        if 'errors' in response_data:
            print("❌ Staging request errors:")
            print(json.dumps(response_data['errors'], indent=2))
            return None
        
        if response_data.get('data', {}).get('stagedUploadsCreate', {}).get('userErrors'):
            print("❌ Staging user errors:")
            print(json.dumps(response_data['data']['stagedUploadsCreate']['userErrors'], indent=2))
            return None
        
        staged_targets = response_data.get('data', {}).get('stagedUploadsCreate', {}).get('stagedTargets', [])
        if not staged_targets:
            print("❌ Failed to get staging upload URL")
            return None
        
        upload_info = staged_targets[0]
        upload_url = upload_info['url']
        resource_url = upload_info['resourceUrl']
        parameters = upload_info['parameters']
        
        print("📤 Got staging URL, uploading file...")
        
        # Step 2: Upload file to Shopify's staging server
        files = {}
        data = {}
        
        for param in parameters:
            data[param['name']] = param['value']
        
        with open(image_path, 'rb') as f:
            files['file'] = (filename, f, mime_type)
            
            upload_response = requests.post(
                upload_url,
                data=data,
                files=files,
                timeout=120
            )
        
        if upload_response.status_code not in (201, 204):
            print(f"❌ File upload to staging failed. HTTP {upload_response.status_code}")
            return None
        
        print(f"✅ File uploaded to staging server (HTTP {upload_response.status_code})")
        
        # Step 3: Register file in Shopify Files
        register_mutation = """
        mutation fileCreate {
            fileCreate(files: [{
                originalSource: "%s",
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
        """ % resource_url
        
        register_response = requests.post(
            f"https://{SHOPIFY_STORE}/admin/api/2024-07/graphql.json",
            headers=headers,
            json={'query': register_mutation},
            timeout=30
        )
        
        register_data = register_response.json()
        
        if 'errors' in register_data:
            print("❌ File registration errors:")
            print(json.dumps(register_data['errors'], indent=2))
            return None
        
        if register_data.get('data', {}).get('fileCreate', {}).get('userErrors'):
            print("❌ File registration user errors:")
            print(json.dumps(register_data['data']['fileCreate']['userErrors'], indent=2))
            return None
        
        files = register_data.get('data', {}).get('fileCreate', {}).get('files', [])
        if not files:
            print("❌ File registration failed (No file data returned)")
            return None
        
        file_info = files[0]
        print("✅ Uploaded to Shopify:")
        print(f"   • ID: {file_info['id']}")
        
        preview_url = None
        if file_info.get('preview', {}).get('image', {}).get('url'):
            preview_url = file_info['preview']['image']['url']
            print(f"   • Preview URL: {preview_url}")
        
        return {
            'id': file_info['id'],
            'url': preview_url,
        }
        
    except Exception as e:
        print(f"❌ Staged upload error: {e}")
        return None

def test_access_token() -> bool:
    """Test if the access token is valid."""
    try:
        test_query = 'query { shop { name } }'
        
        headers = {
            'X-Shopify-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'application/json',
        }
        
        response = requests.post(
            f"https://{SHOPIFY_STORE}/admin/api/2024-07/graphql.json",
            headers=headers,
            json={'query': test_query},
            timeout=30
        )
        
        data = response.json()
        
        if 'errors' in data:
            print(f"❌ Access token test failed: {json.dumps(data['errors'])}")
            return False
        
        if data.get('data', {}).get('shop', {}).get('name'):
            print(f"✅ Access token is valid. Shop: {data['data']['shop']['name']}")
            return True
        
        return False
        
    except Exception as e:
        print(f"❌ Access token test error: {e}")
        return False

def main():
    """Main function to process all images."""
    # Create download directory
    create_directory_if_not_exists(DOWNLOAD_DIR)
    
    # Load existing results
    existing_results = load_existing_results(BACKUP_JSON_FILE)
    uploaded_files = []
    
    # Test access token
    print("🔑 Testing access token...")
    if not test_access_token():
        print("❌ Please update your ACCESS_TOKEN in the script and try again.")
        return
    
    # Process each image
    for index, url in enumerate(IMAGE_URLS):
        print(f"\n🔄 Processing {index + 1}/{len(IMAGE_URLS)}: {url}")
        
        # Download image
        local_path = download_image(url, DOWNLOAD_DIR)
        if not local_path:
            continue
        
        # Convert to JPEG if needed
        jpg_path = convert_to_jpeg(local_path, DOWNLOAD_DIR)
        if not jpg_path:
            continue
        
        # Upload to Shopify
        upload_result = upload_image_to_shopify_staged(jpg_path)
        if upload_result:
            uploaded_files.append({
                'timestamp': datetime.now(TIMEZONE).isoformat(),
                'original_url': url,
                'local_path': jpg_path,
                'status': 'uploaded',
                'shopify_id': upload_result.get('id'),
                'shopify_url': upload_result.get('url'),
            })
        else:
            print("❌ Upload failed")
    
    # Save results
    all_results = existing_results + uploaded_files
    save_results(all_results, BACKUP_JSON_FILE)
    
    # Print summary
    print("\n=== Summary ===")
    print(f"Total processed: {len(IMAGE_URLS)}")
    print(f"Successfully uploaded: {len(uploaded_files)}")
    print(f"Failed: {len(IMAGE_URLS) - len(uploaded_files)}")

if __name__ == "__main__":
    main()