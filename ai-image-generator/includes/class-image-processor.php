<?php
/**
 * Image processing and WordPress media integration
 */

class AIG_Image_Processor {
    
    public function process_generated_image($api_result) {
        try {
            // Download image from URL or process base64 data
            $temp_file = $this->get_temp_image_file($api_result);
            
            if (is_wp_error($temp_file)) {
                return $temp_file;
            }
            
            // Compress image if needed
            if (get_option('aig_auto_compress', true)) {
                $temp_file = $this->compress_image($temp_file);
            }
            
            // Upload to WordPress media library
            $attachment_id = $this->upload_to_media_library($temp_file, $api_result);
            
            if (is_wp_error($attachment_id)) {
                // Clean up temp file
                if (file_exists($temp_file)) {
                    unlink($temp_file);
                }
                return $attachment_id;
            }
            
            // Generate image sizes
            $this->generate_image_sizes($attachment_id);
            
            // Clean up temp file
            if (file_exists($temp_file)) {
                unlink($temp_file);
            }
            
            $attachment_url = wp_get_attachment_url($attachment_id);
            $thumbnail_url = wp_get_attachment_image_url($attachment_id, 'thumbnail');
            
            return array(
                'attachment_id' => $attachment_id,
                'image_url' => $attachment_url,
                'thumbnail_url' => $thumbnail_url,
                'size' => $api_result['size'] ?? '1024x1024'
            );
            
        } catch (Exception $e) {
            return new WP_Error('processing_error', 'Error processing image: ' . $e->getMessage());
        }
    }
    
    private function get_temp_image_file($api_result) {
        if (isset($api_result['temp_file'])) {
            // Already have temp file (Stable Diffusion)
            return $api_result['temp_file'];
        }
        
        if (isset($api_result['image_url'])) {
            // Download from URL (DALL-E)
            return $this->download_image_from_url($api_result['image_url']);
        }
        
        return new WP_Error('no_image_source', 'No image source provided');
    }
    
    private function download_image_from_url($url) {
        $temp_file = wp_tempnam('aig-downloaded-image');
        
        $response = wp_remote_get($url, array(
            'timeout' => 60,
            'stream' => true,
            'filename' => $temp_file
        ));
        
        if (is_wp_error($response)) {
            return $response;
        }
        
        if (wp_remote_retrieve_response_code($response) !== 200) {
            return new WP_Error('download_failed', 'Failed to download image');
        }
        
        return $temp_file;
    }
    
    private function compress_image($temp_file) {
        $quality = get_option('aig_compression_quality', 85);
        
        // Get image info
        $image_info = getimagesize($temp_file);
        if (!$image_info) {
            return $temp_file; // Return original if can't process
        }
        
        $mime_type = $image_info['mime'];
        
        // Load image based on type
        switch ($mime_type) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($temp_file);
                break;
            case 'image/png':
                $image = imagecreatefrompng($temp_file);
                break;
            case 'image/webp':
                $image = imagecreatefromwebp($temp_file);
                break;
            default:
                return $temp_file; // Unsupported format
        }
        
        if (!$image) {
            return $temp_file;
        }
        
        // Create compressed version
        $compressed_file = wp_tempnam('aig-compressed-image');
        
        // Save as JPEG for better compression
        if (imagejpeg($image, $compressed_file, $quality)) {
            imagedestroy($image);
            unlink($temp_file); // Remove original
            return $compressed_file;
        }
        
        imagedestroy($image);
        return $temp_file; // Return original if compression failed
    }
    
    private function upload_to_media_library($temp_file, $api_result) {
        if (!function_exists('media_handle_upload')) {
            require_once(ABSPATH . 'wp-admin/includes/media.php');
            require_once(ABSPATH . 'wp-admin/includes/file.php');
            require_once(ABSPATH . 'wp-admin/includes/image.php');
        }
        
        // Generate filename
        $filename = $this->generate_filename($api_result);
        
        // Prepare file array for upload
        $file_array = array(
            'name' => $filename,
            'tmp_name' => $temp_file,
            'error' => 0,
            'size' => filesize($temp_file)
        );
        
        // Upload file
        $attachment_id = media_handle_sideload($file_array, 0, null, array(
            'test_form' => false,
            'test_size' => true
        ));
        
        if (is_wp_error($attachment_id)) {
            return $attachment_id;
        }
        
        // Update attachment metadata
        $this->update_attachment_metadata($attachment_id, $api_result);
        
        return $attachment_id;
    }
    
    private function generate_filename($api_result) {
        $provider = $api_result['provider'] ?? 'ai';
        $timestamp = date('Y-m-d-H-i-s');
        $random = wp_generate_password(6, false);
        
        return "ai-generated-{$provider}-{$timestamp}-{$random}.jpg";
    }
    
    private function update_attachment_metadata($attachment_id, $api_result) {
        // Set alt text from prompt
        $alt_text = wp_trim_words($api_result['prompt'] ?? '', 10);
        update_post_meta($attachment_id, '_wp_attachment_image_alt', $alt_text);
        
        // Add custom metadata
        update_post_meta($attachment_id, '_aig_generated', true);
        update_post_meta($attachment_id, '_aig_provider', $api_result['provider'] ?? '');
        update_post_meta($attachment_id, '_aig_prompt', $api_result['prompt'] ?? '');
        update_post_meta($attachment_id, '_aig_cost', $api_result['cost'] ?? 0);
        update_post_meta($attachment_id, '_aig_generation_time', $api_result['generation_time'] ?? 0);
        
        // Update post title and description
        $post_data = array(
            'ID' => $attachment_id,
            'post_title' => 'AI Generated: ' . wp_trim_words($api_result['prompt'] ?? 'Image', 5),
            'post_content' => $api_result['revised_prompt'] ?? $api_result['prompt'] ?? '',
            'post_excerpt' => wp_trim_words($api_result['prompt'] ?? '', 15)
        );
        
        wp_update_post($post_data);
    }
    
    private function generate_image_sizes($attachment_id) {
        $file_path = get_attached_file($attachment_id);
        
        if (!$file_path || !file_exists($file_path)) {
            return false;
        }
        
        // Generate WordPress image sizes
        $metadata = wp_generate_attachment_metadata($attachment_id, $file_path);
        wp_update_attachment_metadata($attachment_id, $metadata);
        
        return true;
    }
    
    public function batch_process_images($image_urls, $options = array()) {
        $results = array();
        
        foreach ($image_urls as $index => $url) {
            $api_result = array(
                'image_url' => $url,
                'prompt' => $options['prompts'][$index] ?? 'Batch generated image',
                'provider' => 'batch',
                'size' => $options['size'] ?? '1024x1024'
            );
            
            $result = $this->process_generated_image($api_result);
            
            if (is_wp_error($result)) {
                $results[] = array(
                    'success' => false,
                    'error' => $result->get_error_message(),
                    'url' => $url
                );
            } else {
                $results[] = array(
                    'success' => true,
                    'attachment_id' => $result['attachment_id'],
                    'image_url' => $result['image_url']
                );
            }
        }
        
        return $results;
    }
    
    public function cleanup_temp_files() {
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/aig-temp/';
        
        if (!is_dir($temp_dir)) {
            return;
        }
        
        $files = glob($temp_dir . '*');
        $now = time();
        
        foreach ($files as $file) {
            if (is_file($file) && ($now - filemtime($file)) > 3600) { // 1 hour old
                unlink($file);
            }
        }
    }
}