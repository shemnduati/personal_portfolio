<?php

namespace Tests\Feature;

use App\Models\CvUpload;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    /**
     * A basic feature test example.
     */
   

     use RefreshDatabase;

     protected $user;
     protected $token;

     public function setUp(): void 
     {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
     }

     public function test_can_upload_profile_photo()
     {
        Storage::fake('public');

        $response = $this->actingAs($this->user)->postJson('/upload-profile-photo', [
            'photo' => UploadedFile::fake()->image('avatar.jpg', 200, 200)
        ]);

        $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'photo_url'
            ],
            'message'
        ])
        ->assertJson([
            'success' => true,
            'message' => 'Profile photo updated successfully.'
        ]);

       // Assert the file was stored
        $user =  $this->user->fresh();
        Storage::disk('public')->assertExists($this->user->profile_photo_path);
        
        // Verify the photo_url in response matches the stored path
        $expectedPath = 'profile-photos/' . basename($this->user->profile_photo_path);
        Storage::disk('public')->assertExists($expectedPath);
     }

     public function test_can_upload_cv()
     {
        Storage::fake('public');

        $response = $this->actingAs($this->user)->postJson('/upload-cv', [
            'cv' => UploadedFile::fake()->create('document.pdf', 1000),
            'version' => 'v1.0'
        ]);


        $response->assertStatus(200);
        Storage::disk('public')->assertExists('cv/' .$response->json('file_path'));
     }

     public function test_can_download_cv()
     {
        Storage::fake('public');

        // Create and store a fake CV
        $file = UploadedFile::fake()->create('cv.pdf', 1000);
        $path = $file->store('cv', 'public');
        
        // Create active CV record
        $cv = CvUpload::create([
            'file_path' => $path,
            'version' => 'v1.0',
            'is_active' => true,
            'uploaded_at' => now()
        ]);

        // 3. Verify the file was stored
        Storage::disk('public')->assertExists($path);

        // Hit the download endpoint
        $response = $this->get('/cv/download');

        // Assert response
        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'application/pdf')
            ->assertHeader(
                'Content-Disposition',
                'attachment; filename="v1.0.pdf"'
            );
     }


     public function test_returns_404_when_only_inactive_cv_exists()
    {
       // Create inactive CV
        CvUpload::create([
            'file_path' => 'cv/inactive.pdf',
            'version' => 'v1.0',
            'is_active' => false,
            'uploaded_at' => now()
        ]);

        $response = $this->get('/cv/download');
        $response->assertStatus(404);
    }

    public function test_returns_404_when_file_missing()
    {
        // Create CV record but don't actually store file
        CvUpload::create([
            'file_path' => 'cv/missing.pdf',
            'version' => 'v1.0',
            'is_active' => true,
            'uploaded_at' => now()
        ]);

        $response = $this->get('/cv/download');
        $response->assertStatus(404);
    }
}
