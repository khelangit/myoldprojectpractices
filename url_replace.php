<?php
ini_set('memory_limit', '512M');

// Define input and output file paths
$input_file = 'wordpress.sql';
$output_file = 'wordpressupdate.sql';

// Define old and new links
$old_link = 'http://15.207.236.25/';
$new_link = 'https://www.cosmicairmatics.com/';

// Read the SQL file
$content = file_get_contents($input_file);

if ($content === false) {
    die("❌ Failed to read input file: $input_file");
}

// Replace old link with new link
$content_updated = str_replace($old_link, $new_link, $content);

// Save the updated SQL to a new file
$result = file_put_contents($output_file, $content_updated);

if ($result === false) {
    die("❌ Failed to write output file: $output_file");
}

echo "✅ Replacement complete. Updated file saved as: $output_file\n";

?>
