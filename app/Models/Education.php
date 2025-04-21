<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'degree',
        'institution',
        'location',
        'start_date',
        'end_date',
        'is_current',
        'description',
        'order',
        'is_active'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer'
    ];

    protected $table = 'education';
}
