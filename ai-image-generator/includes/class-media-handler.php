<?php
/**
 * Media upload tab integration
 */

class AIG_Media_Handler {
    
    public function __construct() {
        add_filter('media_upload_tabs', array($this, 'add_media_tab'));
        add_action('media_upload_ai_generator', array($this, 'media_upload_tab'));
        add_action('wp_ajax_aig_media_generate', array($this, 'handle_media_generate'));
    }
    
    public function add_media_tab($tabs) {
        $tabs['ai_generator'] = __('AI Generator', 'ai-image-generator');
        return $tabs;
    }
    
    public function media_upload_tab() {
        wp_enqueue_media();
        wp_enqueue_script('aig-media-tab', AIG_PLUGIN_URL . 'assets/js/media-tab.js', array('jquery'), AIG_VERSION, true);
        wp_enqueue_style('aig-media-tab', AIG_PLUGIN_URL . 'assets/css/media-tab.css', array(), AIG_VERSION);
        
        wp_localize_script('aig-media-tab', 'aig_media', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('aig_media_nonce'),
            'strings' => array(
                'generating' => __('Generating image...', 'ai-image-generator'),
                'select_image' => __('Use This Image', 'ai-image-generator'),
                'error' => __('Error generating image', 'ai-image-generator')
            )
        ));
        
        return wp_iframe(array($this, 'media_upload_form'));
    }
    
    public function media_upload_form() {
        ?>
        <div class="aig-media-tab-container">
            <div class="aig-header">
                <h2><?php _e('AI Image Generator', 'ai-image-generator'); ?></h2>
                <p><?php _e('Generate custom images using AI and add them to your media library.', 'ai-image-generator'); ?></p>
            </div>
            
            <div class="aig-form-container">
                <form id="aig-media-form">
                    <div class="aig-form-row">
                        <label for="aig-media-prompt"><?php _e('Describe your image:', 'ai-image-generator'); ?></label>
                        <textarea id="aig-media-prompt" name="prompt" rows="4" placeholder="<?php _e('A beautiful sunset over mountains...', 'ai-image-generator'); ?>"></textarea>
                    </div>
                    
                    <div class="aig-form-row aig-form-columns">
                        <div class="aig-form-column">
                            <label for="aig-media-style"><?php _e('Style:', 'ai-image-generator'); ?></label>
                            <select id="aig-media-style" name="style">
                                <option value="photographic"><?php _e('Photographic', 'ai-image-generator'); ?></option>
                                <option value="digital-art"><?php _e('Digital Art', 'ai-image-generator'); ?></option>
                                <option value="cinematic"><?php _e('Cinematic', 'ai-image-generator'); ?></option>
                                <option value="anime"><?php _e('Anime Style', 'ai-image-generator'); ?></option>
                                <option value="fantasy-art"><?php _e('Fantasy Art', 'ai-image-generator'); ?></option>
                                <option value="neon-punk"><?php _e('Neon Punk', 'ai-image-generator'); ?></option>
                                <option value="isometric"><?php _e('Isometric', 'ai-image-generator'); ?></option>
                            </select>
                        </div>
                        
                        <div class="aig-form-column">
                            <label for="aig-media-size"><?php _e('Size:', 'ai-image-generator'); ?></label>
                            <select id="aig-media-size" name="size">
                                <option value="1024x1024">1024x1024 (Square)</option>
                                <option value="1792x1024">1792x1024 (Landscape)</option>
                                <option value="1024x1792">1024x1792 (Portrait)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="aig-form-row">
                        <label for="aig-media-count"><?php _e('Number of images:', 'ai-image-generator'); ?></label>
                        <select id="aig-media-count" name="count">
                            <option value="1">1 Image</option>
                            <option value="2">2 Images</option>
                            <option value="3">3 Images</option>
                            <option value="4">4 Images</option>
                        </select>
                    </div>
                    
                    <div class="aig-form-row">
                        <button type="submit" class="button button-primary button-large">
                            <span class="dashicons dashicons-art"></span>
                            <?php _e('Generate Images', 'ai-image-generator'); ?>
                        </button>
                    </div>
                </form>
            </div>
            
            <div id="aig-media-progress" class="aig-progress-container" style="display: none;">
                <div class="aig-progress-bar">
                    <div class="aig-progress-fill"></div>
                </div>
                <p class="aig-progress-text"><?php _e('Generating your images...', 'ai-image-generator'); ?></p>
            </div>
            
            <div id="aig-media-results" class="aig-results-container"></div>
        </div>
        
        <style>
        .aig-media-tab-container {
            padding: 20px;
            max-width: 800px;
        }
        
        .aig-header {
            margin-bottom: 30px;
            text-align: center;
        }
        
        .aig-header h2 {
            margin-bottom: 10px;
            color: #23282d;
        }
        
        .aig-form-container {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 20px;
        }
        
        .aig-form-row {
            margin-bottom: 20px;
        }
        
        .aig-form-row:last-child {
            margin-bottom: 0;
        }
        
        .aig-form-row label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #23282d;
        }
        
        .aig-form-row textarea,
        .aig-form-row select {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .aig-form-row textarea {
            resize: vertical;
            min-height: 80px;
        }
        
        .aig-form-columns {
            display: flex;
            gap: 20px;
        }
        
        .aig-form-column {
            flex: 1;
        }
        
        .aig-progress-container {
            text-align: center;
            padding: 20px;
        }
        
        .aig-progress-bar {
            width: 100%;
            height: 6px;
            background-color: #f1f1f1;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 15px;
        }
        
        .aig-progress-fill {
            height: 100%;
            background: linear-gradient(45deg, #0073aa, #00a0d2);
            width: 0%;
            transition: width 0.3s ease;
            animation: progress-animation 2s infinite;
        }
        
        @keyframes progress-animation {
            0% { width: 10%; }
            50% { width: 80%; }
            100% { width: 90%; }
        }
        
        .aig-results-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .aig-result-item {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .aig-result-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .aig-result-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            cursor: pointer;
        }
        
        .aig-result-actions {
            padding: 15px;
            text-align: center;
        }
        
        .aig-result-actions .button {
            width: 100%;
            margin-bottom: 8px;
        }
        
        .aig-error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        </style>
        
        <script>
        jQuery(document).ready(function($) {
            $('#aig-media-form').on('submit', function(e) {
                e.preventDefault();
                
                var formData = {
                    action: 'aig_media_generate',
                    nonce: aig_media.nonce,
                    prompt: $('#aig-media-prompt').val(),
                    style: $('#aig-media-style').val(),
                    size: $('#aig-media-size').val(),
                    count: $('#aig-media-count').val()
                };
                
                if (!formData.prompt.trim()) {
                    alert('Please enter a description for your image.');
                    return;
                }
                
                // Show progress
                $('#aig-media-progress').show();
                $('#aig-media-results').empty();
                $(this).find('button').prop('disabled', true);
                
                // Generate images
                $.ajax({
                    url: aig_media.ajax_url,
                    type: 'POST',
                    data: formData,
                    success: function(response) {
                        $('#aig-media-progress').hide();
                        $('#aig-media-form button').prop('disabled', false);
                        
                        if (response.success) {
                            displayResults(response.data);
                        } else {
                            showError(response.data || 'Unknown error occurred');
                        }
                    },
                    error: function() {
                        $('#aig-media-progress').hide();
                        $('#aig-media-form button').prop('disabled', false);
                        showError('Connection error. Please try again.');
                    }
                });
            });
            
            function displayResults(results) {
                var container = $('#aig-media-results');
                container.empty();
                
                if (results.length === 0) {
                    showError('No images were generated.');
                    return;
                }
                
                results.forEach(function(result) {
                    if (result.success) {
                        var item = $('<div class="aig-result-item">');
                        
                        var img = $('<img class="aig-result-image">');
                        img.attr('src', result.thumbnail_url || result.image_url);
                        img.attr('alt', 'Generated image');
                        
                        var actions = $('<div class="aig-result-actions">');
                        var useBtn = $('<button class="button button-primary">');
                        useBtn.text(aig_media.strings.select_image);
                        useBtn.data('attachment-id', result.attachment_id);
                        useBtn.data('url', result.image_url);
                        
                        actions.append(useBtn);
                        item.append(img, actions);
                        container.append(item);
                    } else {
                        showError(result.error);
                    }
                });
            }
            
            function showError(message) {
                var error = $('<div class="aig-error">').text(message);
                $('#aig-media-results').append(error);
            }
            
            // Handle image selection
            $(document).on('click', '.aig-result-actions button', function() {
                var attachmentId = $(this).data('attachment-id');
                var imageUrl = $(this).data('url');
                
                // Send to parent window (media modal)
                if (window.parent && window.parent.wp && window.parent.wp.media) {
                    var attachment = wp.media.attachment(attachmentId);
                    attachment.fetch().done(function() {
                        var selection = window.parent.wp.media.frame.state().get('selection');
                        selection.add(attachment);
                        window.parent.wp.media.frame.close();
                    });
                } else {
                    // Fallback for direct usage
                    alert('Image added to media library with ID: ' + attachmentId);
                }
            });
        });
        </script>
        <?php
    }
    
    public function handle_media_generate() {
        if (!wp_verify_nonce($_POST['nonce'], 'aig_media_nonce')) {
            wp_die('Security check failed');
        }
        
        if (!current_user_can('upload_files')) {
            wp_send_json_error('Insufficient permissions');
        }
        
        $prompt = sanitize_textarea_field($_POST['prompt']);
        $style = sanitize_text_field($_POST['style']);
        $size = sanitize_text_field($_POST['size']);
        $count = intval($_POST['count']);
        
        if (empty($prompt)) {
            wp_send_json_error('Prompt is required');
        }
        
        if ($count < 1 || $count > 4) {
            $count = 1;
        }
        
        $results = array();
        
        for ($i = 0; $i < $count; $i++) {
            try {
                $api_client = new AIG_API_Client();
                $result = $api_client->generate_image($prompt, array(
                    'style' => $style,
                    'size' => $size
                ));
                
                if (is_wp_error($result)) {
                    $results[] = array(
                        'success' => false,
                        'error' => $result->get_error_message()
                    );
                    continue;
                }
                
                $image_processor = new AIG_Image_Processor();
                $processed_image = $image_processor->process_generated_image($result);
                
                if (is_wp_error($processed_image)) {
                    $results[] = array(
                        'success' => false,
                        'error' => $processed_image->get_error_message()
                    );
                    continue;
                }
                
                // Save to database
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
                        'generation_cost' => $result['cost'] ?? 0,
                        'generation_time' => $result['generation_time'] ?? 0,
                        'image_size' => $size,
                        'style' => $style,
                        'status' => 'completed',
                        'created_at' => current_time('mysql')
                    ),
                    array('%d', '%s', '%s', '%s', '%d', '%f', '%f', '%s', '%s', '%s', '%s')
                );
                
                $results[] = array(
                    'success' => true,
                    'attachment_id' => $processed_image['attachment_id'],
                    'image_url' => $processed_image['image_url'],
                    'thumbnail_url' => $processed_image['thumbnail_url']
                );
                
            } catch (Exception $e) {
                $results[] = array(
                    'success' => false,
                    'error' => 'Error generating image: ' . $e->getMessage()
                );
            }
        }
        
        wp_send_json_success($results);
    }
}