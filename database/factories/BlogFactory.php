<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'slug' => $this->faker->unique()->slug(),
            'excerpt' => $this->faker->sentence(10),
            'content' => $this->faker->paragraph(20),
            'featured_image_path' => $this->faker->optional()->imageUrl(800, 600, 'business'),
            'published_at' => $this->faker->optional(70)->dateTimeBetween('-1 year', 'now'),
            'is_published' => $this->faker->boolean(70),
        ];
    }

    public function published()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_published' => true,
                'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ];
        });
    }

    public function unpublished()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_published' => false,
                'published_at' => null,
            ];
        });
    }
}
