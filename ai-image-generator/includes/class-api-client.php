<?php

/**
 * Comprehensive AI API Client
 * Supports multiple AI services: Text, Image, Audio, Video, and more
 */

class Comprehensive_AI_Client
{

    private $api_keys;
    private $base_urls;

    public function __construct()
    {
        $this->api_keys = array(
            'openai' => get_option('ai_openai_key'),
            'anthropic' => get_option('ai_anthropic_key'),
            'google' => get_option('ai_google_key'),
            'cohere' => get_option('ai_cohere_key'),
            'replicate' => get_option('ai_replicate_key'),
            'huggingface' => get_option('ai_huggingface_key'),
            'stability' => get_option('ai_stability_key'),
            'elevenlabs' => get_option('ai_elevenlabs_key'),
            'assemblyai' => get_option('ai_assemblyai_key'),
            'deepl' => get_option('ai_deepl_key'),
            'runway' => get_option('ai_runway_key'),
            'midjourney' => get_option('ai_midjourney_key')
        );

        $this->base_urls = array(
            'openai' => 'https://api.openai.com/v1',
            'anthropic' => 'https://api.anthropic.com/v1',
            'google' => 'https://generativelanguage.googleapis.com/v1',
            'cohere' => 'https://api.cohere.ai/v1',
            'replicate' => 'https://api.replicate.com/v1',
            'huggingface' => 'https://api-inference.huggingface.co',
            'stability' => 'https://api.stability.ai/v1',
            'elevenlabs' => 'https://api.elevenlabs.io/v1',
            'assemblyai' => 'https://api.assemblyai.com/v2',
            'deepl' => 'https://api-free.deepl.com/v2',
            'runway' => 'https://api.runwayml.com/v1'
        );
    }

    // ==========================================
    // TEXT GENERATION APIS
    // ==========================================

    public function generate_text($prompt, $provider = 'openai', $options = array())
    {
        switch ($provider) {
            case 'openai':
                return $this->openai_chat($prompt, $options);
            case 'anthropic':
                return $this->anthropic_chat($prompt, $options);
            case 'google':
                return $this->google_gemini($prompt, $options);
            case 'cohere':
                return $this->cohere_generate($prompt, $options);
            case 'huggingface':
                return $this->huggingface_text($prompt, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid text provider');
        }
    }

    private function openai_chat($prompt, $options = array())
    {
        $url = $this->base_urls['openai'] . '/chat/completions';

        $body = array(
            'model' => $options['model'] ?? 'gpt-4',
            'messages' => array(
                array('role' => 'user', 'content' => $prompt)
            ),
            'max_tokens' => $options['max_tokens'] ?? 1000,
            'temperature' => $options['temperature'] ?? 0.7
        );

        return $this->make_request('openai', $url, $body);
    }

    private function anthropic_chat($prompt, $options = array())
    {
        $url = $this->base_urls['anthropic'] . '/messages';

        $body = array(
            'model' => $options['model'] ?? 'claude-3-sonnet-20240229',
            'max_tokens' => $options['max_tokens'] ?? 1000,
            'messages' => array(
                array('role' => 'user', 'content' => $prompt)
            )
        );

        return $this->make_request('anthropic', $url, $body, array(
            'anthropic-version' => '2023-06-01'
        ));
    }

    private function google_gemini($prompt, $options = array())
    {
        $model = $options['model'] ?? 'gemini-pro';
        $url = $this->base_urls['google'] . "/models/{$model}:generateContent";

        $body = array(
            'contents' => array(
                array('parts' => array(array('text' => $prompt)))
            ),
            'generationConfig' => array(
                'temperature' => $options['temperature'] ?? 0.7,
                'maxOutputTokens' => $options['max_tokens'] ?? 1000
            )
        );

        return $this->make_request('google', $url, $body);
    }

    private function cohere_generate($prompt, $options = array())
    {
        $url = $this->base_urls['cohere'] . '/generate';

        $body = array(
            'model' => $options['model'] ?? 'command',
            'prompt' => $prompt,
            'max_tokens' => $options['max_tokens'] ?? 1000,
            'temperature' => $options['temperature'] ?? 0.7
        );

        return $this->make_request('cohere', $url, $body);
    }

    // ==========================================
    // IMAGE GENERATION APIS
    // ==========================================

    public function generate_image($prompt, $provider = 'openai', $options = array())
    {
        switch ($provider) {
            case 'openai':
                return $this->openai_dalle($prompt, $options);
            case 'stability':
                return $this->stability_diffusion($prompt, $options);
            case 'replicate':
                return $this->replicate_image($prompt, $options);
            case 'midjourney':
                return $this->midjourney_generate($prompt, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid image provider');
        }
    }

    private function openai_dalle($prompt, $options = array())
    {
        $url = $this->base_urls['openai'] . '/images/generations';

        $body = array(
            'model' => 'dall-e-3',
            'prompt' => $prompt,
            'n' => $options['n'] ?? 1,
            'size' => $options['size'] ?? '1024x1024',
            'quality' => $options['quality'] ?? 'standard'
        );

        return $this->make_request('openai', $url, $body);
    }

    private function stability_diffusion($prompt, $options = array())
    {
        $url = $this->base_urls['stability'] . '/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

        $body = array(
            'text_prompts' => array(
                array('text' => $prompt, 'weight' => 1)
            ),
            'cfg_scale' => $options['cfg_scale'] ?? 7,
            'steps' => $options['steps'] ?? 30,
            'samples' => $options['samples'] ?? 1
        );

        return $this->make_request('stability', $url, $body);
    }

    // ==========================================
    // AUDIO APIS
    // ==========================================

    public function generate_speech($text, $provider = 'openai', $options = array())
    {
        switch ($provider) {
            case 'openai':
                return $this->openai_tts($text, $options);
            case 'elevenlabs':
                return $this->elevenlabs_tts($text, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid speech provider');
        }
    }

    private function openai_tts($text, $options = array())
    {
        $url = $this->base_urls['openai'] . '/audio/speech';

        $body = array(
            'model' => 'tts-1',
            'input' => $text,
            'voice' => $options['voice'] ?? 'alloy',
            'response_format' => $options['format'] ?? 'mp3'
        );

        return $this->make_request('openai', $url, $body);
    }

    private function elevenlabs_tts($text, $options = array())
    {
        $voice_id = $options['voice_id'] ?? 'EXAVITQu4vr4xnSDxMaL'; // Default voice
        $url = $this->base_urls['elevenlabs'] . "/text-to-speech/{$voice_id}";

        $body = array(
            'text' => $text,
            'model_id' => $options['model'] ?? 'eleven_monolingual_v1',
            'voice_settings' => array(
                'stability' => $options['stability'] ?? 0.5,
                'similarity_boost' => $options['similarity_boost'] ?? 0.5
            )
        );

        return $this->make_request('elevenlabs', $url, $body);
    }

    public function transcribe_audio($audio_file, $provider = 'openai', $options = array())
    {
        switch ($provider) {
            case 'openai':
                return $this->openai_whisper($audio_file, $options);
            case 'assemblyai':
                return $this->assemblyai_transcribe($audio_file, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid transcription provider');
        }
    }

    private function openai_whisper($audio_file, $options = array())
    {
        $url = $this->base_urls['openai'] . '/audio/transcriptions';

        // This would need multipart form data handling
        $body = array(
            'file' => curl_file_create($audio_file),
            'model' => 'whisper-1',
            'language' => $options['language'] ?? 'en'
        );

        return $this->make_multipart_request('openai', $url, $body);
    }

    // ==========================================
    // TRANSLATION APIS
    // ==========================================

    public function translate_text($text, $target_lang, $provider = 'deepl', $options = array())
    {
        switch ($provider) {
            case 'deepl':
                return $this->deepl_translate($text, $target_lang, $options);
            case 'google':
                return $this->google_translate($text, $target_lang, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid translation provider');
        }
    }

    private function deepl_translate($text, $target_lang, $options = array())
    {
        $url = $this->base_urls['deepl'] . '/translate';

        $body = array(
            'text' => array($text),
            'target_lang' => strtoupper($target_lang),
            'source_lang' => $options['source_lang'] ?? 'auto'
        );

        return $this->make_request('deepl', $url, $body);
    }

    // ==========================================
    // VIDEO GENERATION APIS
    // ==========================================

    public function generate_video($prompt, $provider = 'runway', $options = array())
    {
        switch ($provider) {
            case 'runway':
                return $this->runway_video($prompt, $options);
            case 'replicate':
                return $this->replicate_video($prompt, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid video provider');
        }
    }

    private function runway_video($prompt, $options = array())
    {
        $url = $this->base_urls['runway'] . '/generate';

        $body = array(
            'prompt' => $prompt,
            'model' => $options['model'] ?? 'gen2',
            'duration' => $options['duration'] ?? 4,
            'resolution' => $options['resolution'] ?? '1280x768'
        );

        return $this->make_request('runway', $url, $body);
    }

    // ==========================================
    // EMBEDDINGS AND VECTOR APIS
    // ==========================================

    public function get_embeddings($text, $provider = 'openai', $options = array())
    {
        switch ($provider) {
            case 'openai':
                return $this->openai_embeddings($text, $options);
            case 'cohere':
                return $this->cohere_embeddings($text, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid embedding provider');
        }
    }

    private function openai_embeddings($text, $options = array())
    {
        $url = $this->base_urls['openai'] . '/embeddings';

        $body = array(
            'model' => $options['model'] ?? 'text-embedding-3-small',
            'input' => $text
        );

        return $this->make_request('openai', $url, $body);
    }

    // ==========================================
    // IMAGE ANALYSIS APIS
    // ==========================================

    public function analyze_image($image_url, $provider = 'openai', $options = array())
    {
        switch ($provider) {
            case 'openai':
                return $this->openai_vision($image_url, $options);
            case 'google':
                return $this->google_vision($image_url, $options);
            default:
                return new WP_Error('invalid_provider', 'Invalid vision provider');
        }
    }

    private function openai_vision($image_url, $options = array())
    {
        $url = $this->base_urls['openai'] . '/chat/completions';

        $body = array(
            'model' => 'gpt-4-vision-preview',
            'messages' => array(
                array(
                    'role' => 'user',
                    'content' => array(
                        array('type' => 'text', 'text' => $options['prompt'] ?? 'What is in this image?'),
                        array('type' => 'image_url', 'image_url' => array('url' => $image_url))
                    )
                )
            ),
            'max_tokens' => $options['max_tokens'] ?? 300
        );

        return $this->make_request('openai', $url, $body);
    }

    // ==========================================
    // HELPER METHODS
    // ==========================================

    private function make_request($provider, $url, $body, $extra_headers = array())
    {
        $headers = array_merge($this->get_headers($provider), $extra_headers);

        $response = wp_remote_post($url, array(
            'timeout' => 120,
            'headers' => $headers,
            'body' => wp_json_encode($body)
        ));

        return $this->process_response($response);
    }

    private function make_multipart_request($provider, $url, $body)
    {
        // For file uploads - would need custom implementation
        $headers = $this->get_headers($provider);
        unset($headers['Content-Type']); // Let cURL set it for multipart

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->format_headers($headers));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return array(
            'body' => $response,
            'response' => array('code' => $http_code)
        );
    }

    private function get_headers($provider)
    {
        $base_headers = array('Content-Type' => 'application/json');

        switch ($provider) {
            case 'openai':
                $base_headers['Authorization'] = 'Bearer ' . $this->api_keys['openai'];
                break;
            case 'anthropic':
                $base_headers['Authorization'] = 'Bearer ' . $this->api_keys['anthropic'];
                $base_headers['x-api-key'] = $this->api_keys['anthropic'];
                break;
            case 'google':
                $base_headers['Authorization'] = 'Bearer ' . $this->api_keys['google'];
                break;
            case 'cohere':
                $base_headers['Authorization'] = 'Bearer ' . $this->api_keys['cohere'];
                break;
            case 'replicate':
                $base_headers['Authorization'] = 'Token ' . $this->api_keys['replicate'];
                break;
            case 'stability':
                $base_headers['Authorization'] = 'Bearer ' . $this->api_keys['stability'];
                break;
            case 'elevenlabs':
                $base_headers['xi-api-key'] = $this->api_keys['elevenlabs'];
                break;
            case 'deepl':
                $base_headers['Authorization'] = 'DeepL-Auth-Key ' . $this->api_keys['deepl'];
                break;
        }

        return $base_headers;
    }

    private function format_headers($headers)
    {
        $formatted = array();
        foreach ($headers as $key => $value) {
            $formatted[] = $key . ': ' . $value;
        }
        return $formatted;
    }

    private function process_response($response)
    {
        if (is_wp_error($response)) {
            return $response;
        }

        $response_code = wp_remote_retrieve_response_code($response);
        $response_body = wp_remote_retrieve_body($response);

        if ($response_code >= 400) {
            $error_data = json_decode($response_body, true);
            return new WP_Error(
                'api_error',
                'API Error: ' . ($error_data['error']['message'] ?? $response_body),
                array('response_code' => $response_code)
            );
        }

        return json_decode($response_body, true);
    }

    // ==========================================
    // BATCH PROCESSING
    // ==========================================

    public function batch_process($requests, $options = array())
    {
        $results = array();
        $delay = $options['delay'] ?? 1; // seconds between requests

        foreach ($requests as $index => $request) {
            $method = $request['method'];
            $params = $request['params'];

            if (method_exists($this, $method)) {
                $result = call_user_func_array(array($this, $method), $params);
                $results[] = array(
                    'index' => $index,
                    'result' => $result,
                    'success' => !is_wp_error($result)
                );
            } else {
                $results[] = array(
                    'index' => $index,
                    'result' => new WP_Error('invalid_method', 'Method not found: ' . $method),
                    'success' => false
                );
            }

            if ($index < count($requests) - 1) {
                sleep($delay);
            }
        }

        return $results;
    }

    // ==========================================
    // UTILITY METHODS
    // ==========================================

    public function get_available_models($provider)
    {
        $models = array(
            'openai' => array('gpt-4', 'gpt-3.5-turbo', 'dall-e-3', 'whisper-1', 'text-embedding-3-small'),
            'anthropic' => array('claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'),
            'google' => array('gemini-pro', 'gemini-pro-vision'),
            'cohere' => array('command', 'command-light', 'embed-english-v3.0'),
            'stability' => array('stable-diffusion-xl-1024-v1-0', 'stable-diffusion-v1-6'),
            'replicate' => array('sdxl', 'llama-2-70b-chat', 'whisper')
        );

        return $models[$provider] ?? array();
    }

    public function test_api_connection($provider)
    {
        $test_methods = array(
            'openai' => array('generate_text', array('Hello, world!', 'openai', array('max_tokens' => 10))),
            'anthropic' => array('generate_text', array('Hello, world!', 'anthropic', array('max_tokens' => 10))),
            'google' => array('generate_text', array('Hello, world!', 'google', array('max_tokens' => 10)))
        );

        if (!isset($test_methods[$provider])) {
            return array('success' => false, 'message' => 'Unknown provider');
        }

        list($method, $params) = $test_methods[$provider];
        $result = call_user_func_array(array($this, $method), $params);

        return array(
            'success' => !is_wp_error($result),
            'message' => is_wp_error($result) ? $result->get_error_message() : 'Connection successful'
        );
    }
}
