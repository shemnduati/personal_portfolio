<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BlogTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    protected $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_can_get_published_blogs()
    {
        Blog::factory()->published()->count(3)->create();
        Blog::factory()->unpublished()->count(2)->create();

        $response = $this->getJson('/blogs');

        $response->assertStatus(200)
           ->assertJsonCount(3, 'data');
    }

    public function test_can_create_blog()
    {
        $response = $this->actingAs($this->user)->postJson('/blogs', [
            'title' => 'Test Blog',
            'excerpt' => 'Short excerpt',
            'content' => 'Blog content here',
            'is_published' => true
        ]);
        
        $response->assertStatus(201)
            ->assertJsonPath('data.title', 'Test Blog')
            ->assertJsonPath('data.is_published', true);
    }

    public function test_can_get_blog_by_slug()
    {
        $blog = Blog::factory()->published()->create();

        $response = $this->getJson('/blogs/' . $blog->slug);

        $response->assertStatus(200)
            ->assertJsonPath('data.slug', $blog->slug);
    }
}
