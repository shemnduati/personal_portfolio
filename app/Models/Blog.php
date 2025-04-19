<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'meta_title',
        'meta_description',
        'featured_image_path',
        'published_at',
        'is_published',
        'category_id',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected $appends = ['featured_image_url'];

    /**
     * Get the full URL for the featured image.
     *
     * @return string|null
     */
    public function getFeaturedImageUrlAttribute()
    {
        if (!$this->featured_image_path) {
            return null;
        }
        
        return Storage::url($this->featured_image_path);
    }

    /**
     * Get the category that owns the blog.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
