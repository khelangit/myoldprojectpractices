<?php
/**
 * Plugin Name: AI Image Generator Pro
 * Description: Adds AI image generation to WordPress editor and sliders
 * Version: 1.0
 * Author: Your Name
 */

defined('ABSPATH') || exit;

// Activation hook
register_activation_hook(__FILE__, 'aiig_activate');
function aiig_activate() {
    // Check PHP version
    if (version_compare(PHP_VERSION, '7.0', '<')) {
        deactivate_plugins(plugin_basename(__FILE__));
        wp_die('AI Image Generator Pro requires PHP 7.0 or higher.');
    }
    
    // Check WordPress version
    if (version_compare(get_bloginfo('version'), '5.0', '<')) {
        deactivate_plugins(plugin_basename(__FILE__));
        wp_die('AI Image Generator Pro requires WordPress 5.0 or higher.');
    }
    
    // Create required directories
    $upload_dir = wp_upload_dir();
    $aiig_dir = $upload_dir['basedir'] . '/aiig-generated';
    if (!file_exists($aiig_dir)) {
        wp_mkdir_p($aiig_dir);
    }
}

// Register settings
add_action('admin_init', function() {
    register_setting('aiig_settings', 'aiig_api_key');
    register_setting('aiig_settings', 'aiig_default_size');
});

// Include required files
function aiig_include_files() {
    $files = [
        'includes/class-ai-image-generator.php',
        'includes/class-slider-integration.php',
        'includes/class-api-handler.php',
        'includes/class-settings.php'
    ];
    
    foreach ($files as $file) {
        $path = plugin_dir_path(__FILE__) . $file;
        if (file_exists($path)) {
            require_once $path;
        }
    }
}

// Initialize plugin after all files are loaded
add_action('plugins_loaded', 'aiig_initialize_plugin');
function aiig_initialize_plugin() {
    // Include all required files first
    aiig_include_files();
    
    // Now initialize classes if they exist
    if (class_exists('AIIG_Image_Generator_Pro')) {
        new AIIG_Image_Generator_Pro();
    }
    
    if (class_exists('AIIG_Image_Generator')) {
        new AIIG_Image_Generator();
    }
    
    if (class_exists('AIIG_Slider_Integration')) {
        new AIIG_Slider_Integration();
    }
    
    if (class_exists('AIIG_Settings')) {
        new AIIG_Settings();
    }
}

// Define the main plugin class
if (!class_exists('AIIG_Image_Generator_Pro')) {
    class AIIG_Image_Generator_Pro {
        public function __construct() {
            $this->init_hooks();
        }

        private function init_hooks() {
            add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
            add_action('admin_menu', [$this, 'add_settings_page']);
            // Add button to featured image meta box
            add_filter('admin_post_thumbnail_html', [$this, 'add_generate_button_to_featured_image'], 10, 3);
        }

        public function enqueue_admin_assets($hook) {
            // Only load on post editing screens and media library
            $allowed_hooks = ['post.php', 'post-new.php', 'upload.php'];
            if (!in_array($hook, $allowed_hooks)) {
                return;
            }
            
            wp_enqueue_style('aiig-admin-style', plugin_dir_url(__FILE__) . 'admin/css/admin-style.css');
            wp_enqueue_script('aiig-admin-script', plugin_dir_url(__FILE__) . 'admin/js/admin-script.js', ['jquery'], '1.0', true);
            
            wp_localize_script('aiig-admin-script', 'aiig_vars', [
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce'    => wp_create_nonce('aiig_nonce'),
                'modal_template' => $this->get_modal_template()
            ]);
        }

        // Add generate button to featured image meta box
        public function add_generate_button_to_featured_image($content, $post_id, $thumbnail_id) {
            // Add our button below the default featured image content
            $content .= '<div class="aiig-featured-image-button-container" style="margin-top: 10px;">';
            $content .= '<button type="button" class="button button-primary aiig-generate-image" data-target="featured">' . 
                       __('Generate AI Featured Image', 'aiig') . '</button>';
            $content .= '</div>';
            
            return $content;
        }

        public function add_settings_page() {
            add_options_page(
                __('AI Image Generator Settings', 'aiig'),
                __('AI Image Generator', 'aiig'),
                'manage_options',
                'ai-image-generator',
                [$this, 'render_settings_page']
            );
        }

        public function render_settings_page() {
            ?>
            <div class="wrap">
                <h1><?php _e('AI Image Generator Settings', 'aiig'); ?></h1>
                <form method="post" action="options.php">
                    <?php
                    settings_fields('aiig_settings');
                    do_settings_sections('aiig_settings');
                    ?>
                    <table class="form-table">
                        <tr valign="top">
                            <th scope="row"><?php _e('API Key', 'aiig'); ?></th>
                            <td>
                                <input type="text" name="aiig_api_key" value="<?php echo esc_attr(get_option('aiig_api_key')); ?>" class="regular-text" />
                                <p class="description"><?php _e('Enter your API key for the image generation service.', 'aiig'); ?></p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <th scope="row"><?php _e('Default Image Size', 'aiig'); ?></th>
                            <td>
                                <select name="aiig_default_size">
                                    <option value="256x256" <?php selected(get_option('aiig_default_size'), '256x256'); ?>>256x256</option>
                                    <option value="512x512" <?php selected(get_option('aiig_default_size'), '512x512'); ?>>512x512</option>
                                    <option value="1024x1024" <?php selected(get_option('aiig_default_size'), '1024x1024'); ?>>1024x1024</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <?php submit_button(); ?>
                </form>
            </div>
            <?php
        }

        private function get_modal_template() {
            ob_start();
            ?>
            <div class="aiig-modal">
                <div class="aiig-modal-content">
                    <div class="aiig-modal-header">
                        <h3><?php _e('Generate AI Image', 'aiig'); ?></h3>
                        <button type="button" class="aiig-close-modal button-link">&times;</button>
                    </div>
                    
                    <form class="aiig-prompt-form">
                        <div class="aiig-prompt-container">
                            <label for="aiig-prompt"><?php _e('Describe the image you want to generate:', 'aiig'); ?></label>
                            <textarea id="aiig-prompt" name="prompt" required></textarea>
                        </div>
                        
                        <div class="aiig-preview-container">
                            <!-- Generated image will appear here -->
                        </div>
                        
                        <div class="aiig-modal-footer">
                            <button type="button" class="aiig-close-modal button"><?php _e('Cancel', 'aiig'); ?></button>
                            <button type="submit" class="aiig-generate-btn button button-primary"><?php _e('Generate Image', 'aiig'); ?></button>
                            <button type="button" class="aiig-save-btn button button-primary"><?php _e('Use This Image', 'aiig'); ?></button>
                        </div>
                    </form>
                </div>
            </div>
            <?php
            return ob_get_clean();
        }
    }
}