<?php
/**
 * Plugin Name: Best Carousel Slider
 * Description: Lightweight, responsive, accessible carousel slider using Swiper.js. Use shortcode [best_carousel ids="1,2,3"] or [best_carousel count="5" orderby="date" ]. Compatible with Elementor.
 * Version: 1.1.0
 * Author: ChatGPT
 * Text Domain: best-carousel-slider
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Best_Carousel_Slider {
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_shortcode('best_carousel', array($this, 'render_shortcode'));
    }

    public function enqueue_assets() {
        // Swiper from CDN
        wp_enqueue_style('swiper-css', 'https://unpkg.com/swiper@9/swiper-bundle.min.css', array(), '9');

        // Plugin CSS
        wp_register_style('best-carousel-css', false);
        wp_enqueue_style('best-carousel-css');
        $custom_css = "
        .bcs-wrapper{max-width:1200px;margin:0 auto;padding:1rem}
        .bcs-swiper{border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.12)}
        .bcs-slide{position:relative;display:flex;align-items:flex-end;min-height:260px}
        .bcs-slide img{width:100%;height:100%;object-fit:cover;display:block}
        .bcs-caption{position:absolute;left:1rem;right:1rem;bottom:1rem;background:linear-gradient(180deg,rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);color:#fff;padding:12px;border-radius:10px}
        .bcs-caption h3{margin:0;font-size:1.1rem;line-height:1.2}
        .bcs-caption p{margin:0.25rem 0 0;font-size:0.9rem;opacity:0.95}
        .swiper-button-next, .swiper-button-prev{color:#fff}
        .swiper-pagination-bullet{opacity:0.8}
        @media (min-width:768px){.bcs-slide{min-height:360px}}
        ";
        wp_add_inline_style('best-carousel-css', $custom_css);

        // Swiper JS
        wp_enqueue_script('swiper-js', 'https://unpkg.com/swiper@9/swiper-bundle.min.js', array(), '9', true);

        // Custom init JS
        add_action('wp_footer', function(){ ?>
            <script type="text/javascript">
            (function($){
                function initBcsCarousel(scope){
                    var $swipers = scope.find('.bcs-swiper');
                    if(!$swipers.length || typeof Swiper === 'undefined') return;

                    $swipers.each(function(){
                        var el = this;
                        if(el.swiper) return; // already initialized
                        new Swiper(el, {
                            loop: true,
                            slidesPerView: 1,
                            spaceBetween: 16,
                            pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
                            navigation: { nextEl: el.querySelector('.swiper-button-next'), prevEl: el.querySelector('.swiper-button-prev') },
                            autoplay: { delay: 4000, disableOnInteraction: false },
                            breakpoints: {
                                768: { slidesPerView: 2, spaceBetween: 16 },
                                1024: { slidesPerView: 3, spaceBetween: 20 }
                            }
                        });
                    });
                }

                // Elementor editor support
                $(window).on('elementor/frontend/init', function(){
                    elementorFrontend.hooks.addAction('frontend/element_ready/widget', function(scope){
                        initBcsCarousel($(scope));
                    });
                });

                // Normal WP frontend fallback
                $(document).ready(function(){
                    initBcsCarousel($(document));
                });
            })(jQuery);
            </script>
        <?php });
    }

    public function render_shortcode($atts) {
        $atts = shortcode_atts(array(
            'ids' => '',
            'count' => 5,
            'orderby' => 'date',
            'show_caption' => 'true',
        ), $atts, 'best_carousel');

        $images = array();
        if (!empty($atts['ids'])) {
            $ids = array_map('absint', array_filter(array_map('trim', explode(',', $atts['ids']))));
            foreach ($ids as $id) {
                $url = wp_get_attachment_image_url($id, 'large');
                if ($url) {
                    $images[] = array(
                        'url' => esc_url($url),
                        'id' => $id,
                        'title' => get_the_title($id),
                        'caption' => get_post_field('post_excerpt', $id)
                    );
                }
            }
        }

        if (empty($images)) {
            $query = get_posts(array(
                'post_type' => 'attachment',
                'post_mime_type' => 'image',
                'numberposts' => absint($atts['count']),
                'orderby' => sanitize_text_field($atts['orderby']),
                'post_status' => 'inherit',
            ));
            foreach ($query as $attachment) {
                $url = wp_get_attachment_image_url($attachment->ID, 'large');
                if ($url) {
                    $images[] = array(
                        'url' => esc_url($url),
                        'id' => $attachment->ID,
                        'title' => $attachment->post_title,
                        'caption' => $attachment->post_excerpt
                    );
                }
            }
        }

        if (empty($images)) {
            return '<p>' . esc_html__('No images found for carousel.', 'best-carousel-slider') . '</p>';
        }

        ob_start(); ?>
        <div class="bcs-wrapper">
            <div class="swiper bcs-swiper" aria-label="Image carousel">
                <div class="swiper-wrapper">
                    <?php foreach ($images as $img): ?>
                        <div class="swiper-slide bcs-slide" role="group" aria-label="Slide">
                            <img src="<?php echo esc_url($img['url']); ?>" alt="<?php echo esc_attr($img['title'] ?: 'carousel image'); ?>" loading="lazy">
                            <?php if ($atts['show_caption'] === 'true' && !empty($img['title'])): ?>
                                <div class="bcs-caption">
                                    <h3><?php echo esc_html($img['title']); ?></h3>
                                    <?php if (!empty($img['caption'])): ?><p><?php echo esc_html($img['caption']); ?></p><?php endif; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>
                <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>
                <div class="swiper-pagination" role="navigation" aria-label="Carousel Pagination"></div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

new Best_Carousel_Slider();

?>
