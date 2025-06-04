<?php

if (!function_exists('full_url')) {
    function full_url($path = '')
    {
        $base = rtrim(config('app.url'), '/');
        $path = ltrim($path, '/'); 
        return $base . '/' . $path;
    }
}
