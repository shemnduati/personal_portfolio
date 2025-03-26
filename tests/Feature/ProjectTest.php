<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    /**
     * A basic feature test example.
     */

     use RefreshDatabase;

     protected $user;
     protected $token;




    protected function setUp(): void
    {
        parent::setUp();
        $this->user = \App\Models\User::factory()->create();
        $this->actingAs($this->user);
    }  
    
    public function test_can_get_all_projects()
    {
        Project::factory()->count(3)->create();

        $response = $this->getJson('/projects');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }


    public function test_can_create_project()
    {
        Storage::fake('public');

        $response = $this->postJson('/projects', [
            'title' => 'Test Project',
            'slug' => 'test-project',
            'short_description' => 'Short description',
            'full_description' => 'Full description content',
            'project_date' => '2023-01-01',
            'featured_image' => UploadedFile::fake()->image('project.jpg'),
            'is_featured' =>  true,
        ]);
    
        $response->assertStatus(201)
            ->assertJsonPath('data.title', 'Test Project');

       // Get the stored path from the response
         $storedPath = $response->json('data.featured_image_path');
         
        // Assert the file exists without duplicating the 'projects' directory
        Storage::disk('public')->assertExists($storedPath);
    }

    public function test_can_update_project()
    {
        Storage::fake('public');
        $project = Project::factory()->create();

        $updateData = [
            'title' => 'Updated Project',
            'short_description' => 'Updated short desc',
            'full_description' => 'Updated full description',
            'project_date' => '2023-01-02',
            'featured_image' => UploadedFile::fake()->image('updated.jpg'),
            'is_featured' => true,
        ];

        $response = $this->putJson('/projects/' . $project->id, $updateData);

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'Updated Project');
    }

    public function test_can_delete_project_with_images()
    {
        Storage::fake('public');

        // Create project with images using consistent relationship name
        $project = Project::factory()
            ->has(ProjectImage::factory()->count(2), 'projectImages') // Changed to match your relationship
            ->create([
                'featured_image_path' => 'projects/test-featured.jpg'
            ]);

        // Create fake files in storage
        Storage::disk('public')->put($project->featured_image_path, 'test-content');
        
        foreach ($project->projectImages as $image) {
            Storage::disk('public')->put($image->image_path, 'test-content');
        }

        $response = $this->deleteJson('/projects/' . $project->id);
        
        $response->assertStatus(200);
        
        // Verify files were deleted
        Storage::disk('public')->assertMissing($project->featured_image_path);
        foreach ($project->projectImages as $image) {
            Storage::disk('public')->assertMissing($image->image_path);
        }
    }
}
