<?php
/**
 * Plugin Name: AI Image Generator
 * Plugin URI: https://yoursite.com/ai-image-generator
 * Description: Generate AI images directly in WordPress post editor using DALL-E and Stable Diffusion APIs
 * Version: 1.0.0
 * Author: MK
 * License: GPL v2 or later
 * Text Domain: ai-image-generator
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AIG_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AIG_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('AIG_VERSION', '1.0.0');

class AIImageGenerator {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', array($this, 'init'));
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        load_plugin_textdomain('ai-image-generator', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        $this->includes();
        
        new AIG_Admin();
        new AIG_Media_Handler();
        new AIG_Ajax_Handler();
    }
    
    private function includes() {
        require_once AIG_PLUGIN_PATH . 'includes/class-admin.php';
        require_once AIG_PLUGIN_PATH . 'includes/class-media-handler.php';
        require_once AIG_PLUGIN_PATH . 'includes/class-ajax-handler.php';
        require_once AIG_PLUGIN_PATH . 'includes/class-api-client.php';
        require_once AIG_PLUGIN_PATH . 'includes/class-image-processor.php';
        require_once AIG_PLUGIN_PATH . 'includes/class-database.php';
    }
    
    public function activate() {
        AIG_Database::create_tables();
        
        $default_options = array(
            'api_provider' => 'dalle',
            'dalle_api_key' => '',
            'stable_diffusion_api_key' => '',
            'default_image_size' => '1024x1024',
            'auto_compress' => true,
            'compression_quality' => 85,
            'save_to_library' => true,
            'max_generations_per_hour' => 50,
            'auto_set_featured' => false // New default option
        );
        
        foreach ($default_options as $key => $value) {
            add_option('aig_' . $key, $value);
        }
    }
    
    public function deactivate() {
        wp_clear_scheduled_hook('aig_cleanup_temp_files');
    }
}

AIImageGenerator::get_instance();
