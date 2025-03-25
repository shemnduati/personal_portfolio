<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CvUpload>
 */
class CvUploadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'file_path' => 'cv/' .$this->faker->uuid() . '.pdf',
            'version' => 'v' . $this->faker->numberBetween(1, 5) . '.' .$this->faker->numberBetween(0,9),
            'is_active' => $this->faker->boolean(80),
        ];
    }

    // State for active Cv
    public function active()
    {
        return $this->state(function (array $attributes){
            return ['is_active' => true];
        });
    }

      // State for active Cv
      public function inactive()
      {
          return $this->state(function (array $attributes){
              return ['is_active' => false];
          });
      }
}
