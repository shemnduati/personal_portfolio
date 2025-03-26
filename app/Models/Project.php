<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'full_description',
        'featured_image_path',
        'project_table',
        'is_featured',
        'project_date'
    ];

    public function projectImages()
    {
        return $this->hasMany(ProjectImage::class);
    }
}
