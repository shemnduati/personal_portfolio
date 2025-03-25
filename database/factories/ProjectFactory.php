<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'slug' => $this->faker->unique->slug(),
            'short_description' => $this->faker->sentence(10),
            'full_description' => $this->faker->paragraph(3, true),
            'featured_image_path' => $this->faker->imageUrl(800, 600, 'technics'),
            'project_date' => $this->faker->dateTimeBetween('-1 year', '+1 year'),
            'github_link' => $this->faker->url,
            'live_link' => $this->faker->url,
            'project_type' => $this->faker->sentence(4),
            'tech_stack' => $this->faker->sentence(4),
            'is_featured' => $this->faker->boolean(30),
        ];
    }

    public function featured()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_featured' => true,
            ];
        });
    }
}
