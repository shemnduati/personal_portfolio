<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SettingsController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

     // Projects routes
     Route::apiResource('projects', ProjectController::class);
     Route::post('projects/{project}/images', [ProjectController::class, 'addImage']);
 
     // Blog routes (if enabled)
     Route::apiResource('blogs', BlogController::class)->except(['index', 'show']);
     Route::get('admin/blogs', [BlogController::class, 'adminIndex']);
 
     // Profile routes
     Route::post('upload-profile-photo', [ProfileController::class, 'updateProfilePhoto']);
     Route::post('upload-cv', [ProfileController::class, 'uploadCv']);
     Route::get('cv/info', [ProfileController::class, 'getCvInfo']);
 
     // Settings routes
     Route::get('settings', [SettingsController::class, 'getSettings']);
     Route::post('settings/blog-enabled', [SettingsController::class, 'updateBlogStatus']);
});



// Public routes
Route::get('projects', [ProjectController::class, 'index']);
Route::get('projects/{project}', [ProjectController::class, 'show']);

// Public blog routes (if enabled)
Route::get('blogs', [BlogController::class, 'index']);
Route::get('blogs/{blog:slug}', [BlogController::class, 'show']);

// Public CV download
Route::get('cv/download', [ProfileController::class, 'downloadCv']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
