<?php
if (!defined('ABSPATH')) {
    exit;
}

// Check if class exists before declaring
if (!class_exists('AIIG_Slider_Integration')) {
    class AIIG_Slider_Integration {
        public function __construct() {
            add_action('admin_footer', [$this, 'add_slider_button']);
            add_action('wp_ajax_aiig_get_slider_images', [$this, 'get_slider_images']);
        }

        public function add_slider_button() {
            global $pagenow;
            if ('post.php' !== $pagenow && 'post-new.php' !== $pagenow) return;
            
            ?>
            <script>
            jQuery(document).ready(function($) {
                // Add button to slider section if it exists
                if ($('.slider-section').length) {
                    $('.slider-section').append(
                        '<button type="button" class="button button-secondary aiig-generate-image" data-target="slider">' +
                        '<?php _e('Generate AI Slider Image', 'aiig'); ?>' +
                        '</button>'
                    );
                }
            });
            </script>
            <?php
        }

        public function get_slider_images() {
            check_ajax_referer('aiig_nonce', 'nonce');
            
            $post_id = intval($_POST['post_id']);
            $slider_images = get_post_meta($post_id, '_aiig_slider_images', true);
            
            if (empty($slider_images)) {
                wp_send_json_success(['images' => []]);
            }
            
            $images = [];
            foreach ($slider_images as $attachment_id) {
                $images[] = [
                    'id'  => $attachment_id,
                    'url' => wp_get_attachment_url($attachment_id)
                ];
            }
            
            wp_send_json_success(['images' => $images]);
        }
    }
}