<?php
/**
 * Database operations for AI Image Generator
 */

class AIG_Database {
    
    public static function create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'aig_generated_images';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            post_id bigint(20) DEFAULT NULL,
            prompt text NOT NULL,
            api_provider varchar(50) NOT NULL,
            image_url varchar(500) DEFAULT NULL,
            attachment_id bigint(20) DEFAULT NULL,
            generation_cost decimal(10,4) DEFAULT 0.0000,
            generation_time decimal(10,4) DEFAULT 0.0000,
            image_size varchar(20) DEFAULT NULL,
            style varchar(50) DEFAULT NULL,
            status varchar(20) DEFAULT 'completed',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY post_id (post_id),
            KEY api_provider (api_provider),
            KEY status (status),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        
        // Create usage tracking table
        $usage_table = $wpdb->prefix . 'aig_usage_tracking';
        
        $usage_sql = "CREATE TABLE $usage_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            action varchar(50) NOT NULL,
            api_provider varchar(50) NOT NULL,
            cost decimal(10,4) DEFAULT 0.0000,
            metadata longtext DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY action (action),
            KEY api_provider (api_provider),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        dbDelta($usage_sql);
    }
    
    public static function get_user_generations($user_id, $limit = 20, $offset = 0) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'aig_generated_images';
        
        return $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name 
             WHERE user_id = %d 
             ORDER BY created_at DESC 
             LIMIT %d OFFSET %d",
            $user_id,
            $limit,
            $offset
        ));
    }
    
    public static function get_generation_stats($period = '30 days') {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'aig_generated_images';
        
        $stats = $wpdb->get_row($wpdb->prepare(
            "SELECT 
                COUNT(*) as total_generations,
                COUNT(DISTINCT user_id) as unique_users,
                SUM(generation_cost) as total_cost,
                AVG(generation_time) as avg_generation_time,
                api_provider
             FROM $table_name 
             WHERE created_at >= DATE_SUB(NOW(), INTERVAL %s)
             GROUP BY api_provider",
            $period
        ));
        
        return $stats;
    }
    
    public static function cleanup_old_records($days = 90) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'aig_generated_images';
        $usage_table = $wpdb->prefix . 'aig_usage_tracking';
        
        // Delete old generation records
        $deleted_generations = $wpdb->query($wpdb->prepare(
            "DELETE FROM $table_name 
             WHERE created_at < DATE_SUB(NOW(), INTERVAL %d DAY)",
            $days
        ));
        
        // Delete old usage tracking records
        $deleted_usage = $wpdb->query($wpdb->prepare(
            "DELETE FROM $usage_table 
             WHERE created_at < DATE_SUB(NOW(), INTERVAL %d DAY)",
            $days
        ));
        
        return array(
            'generations_deleted' => $deleted_generations,
            'usage_records_deleted' => $deleted_usage
        );
    }
    
    public static function log_usage($user_id, $action, $api_provider, $cost = 0, $metadata = null) {
        global $wpdb;
        
        $usage_table = $wpdb->prefix . 'aig_usage_tracking';
        
        return $wpdb->insert(
            $usage_table,
            array(
                'user_id' => $user_id,
                'action' => $action,
                'api_provider' => $api_provider,
                'cost' => $cost,
                'metadata' => is_array($metadata) ? wp_json_encode($metadata) : $metadata,
                'created_at' => current_time('mysql')
            ),
            array('%d', '%s', '%s', '%f', '%s', '%s')
        );
    }
    
    public static function get_user_usage_summary($user_id, $period = '30 days') {
        global $wpdb;
        
        $usage_table = $wpdb->prefix . 'aig_usage_tracking';
        
        return $wpdb->get_row($wpdb->prepare(
            "SELECT 
                COUNT(*) as total_actions,
                SUM(cost) as total_cost,
                COUNT(DISTINCT api_provider) as providers_used
             FROM $usage_table 
             WHERE user_id = %d 
             AND created_at >= DATE_SUB(NOW(), INTERVAL %s)",
            $user_id,
            $period
        ));
    }
    
    public static function export_user_data($user_id) {
        global $wpdb;
        
        $generations_table = $wpdb->prefix . 'aig_generated_images';
        $usage_table = $wpdb->prefix . 'aig_usage_tracking';
        
        // Get user's generations
        $generations = $wpdb->get_results($wpdb->prepare(
            "SELECT prompt, api_provider, generation_cost, image_size, created_at 
             FROM $generations_table 
             WHERE user_id = %d 
             ORDER BY created_at DESC",
            $user_id
        ));
        
        // Get user's usage data
        $usage = $wpdb->get_results($wpdb->prepare(
            "SELECT action, api_provider, cost, created_at 
             FROM $usage_table 
             WHERE user_id = %d 
             ORDER BY created_at DESC",
            $user_id
        ));
        
        return array(
            'generations' => $generations,
            'usage' => $usage
        );
    }
    
    public static function delete_user_data($user_id) {
        global $wpdb;
        
        $generations_table = $wpdb->prefix . 'aig_generated_images';
        $usage_table = $wpdb->prefix . 'aig_usage_tracking';
        
        // Delete user's generations
        $deleted_generations = $wpdb->delete(
            $generations_table,
            array('user_id' => $user_id),
            array('%d')
        );
        
        // Delete user's usage data
        $deleted_usage = $wpdb->delete(
            $usage_table,
            array('user_id' => $user_id),
            array('%d')
        );
        
        return array(
            'generations_deleted' => $deleted_generations,
            'usage_deleted' => $deleted_usage
        );
    }
}

// GDPR Compliance hooks
add_action('wp_privacy_personal_data_exporters', 'aig_register_data_exporter');
add_action('wp_privacy_personal_data_erasers', 'aig_register_data_eraser');

function aig_register_data_exporter($exporters) {
    $exporters['ai-image-generator'] = array(
        'exporter_friendly_name' => __('AI Image Generator Data', 'ai-image-generator'),
        'callback' => 'aig_export_user_data',
    );
    return $exporters;
}

function aig_register_data_eraser($erasers) {
    $erasers['ai-image-generator'] = array(
        'eraser_friendly_name' => __('AI Image Generator Data', 'ai-image-generator'),
        'callback' => 'aig_erase_user_data',
    );
    return $erasers;
}

function aig_export_user_data($email_address, $page = 1) {
    $user = get_user_by('email', $email_address);
    
    if (!$user) {
        return array(
            'data' => array(),
            'done' => true,
        );
    }
    
    $data = AIG_Database::export_user_data($user->ID);
    
    $export_items = array();
    
    // Export generations
    foreach ($data['generations'] as $generation) {
        $export_items[] = array(
            'group_id' => 'ai_image_generations',
            'group_label' => __('AI Image Generations', 'ai-image-generator'),
            'item_id' => 'generation-' . $generation->id,
            'data' => array(
                array('name' => __('Prompt', 'ai-image-generator'), 'value' => $generation->prompt),
                array('name' => __('API Provider', 'ai-image-generator'), 'value' => $generation->api_provider),
                array('name' => __('Cost', 'ai-image-generator'), 'value' => '$' . $generation->generation_cost),
                array('name' => __('Generated', 'ai-image-generator'), 'value' => $generation->created_at),
            ),
        );
    }
    
    return array(
        'data' => $export_items,
        'done' => true,
    );
}

function aig_erase_user_data($email_address, $page = 1) {
    $user = get_user_by('email', $email_address);
    
    if (!$user) {
        return array(
            'items_removed' => 0,
            'items_retained' => 0,
            'messages' => array(),
            'done' => true,
        );
    }
    
    $result = AIG_Database::delete_user_data($user->ID);
    
    return array(
        'items_removed' => $result['generations_deleted'] + $result['usage_deleted'],
        'items_retained' => 0,
        'messages' => array(__('AI Image Generator data erased.', 'ai-image-generator')),
        'done' => true,
    );
}