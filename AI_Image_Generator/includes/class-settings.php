<?php
if (!defined('ABSPATH')) {
    exit;
}

// Check if class exists before declaring
if (!class_exists('AIIG_Settings')) {
    class AIIG_Settings {
        public function __construct() {
            // Settings are handled in the main plugin file
        }
    }
}