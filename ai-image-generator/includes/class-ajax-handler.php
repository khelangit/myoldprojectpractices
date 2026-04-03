<?php
/**
 * AJAX request handler for image generation
 */

class AIG_Ajax_Handler {
    
    public function __construct() {
        add_action('wp_ajax_aig_generate_image', array($this, 'handle_generate_image'));
        add_action('wp_ajax_aig_set_featured_image', array($this, 'handle_set_featured_image'));
        add_action('wp_ajax_aig_get_generation_status', array($this, 'handle_get_status'));
    }
    
    public function handle_generate_image() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'aig_nonce')) {
            wp_die('Security check failed');
        }
        
        // Check user capabilities
        if (!current_user_can('upload_files')) {
            wp_send_json_error('Insufficient permissions');
        }
        
        // Rate limiting check
        if (!$this->check_rate_limit()) {
            wp_send_json_error('Rate limit exceeded. Please try again later.');
        }
        
        $prompt = sanitize_textarea_field($_POST['prompt']);
        $style = sanitize_text_field($_POST['style']);
        $size = sanitize_text_field($_POST['size']);
        $post_id = intval($_POST['post_id']);
        
        if (empty($prompt)) {
            wp_send_json_error('Prompt is required');
        }
        
        try {
            // Initialize API client
            $api_client = new AIG_API_Client();
            
            // Generate image
            $result = $api_client->generate_image($prompt, array(
                'style' => $style,
                'size' => $size,
                'post_id' => $post_id
            ));
            
            if (is_wp_error($result)) {
                wp_send_json_error($result->get_error_message());
            }
            
            // Process and save image
            $image_processor = new AIG_Image_Processor();
            $processed_image = $image_processor->process_generated_image($result);
            
            if (is_wp_error($processed_image)) {
                wp_send_json_error($processed_image->get_error_message());
            }
            
            // Save to database
            $this->save_generation_record($prompt, $result, $processed_image);
            
            wp_send_json_success(array(
                'attachment_id' => $processed_image['attachment_id'],
                'image_url' => $processed_image['image_url'],
                'thumbnail_url' => $processed_image['thumbnail_url'],
                'message' => 'Image generated successfully!'
            ));
            
        } catch (Exception $e) {
            wp_send_json_error('Error generating image: ' . $e->getMessage());
        }
    }
    
    public function handle_set_featured_image() {
        if (!wp_verify_nonce($_POST['nonce'], 'aig_nonce')) {
            wp_die('Security check failed');
        }
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error('Insufficient permissions');
        }
        
        $post_id = intval($_POST['post_id']);
        $attachment_id = intval($_POST['attachment_id']);
        
        if (empty($post_id) || empty($attachment_id)) {
            wp_send_json_error('Invalid post ID or attachment ID');
        }
        
        // Set as featured image
        $result = set_post_thumbnail($post_id, $attachment_id);
        
        if ($result) {
            wp_send_json_success('Featured image set successfully');
        } else {
            wp_send_json_error('Failed to set featured image');
        }
    }
    
    public function handle_get_status() {
        if (!wp_verify_nonce($_POST['nonce'], 'aig_nonce')) {
            wp_die('Security check failed');
        }
        
        $generation_id = sanitize_text_field($_POST['generation_id']);
        
        // For async processing (if implemented)
        $status = $this->get_generation_status($generation_id);
        
        wp_send_json_success($status);
    }
    
    private function check_rate_limit() {
        $max_per_hour = get_option('aig_max_generations_per_hour', 50);
        $user_id = get_current_user_id();
        
        // Get current hour's generation count for user
        global $wpdb;
        $table_name = $wpdb->prefix . 'aig_generated_images';
        
        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $table_name 
             WHERE user_id = %d 
             AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)",
            $user_id
        ));
        
        return $count < $max_per_hour;
    }
    
    private function save_generation_record($prompt, $api_result, $processed_image) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'aig_generated_images';
        
        $wpdb->insert(
            $table_name,
            array(
                'user_id' => get_current_user_id(),
                'prompt' => $prompt,
                'api_provider' => get_option('aig_api_provider', 'dalle'),
                'image_url' => $processed_image['image_url'],
                'attachment_id' => $processed_image['attachment_id'],
                'generation_cost' => $api_result['cost'] ?? 0,
                'generation_time' => $api_result['generation_time'] ?? 0,
                'image_size' => $processed_image['size'],
                'created_at' => current_time('mysql')
            ),
            array(
                '%d', '%s', '%s', '%s', '%d', '%f', '%f', '%s', '%s'
            )
        );
    }
    
    private function get_generation_status($generation_id) {
        // Implementation for async status checking
        // This would be used if you implement background processing
        
        return array(
            'status' => 'completed',
            'progress' => 100,
            'message' => 'Image generation completed'
        );
    }
}