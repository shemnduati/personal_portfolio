<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CvUpload extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_path',
        'version',
        'is_active',
        'uploaded_at'
    ];

    protected $casts =  [
        'is_active' => 'boolean'
    ];
}
