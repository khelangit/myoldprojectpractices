/**
 * Media Tab JavaScript for AI Image Generator
 */

(function($) {
    'use strict';
    
    $(document).ready(function() {
        // Media tab functionality already included in media-handler.php
        // This file can contain additional media-specific JavaScript
        
        // Handle image preview clicks
        $(document).on('click', '.aig-result-image img', function() {
            const src = $(this).attr('src');
            const modal = `
                <div class="aig-image-modal" style="
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.8); z-index: 999999; 
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                ">
                    <img src="${src}" style="max-width: 90%; max-height: 90%; border-radius: 8px;" />
                </div>
            `;
            
            $('body').append(modal);
            
            $('.aig-image-modal').on('click', function() {
                $(this).fadeOut(300, function() {
                    $(this).remove();
                });
            });
        });
    });
    
})(jQuery);