<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Insert default settings
        DB::table('settings')->insert([
            ['key' => 'github_url', 'value' => null],
            ['key' => 'linkedin_url', 'value' => null],
            ['key' => 'twitter_url', 'value' => null],
            ['key' => 'facebook_url', 'value' => null],
            ['key' => 'cv_path', 'value' => null],
            ['key' => 'cv_name', 'value' => null],
            ['key' => 'blog_title', 'value' => 'My Blog'],
            ['key' => 'blog_description', 'value' => 'Welcome to my blog where I share my thoughts and experiences.'],
            ['key' => 'posts_per_page', 'value' => '10'],
            ['key' => 'show_author', 'value' => 'true'],
            ['key' => 'show_date', 'value' => 'true'],
            ['key' => 'enable_comments', 'value' => 'true'],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('settings');
    }
}; 