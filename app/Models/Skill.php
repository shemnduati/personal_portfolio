<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'icon',
        'description',
        'proficiency',
        'order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'proficiency' => 'integer',
        'order' => 'integer'
    ];
} 