<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Technology extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($technology) {
            if (!$technology->slug) {
                $technology->slug = Str::slug($technology->name);
            }
        });

        static::updating(function ($technology) {
            if ($technology->isDirty('name') && !$technology->isDirty('slug')) {
                $technology->slug = Str::slug($technology->name);
            }
        });
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
} 