<?php
/**
 * Uninstall script for AI Image Generator
 */

// If uninstall not called from WordPress, exit
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete options
$options = array(
    'aig_api_provider',
    'aig_dalle_api_key', 
    'aig_stable_diffusion_api_key',
    'aig_default_image_size',
    'aig_auto_compress',
    'aig_compression_quality',
    'aig_save_to_library',
    'aig_max_generations_per_hour'
);

foreach ($options as $option) {
    delete_option($option);
}

// Drop custom tables
global $wpdb;

$tables = array(
    $wpdb->prefix . 'aig_generated_images',
    $wpdb->prefix . 'aig_usage_tracking'
);

foreach ($tables as $table) {
    $wpdb->query("DROP TABLE IF EXISTS $table");
}

// Clear any cached data
wp_cache_flush();