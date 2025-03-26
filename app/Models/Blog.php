<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image_path',
        'publised_at',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    
}
