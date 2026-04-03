jQuery(document).ready(function($) {
    // Handle generate buttons in post editor
    $(document).on('click', '.aiig-generate-image', function(e) {
        e.preventDefault();
        
        const target = $(this).data('target');
        const postId = $('#post_ID').val() || 0;
        
        // Create modal
        const modal = $(aiig_vars.modal_template);
        $('body').append(modal);
        
        // Handle form submission
        modal.find('form').on('submit', function(e) {
            e.preventDefault();
            
            const prompt = modal.find('#aiig-prompt').val();
            
            // Show loading
            modal.find('.aiig-generate-btn').prop('disabled', true).text('Generating...');
            
            // Generate image
            $.ajax({
                url: aiig_vars.ajax_url,
                type: 'POST',
                data: {
                    action: 'aiig_generate_image',
                    nonce: aiig_vars.nonce,
                    prompt: prompt,
                    target: target,
                    post_id: postId
                },
                success: function(response) {
                    if (response.success) {
                        // Display generated image
                        modal.find('.aiig-preview-container').html(
                            `<img src="${response.data.image_url}" alt="Generated Image" class="aiig-preview-image">`
                        );
                        
                        // Show save button
                        modal.find('.aiig-save-btn').show().data('image-data', response.data);
                    } else {
                        alert(response.data);
                    }
                },
                error: function() {
                    alert('Error generating image. Please try again.');
                },
                complete: function() {
                    modal.find('.aiig-generate-btn').prop('disabled', false).text('Generate Image');
                }
            });
        });
        
        // Handle save button
        modal.find('.aiig-save-btn').on('click', function() {
            const imageData = $(this).data('image-data');
            
            $.ajax({
                url: aiig_vars.ajax_url,
                type: 'POST',
                data: {
                    action: 'aiig_save_generated_image',
                    nonce: aiig_vars.nonce,
                    image_url: imageData.image_url,
                    target: imageData.target,
                    post_id: imageData.post_id,
                    prompt: modal.find('#aiig-prompt').val()
                },
                success: function(response) {
                    if (response.success) {
                        // Update UI based on target
                        if (imageData.target === 'featured') {
                            // Update featured image
                            $('#postimagediv .inside').find('.thumbnail').remove();
                            $('#postimagediv .inside').prepend(
                                `<div class="thumbnail">
                                    <img src="${response.data.image_url}" alt="">
                                </div>`
                            );
                            $('#postimagediv .inside').find('a.remove').show();
                        } else if (imageData.target === 'slider') {
                            // Update slider preview
                            $('.slider-preview').append(
                                `<div class="slide">
                                    <img src="${response.data.image_url}" alt="">
                                </div>`
                            );
                        } else if (imageData.target === 'media') {
                            // Refresh media library
                            if (wp.media && wp.media.frame) {
                                wp.media.frame.content.get('library').collection.props.set({ignore: (+ new Date())});
                                wp.media.frame.content.get('library').collection.more().done(function() {
                                    // Scroll to the new image
                                    var view = wp.media.frame.content.get();
                                    view.$el.scrollTop(view.$el.height());
                                });
                            }
                        }
                        
                        modal.remove();
                    } else {
                        alert(response.data);
                    }
                },
                error: function() {
                    alert('Error saving image. Please try again.');
                }
            });
        });
        
        // Close modal
        modal.find('.aiig-close-modal').on('click', function() {
            modal.remove();
        });
    });
    
    // Add button to media library
    if (typeof wp !== 'undefined' && wp.media && wp.media.view) {
        var MediaButton = wp.media.view.MediaFrame.Select;
        
        wp.media.view.MediaFrame.Select = MediaButton.extend({
            initialize: function() {
                MediaButton.prototype.initialize.apply(this, arguments);
                this.on('menu:render:default', this.addMenu, this);
            },
            
            addMenu: function(view) {
                view.set({
                    'aiig-generate': {
                        text: 'Generate AI Image',
                        priority: 100,
                        click: function() {
                            var modal = $(aiig_vars.modal_template);
                            $('body').append(modal);
                            
                            // Handle form submission
                            modal.find('form').on('submit', function(e) {
                                e.preventDefault();
                                
                                const prompt = modal.find('#aiig-prompt').val();
                                
                                modal.find('.aiig-generate-btn').prop('disabled', true).text('Generating...');
                                
                                $.ajax({
                                    url: aiig_vars.ajax_url,
                                    type: 'POST',
                                    data: {
                                        action: 'aiig_generate_image',
                                        nonce: aiig_vars.nonce,
                                        prompt: prompt,
                                        target: 'media',
                                        post_id: 0
                                    },
                                    success: function(response) {
                                        if (response.success) {
                                            modal.find('.aiig-preview-container').html(
                                                `<img src="${response.data.image_url}" alt="Generated Image" class="aiig-preview-image">`
                                            );
                                            modal.find('.aiig-save-btn').show().data('image-data', response.data);
                                        } else {
                                            alert(response.data);
                                        }
                                    },
                                    error: function() {
                                        alert('Error generating image. Please try again.');
                                    },
                                    complete: function() {
                                        modal.find('.aiig-generate-btn').prop('disabled', false).text('Generate Image');
                                    }
                                });
                            });
                            
                            // Handle save button
                            modal.find('.aiig-save-btn').on('click', function() {
                                const imageData = $(this).data('image-data');
                                
                                $.ajax({
                                    url: aiig_vars.ajax_url,
                                    type: 'POST',
                                    data: {
                                        action: 'aiig_save_generated_image',
                                        nonce: aiig_vars.nonce,
                                        image_url: imageData.image_url,
                                        target: 'media',
                                        post_id: 0,
                                        prompt: modal.find('#aiig-prompt').val()
                                    },
                                    success: function(response) {
                                        if (response.success) {
                                            // Refresh media library
                                            if (wp.media && wp.media.frame) {
                                                wp.media.frame.content.get('library').collection.props.set({ignore: (+ new Date())});
                                                wp.media.frame.content.get('library').collection.more().done(function() {
                                                    // Scroll to the new image
                                                    var view = wp.media.frame.content.get();
                                                    view.$el.scrollTop(view.$el.height());
                                                });
                                            }
                                            modal.remove();
                                        } else {
                                            alert(response.data);
                                        }
                                    },
                                    error: function() {
                                        alert('Error saving image. Please try again.');
                                    }
                                });
                            });
                            
                            // Close modal
                            modal.find('.aiig-close-modal').on('click', function() {
                                modal.remove();
                            });
                        }
                    }
                });
            }
        });
    }
});