<?php
if (!defined('ABSPATH')) {
    exit;
}

// Check if class exists before declaring
if (!class_exists('AIIG_Image_Generator')) {
    class AIIG_Image_Generator {
        public function __construct() {
            add_action('wp_ajax_aiig_generate_image', [$this, 'handle_ajax_request']);
            add_action('wp_ajax_aiig_save_generated_image', [$this, 'save_generated_image']);
        }

        public function handle_ajax_request() {
            check_ajax_referer('aiig_nonce', 'nonce');
            
            $prompt = sanitize_text_field($_POST['prompt']);
            $target = sanitize_key($_POST['target']);
            $post_id = intval($_POST['post_id']);
            
            if (empty($prompt)) {
                wp_send_json_error(__('Prompt is required', 'aiig'));
            }
            
            $api_handler = new AIIG_API_Handler();
            $image_url = $api_handler->generate_image($prompt);
            
            if (is_wp_error($image_url)) {
                wp_send_json_error($image_url->get_error_message());
            }
            
            wp_send_json_success([
                'image_url' => $image_url,
                'target'    => $target,
                'post_id'   => $post_id
            ]);
        }

        public function save_generated_image() {
            check_ajax_referer('aiig_nonce', 'nonce');
            
            $image_url = esc_url_raw($_POST['image_url']);
            $target = sanitize_key($_POST['target']);
            $post_id = intval($_POST['post_id']);
            $prompt = sanitize_text_field($_POST['prompt']);
            
            // Download and save image
            $attachment_id = $this->save_image_to_library($image_url, $prompt);
            
            if (is_wp_error($attachment_id)) {
                wp_send_json_error($attachment_id->get_error_message());
            }
            
            // Set as featured image if target is featured
            if ('featured' === $target) {
                set_post_thumbnail($post_id, $attachment_id);
            }
            
            // Handle slider image
            if ('slider' === $target) {
                update_post_meta($post_id, '_aiig_slider_image', $attachment_id);
            }
            
            wp_send_json_success([
                'attachment_id' => $attachment_id,
                'image_url'     => wp_get_attachment_url($attachment_id)
            ]);
        }

        private function save_image_to_library($image_url, $prompt) {
            require_once(ABSPATH . 'wp-admin/includes/image.php');
            require_once(ABSPATH . 'wp-admin/includes/file.php');
            require_once(ABSPATH . 'wp-admin/includes/media.php');
            
            // Download image
            $tmp = download_url($image_url);
            if (is_wp_error($tmp)) {
                return $tmp;
            }
            
            // Prepare file
            $file_array = [
                'name'     => sanitize_title($prompt) . '.jpg',
                'tmp_name' => $tmp
            ];
            
            // Save to media library
            $attachment_id = media_handle_sideload($file_array, 0, $prompt);
            
            // Clean up
            @unlink($tmp);
            
            if (is_wp_error($attachment_id)) {
                return $attachment_id;
            }
            
            // Add prompt as attachment meta
            update_post_meta($attachment_id, '_aiig_prompt', $prompt);
            
            return $attachment_id;
        }
    }
}