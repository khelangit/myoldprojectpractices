<?php
/**
 * Enhanced Admin class with improved featured image integration
 */

class AIG_Admin {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        
        // Enhanced featured image integration
        add_action('add_meta_boxes', array($this, 'add_meta_boxes'));
        add_action('admin_footer', array($this, 'add_featured_image_ai_integration'));
        
        // AJAX handlers
        add_action('wp_ajax_aig_quick_generate', array($this, 'handle_quick_generate'));
        add_action('wp_ajax_aig_set_featured_image', array($this, 'handle_set_featured_image'));
    }
    
    public function add_meta_boxes() {
        $post_types = get_post_types_by_support('thumbnail');
        
        foreach ($post_types as $post_type) {
            add_meta_box(
                'aig-featured-image-ai',
                __('AI Featured Image Generator', 'ai-image-generator'),
                array($this, 'ai_featured_image_meta_box'),
                $post_type,
                'side',
                'low'
            );
        }
    }
    
    public function ai_featured_image_meta_box($post) {
        wp_nonce_field('aig_featured_image_nonce', 'aig_featured_image_nonce');
        ?>
        <div id="aig-featured-ai-container">
            <div class="aig-ai-form">
                <div class="aig-form-group">
                    <label for="aig-ai-prompt"><?php _e('Describe your featured image:', 'ai-image-generator'); ?></label>
                    <textarea id="aig-ai-prompt" rows="3" placeholder="<?php echo esc_attr($this->generate_suggested_prompt($post)); ?>"></textarea>
                    <div class="aig-prompt-suggestions">
                        <small>
                            <a href="#" class="aig-use-title"><?php _e('Use post title', 'ai-image-generator'); ?></a> | 
                            <a href="#" class="aig-use-excerpt"><?php _e('Use excerpt', 'ai-image-generator'); ?></a>
                        </small>
                    </div>
                </div>
                
                <div class="aig-form-row">
                    <div class="aig-form-half">
                        <label for="aig-ai-style"><?php _e('Style:', 'ai-image-generator'); ?></label>
                        <select id="aig-ai-style">
                            <?php
                            $styles = array(
                                'photographic' => __('Photographic', 'ai-image-generator'),
                                'digital-art' => __('Digital Art', 'ai-image-generator'),
                                'cinematic' => __('Cinematic', 'ai-image-generator'),
                                'anime' => __('Anime Style', 'ai-image-generator'),
                                'fantasy-art' => __('Fantasy Art', 'ai-image-generator'),
                                'watercolor' => __('Watercolor', 'ai-image-generator'),
                                'oil-painting' => __('Oil Painting', 'ai-image-generator'),
                                'sketch' => __('Pencil Sketch', 'ai-image-generator')
                            );
                            foreach ($styles as $value => $label) {
                                echo '<option value="' . esc_attr($value) . '">' . esc_html($label) . '</option>';
                            }
                            ?>
                        </select>
                    </div>
                    
                    <div class="aig-form-half">
                        <label for="aig-ai-size"><?php _e('Size:', 'ai-image-generator'); ?></label>
                        <select id="aig-ai-size">
                            <option value="1024x1024"><?php _e('Square (1:1)', 'ai-image-generator'); ?></option>
                            <option value="1792x1024"><?php _e('Landscape (16:9)', 'ai-image-generator'); ?></option>
                            <option value="1024x1792"><?php _e('Portrait (9:16)', 'ai-image-generator'); ?></option>
                        </select>
                    </div>
                </div>
                
                <div class="aig-actions">
                    <button type="button" id="aig-ai-generate" class="button button-primary button-large">
                        <span class="dashicons dashicons-art"></span>
                        <?php _e('Generate & Set Featured Image', 'ai-image-generator'); ?>
                    </button>
                </div>
            </div>
            
            <!-- Progress indicator -->
            <div id="aig-ai-progress" style="display: none;">
                <div class="aig-progress-indicator">
                    <div class="aig-progress-bar">
                        <div class="aig-progress-fill"></div>
                    </div>
                    <div class="aig-progress-text">
                        <span class="aig-progress-message"><?php _e('Generating your featured image...', 'ai-image-generator'); ?></span>
                        <span class="aig-progress-tip"><?php _e('This usually takes 10-30 seconds', 'ai-image-generator'); ?></span>
                    </div>
                </div>
            </div>
            
            <!-- Result display -->
            <div id="aig-ai-result" style="display: none;"></div>
        </div>
        
        <style>
        #aig-featured-ai-container {
            margin: 10px 0;
        }
        
        .aig-form-group {
            margin-bottom: 15px;
        }
        
        .aig-form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
            color: #23282d;
        }
        
        .aig-form-group textarea,
        .aig-form-group select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 13px;
        }
        
        .aig-form-group textarea {
            resize: vertical;
            min-height: 60px;
            font-family: inherit;
        }
        
        .aig-prompt-suggestions {
            margin-top: 5px;
        }
        
        .aig-prompt-suggestions a {
            text-decoration: none;
            color: #0073aa;
            font-size: 11px;
        }
        
        .aig-prompt-suggestions a:hover {
            text-decoration: underline;
        }
        
        .aig-form-row {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .aig-form-half {
            flex: 1;
        }
        
        .aig-form-half label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
            color: #23282d;
        }
        
        .aig-form-half select {
            width: 100%;
            padding: 6px 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 12px;
        }
        
        .aig-actions {
            text-align: center;
        }
        
        #aig-ai-generate {
            width: 100%;
            padding: 10px !important;
            height: auto !important;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .aig-progress-indicator {
            text-align: center;
            padding: 20px 10px;
        }
        
        .aig-progress-bar {
            width: 100%;
            height: 4px;
            background: #f0f0f0;
            border-radius: 2px;
            margin-bottom: 10px;
            overflow: hidden;
        }
        
        .aig-progress-fill {
            height: 100%;
            background: linear-gradient(45deg, #0073aa, #00a0d2);
            width: 0%;
            border-radius: 2px;
            animation: aig-progress-animation 2s infinite ease-in-out;
        }
        
        @keyframes aig-progress-animation {
            0% { width: 10%; }
            50% { width: 80%; }
            100% { width: 90%; }
        }
        
        .aig-progress-text {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .aig-progress-message {
            font-weight: 600;
            color: #23282d;
            font-size: 13px;
        }
        
        .aig-progress-tip {
            font-size: 11px;
            color: #666;
        }
        
        .aig-result-success {
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            margin-top: 15px;
        }
        
        .aig-result-image {
            padding: 10px;
            background: #f9f9f9;
            text-align: center;
        }
        
        .aig-result-image img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        
        .aig-result-actions {
            padding: 10px;
            text-align: center;
        }
        
        .aig-result-error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 4px;
            margin-top: 15px;
            text-align: center;
            font-size: 13px;
        }
        
        @media (max-width: 782px) {
            .aig-form-row {
                flex-direction: column;
            }
        }
        </style>
        <?php
    }
    
    public function add_featured_image_ai_integration() {
        $screen = get_current_screen();
        
        if (!$screen || !in_array($screen->base, array('post', 'post-new'))) {
            return;
        }
        
        if (!post_type_supports($screen->post_type, 'thumbnail')) {
            return;
        }
        ?>
        
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Add AI generation button to featured image meta box
            addAIButtonToFeaturedImage();
            
            // Handle AI generation from separate meta box
            $('#aig-ai-generate').on('click', function() {
                generateAIFeaturedImage();
            });
            
            // Handle prompt suggestions
            $('.aig-use-title').on('click', function(e) {
                e.preventDefault();
                var title = $('#title').val() || $('input[name="post_title"]').val() || '';
                if (title) {
                    $('#aig-ai-prompt').val(title);
                }
            });
            
            $('.aig-use-excerpt').on('click', function(e) {
                e.preventDefault();
                var excerpt = $('#excerpt').val() || '';
                if (!excerpt && typeof tinyMCE !== 'undefined' && tinyMCE.get('content')) {
                    var content = tinyMCE.get('content').getContent({format: 'text'});
                    excerpt = content.substring(0, 150) + '...';
                }
                if (excerpt) {
                    $('#aig-ai-prompt').val(excerpt);
                }
            });
            
            function addAIButtonToFeaturedImage() {
                var $featuredImageDiv = $('#postimagediv');
                
                if ($featuredImageDiv.length > 0) {
                    // Check if we already added our button
                    if ($featuredImageDiv.find('.aig-featured-ai-btn').length > 0) {
                        return;
                    }
                    
                    var $setFeaturedLink = $featuredImageDiv.find('#set-post-thumbnail, .set-post-thumbnail');
                    var $removeFeaturedLink = $featuredImageDiv.find('#remove-post-thumbnail');
                    
                    if ($setFeaturedLink.length > 0) {
                        // Add AI generation option next to "Set featured image"
                        var aiButton = '<a href="#" class="aig-featured-ai-btn" style="margin-left: 10px; color: #0073aa;">' +
                            '<span class="dashicons dashicons-art" style="font-size: 16px; vertical-align: middle; margin-right: 4px;"></span>' +
                            '<?php echo esc_js(__('Generate with AI', 'ai-image-generator')); ?></a>';
                        
                        $setFeaturedLink.after(aiButton);
                        
                        // Handle click on AI button
                        $('.aig-featured-ai-btn').on('click', function(e) {
                            e.preventDefault();
                            showAIPromptDialog();
                        });
                    }
                }
            }
            
            function showAIPromptDialog() {
                var dialogHtml = '<div id="aig-prompt-dialog" style="display: none;">' +
                    '<div class="aig-dialog-content">' +
                        '<h3><?php echo esc_js(__('Generate AI Featured Image', 'ai-image-generator')); ?></h3>' +
                        '<div class="aig-dialog-form">' +
                            '<label for="aig-dialog-prompt"><?php echo esc_js(__('Describe your image:', 'ai-image-generator')); ?></label>' +
                            '<textarea id="aig-dialog-prompt" rows="3" style="width: 100%; margin: 8px 0;"></textarea>' +
                            '<div style="display: flex; gap: 10px; margin-bottom: 15px;">' +
                                '<div style="flex: 1;">' +
                                    '<label><?php echo esc_js(__('Style:', 'ai-image-generator')); ?></label>' +
                                    '<select id="aig-dialog-style" style="width: 100%;">' +
                                        '<option value="photographic"><?php echo esc_js(__('Photographic', 'ai-image-generator')); ?></option>' +
                                        '<option value="digital-art"><?php echo esc_js(__('Digital Art', 'ai-image-generator')); ?></option>' +
                                        '<option value="cinematic"><?php echo esc_js(__('Cinematic', 'ai-image-generator')); ?></option>' +
                                        '<option value="anime"><?php echo esc_js(__('Anime Style', 'ai-image-generator')); ?></option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="flex: 1;">' +
                                    '<label><?php echo esc_js(__('Size:', 'ai-image-generator')); ?></label>' +
                                    '<select id="aig-dialog-size" style="width: 100%;">' +
                                        '<option value="1024x1024"><?php echo esc_js(__('Square (1:1)', 'ai-image-generator')); ?></option>' +
                                        '<option value="1792x1024"><?php echo esc_js(__('Landscape (16:9)', 'ai-image-generator')); ?></option>' +
                                        '<option value="1024x1792"><?php echo esc_js(__('Portrait (9:16)', 'ai-image-generator')); ?></option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="aig-dialog-actions" style="text-align: right; padding-top: 15px; border-top: 1px solid #ddd;">' +
                            '<button type="button" class="button" id="aig-dialog-cancel"><?php echo esc_js(__('Cancel', 'ai-image-generator')); ?></button>' +
                            '<button type="button" class="button button-primary" id="aig-dialog-generate" style="margin-left: 8px;">' +
                                '<span class="dashicons dashicons-art" style="margin-right: 4px;"></span>' +
                                '<?php echo esc_js(__('Generate Image', 'ai-image-generator')); ?>' +
                            '</button>' +
                        '</div>' +
                        '<div id="aig-dialog-progress" style="display: none; text-align: center; padding: 20px;">' +
                            '<div style="width: 100%; height: 4px; background: #f0f0f0; border-radius: 2px; margin-bottom: 10px;">' +
                                '<div style="height: 100%; background: linear-gradient(45deg, #0073aa, #00a0d2); width: 0%; border-radius: 2px; animation: aig-progress-animation 2s infinite ease-in-out;"></div>' +
                            '</div>' +
                            '<p><?php echo esc_js(__('Generating your image...', 'ai-image-generator')); ?></p>' +
                        '</div>' +
                    '</div>' +
                '</div>';
                
                // Remove existing dialog if any
                $('#aig-prompt-dialog').remove();
                
                // Add dialog to body
                $('body').append(dialogHtml);
                
                // Show dialog using WordPress thickbox or custom modal
                $('#aig-prompt-dialog').dialog({
                    title: '<?php echo esc_js(__('Generate AI Featured Image', 'ai-image-generator')); ?>',
                    modal: true,
                    width: 500,
                    resizable: false,
                    close: function() {
                        $(this).remove();
                    }
                });
                
                // Set default prompt
                var defaultPrompt = getDefaultPrompt();
                $('#aig-dialog-prompt').val(defaultPrompt);
                
                // Handle dialog buttons
                $('#aig-dialog-cancel').on('click', function() {
                    $('#aig-prompt-dialog').dialog('close');
                });
                
                $('#aig-dialog-generate').on('click', function() {
                    generateFromDialog();
                });
            }
            
            function generateFromDialog() {
                var prompt = $('#aig-dialog-prompt').val().trim();
                var style = $('#aig-dialog-style').val();
                var size = $('#aig-dialog-size').val();
                
                if (!prompt) {
                    alert('<?php echo esc_js(__('Please enter a description for your image.', 'ai-image-generator')); ?>');
                    return;
                }
                
                // Show progress
                $('.aig-dialog-form, .aig-dialog-actions').hide();
                $('#aig-dialog-progress').show();
                
                // Generate image
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'aig_quick_generate',
                        nonce: '<?php echo wp_create_nonce('aig_nonce'); ?>',
                        prompt: prompt,
                        style: style,
                        size: size,
                        post_id: <?php echo get_the_ID() ?: 0; ?>
                    },
                    success: function(response) {
                        if (response.success) {
                            // Set as featured image and close dialog
                            setFeaturedImageAndRefresh(response.data.attachment_id);
                        } else {
                            alert('<?php echo esc_js(__('Error generating image:', 'ai-image-generator')); ?> ' + (response.data || 'Unknown error'));
                            $('#aig-prompt-dialog').dialog('close');
                        }
                    },
                    error: function() {
                        alert('<?php echo esc_js(__('Connection error. Please try again.', 'ai-image-generator')); ?>');
                        $('#aig-prompt-dialog').dialog('close');
                    }
                });
            }
            
            function generateAIFeaturedImage() {
                var prompt = $('#aig-ai-prompt').val().trim();
                var style = $('#aig-ai-style').val();
                var size = $('#aig-ai-size').val();
                var postId = <?php echo get_the_ID() ?: 0; ?>;
                
                if (!prompt) {
                    alert('<?php echo esc_js(__('Please enter a description for your image.', 'ai-image-generator')); ?>');
                    return;
                }
                
                // Show progress
                $('#aig-ai-progress').show();
                $('#aig-ai-result').hide().empty();
                $('#aig-ai-generate').prop('disabled', true);
                
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'aig_quick_generate',
                        nonce: '<?php echo wp_create_nonce('aig_nonce'); ?>',
                        prompt: prompt,
                        style: style,
                        size: size,
                        post_id: postId
                    },
                    success: function(response) {
                        $('#aig-ai-progress').hide();
                        $('#aig-ai-generate').prop('disabled', false);
                        
                        if (response.success) {
                            var data = response.data;
                            var resultHtml = '<div class="aig-result-success">' +
                                '<div class="aig-result-image">' +
                                    '<img src="' + data.thumbnail_url + '" alt="Generated image" />' +
                                '</div>' +
                                '<div class="aig-result-actions">' +
                                    '<button type="button" class="button button-primary aig-set-featured" data-attachment-id="' + data.attachment_id + '">' +
                                        '<?php echo esc_js(__('Set as Featured Image', 'ai-image-generator')); ?>' +
                                    '</button>' +
                                '</div>' +
                            '</div>';
                            
                            $('#aig-ai-result').html(resultHtml).show();
                            
                            // Auto-set if enabled
                            if (<?php echo get_option('aig_auto_set_featured', false) ? 'true' : 'false'; ?>) {
                                setFeaturedImageAndRefresh(data.attachment_id);
                            }
                        } else {
                            $('#aig-ai-result').html('<div class="aig-result-error">' + (response.data || 'Error generating image') + '</div>').show();
                        }
                    },
                    error: function() {
                        $('#aig-ai-progress').hide();
                        $('#aig-ai-generate').prop('disabled', false);
                        $('#aig-ai-result').html('<div class="aig-result-error"><?php echo esc_js(__('Connection error. Please try again.', 'ai-image-generator')); ?></div>').show();
                    }
                });
            }
            
            // Handle manual set featured image
            $(document).on('click', '.aig-set-featured', function() {
                var attachmentId = $(this).data('attachment-id');
                setFeaturedImageAndRefresh(attachmentId);
            });
            
            function setFeaturedImageAndRefresh(attachmentId) {
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'aig_set_featured_image',
                        nonce: '<?php echo wp_create_nonce('aig_nonce'); ?>',
                        post_id: <?php echo get_the_ID() ?: 0; ?>,
                        attachment_id: attachmentId
                    },
                    success: function(response) {
                        if (response.success) {
                            // Close dialog if open
                            if ($('#aig-prompt-dialog').length > 0) {
                                $('#aig-prompt-dialog').dialog('close');
                            }
                            // Refresh the page to show new featured image
                            location.reload();
                        } else {
                            alert('<?php echo esc_js(__('Failed to set featured image:', 'ai-image-generator')); ?> ' + (response.data || 'Unknown error'));
                        }
                    },
                    error: function() {
                        alert('<?php echo esc_js(__('Error setting featured image. Please try again.', 'ai-image-generator')); ?>');
                    }
                });
            }
            
            function getDefaultPrompt() {
                var title = $('#title').val() || $('input[name="post_title"]').val() || '';
                var excerpt = $('#excerpt').val() || '';
                
                if (!excerpt && typeof tinyMCE !== 'undefined' && tinyMCE.get('content')) {
                    var content = tinyMCE.get('content').getContent({format: 'text'});
                    excerpt = content.substring(0, 100) + '...';
                }
                
                if (title && excerpt) {
                    return title + '. ' + excerpt;
                } else if (title) {
                    return title;
                } else if (excerpt) {
                    return excerpt;
                }
                
                return 'Professional, high-quality image';
            }
            
            // Refresh AI button when featured image changes
            $(document).on('DOMSubtreeModified', '#postimagediv', function() {
                setTimeout(addAIButtonToFeaturedImage, 100);
            });
            
            // For modern browsers
            if (typeof MutationObserver !== 'undefined') {
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList') {
                            setTimeout(addAIButtonToFeaturedImage, 100);
                        }
                    });
                });
                
                var target = document.getElementById('postimagediv');
                if (target) {
                    observer.observe(target, { childList: true, subtree: true });
                }
            }
        });
        </script>
        
        <style>
        .aig-featured-ai-btn {
            display: inline-block;
            text-decoration: none;
            font-weight: 500;
        }
        
        .aig-featured-ai-btn:hover {
            text-decoration: underline;
        }
        
        #aig-prompt-dialog .aig-dialog-content {
            padding: 20px;
        }
        
        #aig-prompt-dialog label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
            color: #23282d;
        }
        
        #aig-prompt-dialog textarea,
        #aig-prompt-dialog select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 13px;
        }
        
        #aig-prompt-dialog textarea {
            resize: vertical;
            font-family: inherit;
        }
        
        @keyframes aig-progress-animation {
            0% { width: 10%; }
            50% { width: 80%; }
            100% { width: 90%; }
        }
        </style>
        <?php
    }
    
    private function generate_suggested_prompt($post) {
        $title = $post->post_title;
        $content = wp_strip_all_tags($post->post_content);
        $excerpt = wp_trim_words($content, 20);
        
        if (empty($title) && empty($excerpt)) {
            return __('Professional, high-quality image', 'ai-image-generator');
        }
        
        $prompt = '';
        if (!empty($title)) {
            $prompt .= $title;
        }
        
        if (!empty($excerpt) && strlen($prompt) < 100) {
            $prompt .= (!empty($prompt) ? '. ' : '') . $excerpt;
        }
        
        $prompt = wp_trim_words($prompt, 25);
        
        return $prompt;
    }
    
    public function enqueue_admin_scripts($hook) {
        if ('post.php' == $hook || 'post-new.php' == $hook || strpos($hook, 'ai-image-generator') !== false) {
            wp_enqueue_script('jquery-ui-dialog');
            wp_enqueue_style('wp-jquery-ui-dialog');
            
            wp_enqueue_script(
                'aig-admin-script',
                AIG_PLUGIN_URL . 'assets/js/admin.js',
                array('jquery', 'jquery-ui-dialog'),
                AIG_VERSION,
                true
            );
            
            wp_enqueue_style(
                'aig-admin-style',
                AIG_PLUGIN_URL . 'assets/css/admin.css',
                array('wp-jquery-ui-dialog'),
                AIG_VERSION
            );
            
            wp_localize_script('aig-admin-script', 'aig_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('aig_nonce'),
                'post_id' => get_the_ID(),
                'auto_set_featured' => get_option('aig_auto_set_featured', false),
                'strings' => array(
                    'generating' => __('Generating image...', 'ai-image-generator'),
                    'error' => __('Error generating image', 'ai-image-generator'),
                    'success' => __('Image generated successfully!', 'ai-image-generator'),
                    'set_featured' => __('Set as featured image', 'ai-image-generator'),
                    'remove_featured' => __('Remove featured image', 'ai-image-generator'),
                    'ai_generate' => __('Generate with AI', 'ai-image-generator'),
                    'enter_prompt' => __('Enter image description...', 'ai-image-generator'),
                    'generate_button' => __('Generate Image', 'ai-image-generator')
                )
            ));
        }
    }
    
    public function handle_quick_generate() {
        if (!wp_verify_nonce($_POST['nonce'], 'aig_nonce')) {
            wp_die('Security check failed');
        }
        
        if (!current_user_can('upload_files')) {
            wp_send_json_error('Insufficient permissions');
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
            global $wpdb;
            $table_name = $wpdb->prefix . 'aig_generated_images';
            
            $wpdb->insert(
                $table_name,
                array(
                    'user_id' => get_current_user_id(),
                    'post_id' => $post_id,
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
                array('%d', '%d', '%s', '%s', '%s', '%d', '%f', '%f', '%s', '%s', '%s', '%s')
            );
            
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
    
    public function add_admin_menu() {
        add_options_page(
            __('AI Image Generator Settings', 'ai-image-generator'),
            __('AI Image Generator', 'ai-image-generator'),
            'manage_options',
            'ai-image-generator',
            array($this, 'settings_page')
        );
    }
    
    public function register_settings() {
        register_setting('aig_settings', 'aig_api_provider');
        register_setting('aig_settings', 'aig_dalle_api_key');
        register_setting('aig_settings', 'aig_stable_diffusion_api_key');
        register_setting('aig_settings', 'aig_default_image_size');
        register_setting('aig_settings', 'aig_auto_compress');
        register_setting('aig_settings', 'aig_compression_quality');
        register_setting('aig_settings', 'aig_save_to_library');
        register_setting('aig_settings', 'aig_max_generations_per_hour');
        register_setting('aig_settings', 'aig_auto_set_featured');
        register_setting('aig_settings', 'aig_show_ai_first');
    }
    
    public function settings_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <form method="post" action="options.php">
                <?php
                settings_fields('aig_settings');
                do_settings_sections('aig_settings');
                ?>
                
                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><?php _e('API Provider', 'ai-image-generator'); ?></th>
                        <td>
                            <select name="aig_api_provider" id="aig_api_provider">
                                <option value="dalle" <?php selected(get_option('aig_api_provider'), 'dalle'); ?>>DALL-E</option>
                                <option value="stable_diffusion" <?php selected(get_option('aig_api_provider'), 'stable_diffusion'); ?>>Stable Diffusion</option>
                            </select>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('DALL-E API Key', 'ai-image-generator'); ?></th>
                        <td>
                            <input type="password" name="aig_dalle_api_key" value="<?php echo esc_attr(get_option('aig_dalle_api_key')); ?>" class="regular-text" />
                            <p class="description"><?php _e('Get your API key from OpenAI', 'ai-image-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Stable Diffusion API Key', 'ai-image-generator'); ?></th>
                        <td>
                            <input type="password" name="aig_stable_diffusion_api_key" value="<?php echo esc_attr(get_option('aig_stable_diffusion_api_key')); ?>" class="regular-text" />
                            <p class="description"><?php _e('Get your API key from Stability AI', 'ai-image-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Default Image Size', 'ai-image-generator'); ?></th>
                        <td>
                            <select name="aig_default_image_size">
                                <option value="1024x1024" <?php selected(get_option('aig_default_image_size'), '1024x1024'); ?>>1024x1024</option>
                                <option value="1792x1024" <?php selected(get_option('aig_default_image_size'), '1792x1024'); ?>>1792x1024</option>
                                <option value="1024x1792" <?php selected(get_option('aig_default_image_size'), '1024x1792'); ?>>1024x1792</option>
                            </select>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Auto Set Featured Image', 'ai-image-generator'); ?></th>
                        <td>
                            <label for="aig_auto_set_featured">
                                <input type="checkbox" name="aig_auto_set_featured" id="aig_auto_set_featured" value="1" <?php checked(get_option('aig_auto_set_featured'), 1); ?> />
                                <?php _e('Automatically set AI-generated images as featured image', 'ai-image-generator'); ?>
                            </label>
                            <p class="description"><?php _e('When enabled, AI-generated images will be automatically set as the featured image upon generation.', 'ai-image-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Show AI Option First', 'ai-image-generator'); ?></th>
                        <td>
                            <label for="aig_show_ai_first">
                                <input type="checkbox" name="aig_show_ai_first" id="aig_show_ai_first" value="1" <?php checked(get_option('aig_show_ai_first'), 1); ?> />
                                <?php _e('Show AI generation as the primary option in featured image selection', 'ai-image-generator'); ?>
                            </label>
                            <p class="description"><?php _e('When enabled, the AI generation button will appear first and be styled as primary.', 'ai-image-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Auto Compress Images', 'ai-image-generator'); ?></th>
                        <td>
                            <label for="aig_auto_compress">
                                <input type="checkbox" name="aig_auto_compress" id="aig_auto_compress" value="1" <?php checked(get_option('aig_auto_compress'), 1); ?> />
                                <?php _e('Automatically compress generated images', 'ai-image-generator'); ?>
                            </label>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Compression Quality', 'ai-image-generator'); ?></th>
                        <td>
                            <input type="number" name="aig_compression_quality" value="<?php echo esc_attr(get_option('aig_compression_quality', 85)); ?>" min="1" max="100" />
                            <p class="description"><?php _e('Quality percentage (1-100)', 'ai-image-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Save to Media Library', 'ai-image-generator'); ?></th>
                        <td>
                            <label for="aig_save_to_library">
                                <input type="checkbox" name="aig_save_to_library" id="aig_save_to_library" value="1" <?php checked(get_option('aig_save_to_library'), 1); ?> />
                                <?php _e('Save all generated images to Media Library', 'ai-image-generator'); ?>
                            </label>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Rate Limiting', 'ai-image-generator'); ?></th>
                        <td>
                            <input type="number" name="aig_max_generations_per_hour" value="<?php echo esc_attr(get_option('aig_max_generations_per_hour', 50)); ?>" min="1" max="1000" />
                            <p class="description"><?php _e('Maximum images to generate per hour', 'ai-image-generator'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
            
            <hr>
            
            <h2><?php _e('Usage Statistics', 'ai-image-generator'); ?></h2>
            <?php $this->display_usage_stats(); ?>
        </div>
        <?php
    }
    
    private function display_usage_stats() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'aig_generated_images';
        
        if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
            echo '<p>' . __('No usage data available yet.', 'ai-image-generator') . '</p>';
            return;
        }
        
        $today = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE DATE(created_at) = CURDATE()");
        $this_month = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())");
        $total = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
        $total_cost = $wpdb->get_var("SELECT SUM(generation_cost) FROM $table_name");
        
        echo '<div class="aig-stats-grid">';
        echo '<div class="aig-stat-box">';
        echo '<h3>' . number_format($today) . '</h3>';
        echo '<p>' . __('Images Today', 'ai-image-generator') . '</p>';
        echo '</div>';
        
        echo '<div class="aig-stat-box">';
        echo '<h3>' . number_format($this_month) . '</h3>';
        echo '<p>' . __('Images This Month', 'ai-image-generator') . '</p>';
        echo '</div>';
        
        echo '<div class="aig-stat-box">';
        echo '<h3>' . number_format($total) . '</h3>';
        echo '<p>' . __('Total Images', 'ai-image-generator') . '</p>';
        echo '</div>';
        
        echo '<div class="aig-stat-box">';
        echo '<h3>$' . number_format($total_cost, 2) . '</h3>';
        echo '<p>' . __('Total Cost', 'ai-image-generator') . '</p>';
        echo '</div>';
        echo '</div>';
        
        echo '<style>';
        echo '.aig-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }';
        echo '.aig-stat-box { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 20px; text-align: center; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }';
        echo '.aig-stat-box h3 { font-size: 32px; font-weight: 600; margin: 0 0 8px 0; color: #0073aa; }';
        echo '.aig-stat-box p { margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }';
        echo '</style>';
    }
}