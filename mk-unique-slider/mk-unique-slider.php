<?php

/**
 * Plugin Name: MK Unique Slider
 * Description: A custom slider plugin with unique design (single-file version).
 * Version: 1.0
 * Author: MK
 */

if (!defined('ABSPATH')) exit; // Prevent direct access

// Shortcode for slider
function mk_unique_slider_shortcode($atts)
{
    $slides = [
        ['title' => 'Slide 1', 'image' => 'https://via.placeholder.com/800x400?text=Slide+1'],
        ['title' => 'Slide 2', 'image' => 'https://via.placeholder.com/800x400?text=Slide+2'],
        ['title' => 'Slide 3', 'image' => 'https://via.placeholder.com/800x400?text=Slide+3'],
    ];

    // Inline CSS
    $css = '<style>
    .mk-slider{position:relative;width:80%;max-width:800px;margin:50px auto;overflow:hidden;border-radius:15px;box-shadow:0 10px 25px rgba(0,0,0,0.2);}
    .mk-slide{display:none;position:relative;}
    .mk-slide img{width:100%;display:block;border-radius:15px;}
    .mk-slide-title{position:absolute;bottom:20px;left:20px;color:#fff;font-size:24px;font-weight:bold;text-shadow:2px 2px 8px rgba(0,0,0,0.6);}
    .mk-prev,.mk-next{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.5);color:white;border:none;font-size:30px;padding:10px 15px;cursor:pointer;border-radius:50%;}
    .mk-prev{left:10px;}
    .mk-next{right:10px;}
    .mk-prev:hover,.mk-next:hover{background:rgba(0,0,0,0.8);}
    </style>';

    // Slider HTML
    $output = $css . '<div class="mk-slider">';
    foreach ($slides as $slide) {
        $output .= '<div class="mk-slide">';
        $output .= '<img src="' . $slide['image'] . '" alt="' . $slide['title'] . '">';
        $output .= '<div class="mk-slide-title">' . $slide['title'] . '</div>';
        $output .= '</div>';
    }
    $output .= '<button class="mk-prev">&#10094;</button>';
    $output .= '<button class="mk-next">&#10095;</button>';
    $output .= '</div>';

    // Inline JS
    $output .= '<script>
    jQuery(document).ready(function($){
        let index=0;
        const slides=$(".mk-slider .mk-slide");
        const total=slides.length;
        function showSlide(i){slides.hide();slides.eq(i).fadeIn();}
        showSlide(index);
        $(".mk-next").click(function(){index=(index+1)%total;showSlide(index);});
        $(".mk-prev").click(function(){index=(index-1+total)%total;showSlide(index);});
        setInterval(function(){index=(index+1)%total;showSlide(index);},5000);
    });
    </script>';

    return $output;
}
add_shortcode('mk_slider', 'mk_unique_slider_shortcode');
