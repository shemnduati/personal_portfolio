<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $settings = [
            'github_url' => Setting::getValue('github_url'),
            'linkedin_url' => Setting::getValue('linkedin_url'),
            'twitter_url' => Setting::getValue('twitter_url'),
            'facebook_url' => Setting::getValue('facebook_url'),
            'cv_path' => Setting::getValue('cv_path'),
            'cv_name' => Setting::getValue('cv_name'),
            'blog_title' => Setting::getValue('blog_title'),
            'blog_description' => Setting::getValue('blog_description'),
            'posts_per_page' => Setting::getValue('posts_per_page'),
            'show_author' => Setting::getValue('show_author'),
            'show_date' => Setting::getValue('show_date'),
            'enable_comments' => Setting::getValue('enable_comments'),
        ];

        return Inertia::render('home', [
            'settings' => $settings
        ]);
    }
} 