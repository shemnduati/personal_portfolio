<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\CvUpload;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\User;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Shem Nduati',
            'email' => 'nduatishem@gmail.com',
            'profile_photo_path' => null,
            'password' => bcrypt('Mesh^25!'),
        ]);

        // Create projects with images
        Project::factory(5)
             ->has(ProjectImage::factory()->count(5))
             ->create();


        // Create some featured projects
        Project::factory(5)
            ->featured()
            ->has(ProjectImage::factory()->count(5))
            ->create();

        // Create blog posts
        Blog::factory(10)->published()->create();
        Blog::factory()->unpublished()->create();

        // Create Cv uploads
        CvUpload::factory(3)->create();
        CvUpload::factory()->active()->create();

        // Set blog enabled setting
        DB::table('settings')->updateOrInsert(
            ['key' => 'blog_enabled'],
            ['value' => '1']
        );

    }
}
