<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController as ApiProjectController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TechnologyController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

     // Projects API routes
     Route::apiResource('api/projects', ApiProjectController::class);
     Route::post('api/projects/{project}/images', [ApiProjectController::class, 'addImage']);
 
     // Profile routes
     Route::post('upload-profile-photo', [ProfileController::class, 'updateProfilePhoto']);
     Route::post('upload-cv', [ProfileController::class, 'uploadCv']);
     Route::get('cv/info', [ProfileController::class, 'getCvInfo']);
 
     // Settings routes
     Route::get('settings', [SettingsController::class, 'getSettings']);
     Route::post('settings/blog-enabled', [SettingsController::class, 'updateBlogStatus']);

     // Projects web routes
     Route::get('/admin/projects', [ProjectController::class, 'index'])->name('projects.index');
     Route::get('/admin/projects/create', [ProjectController::class, 'create'])->name('projects.create');
     Route::post('/admin/projects', [ProjectController::class, 'store'])->name('projects.store');
     Route::get('/admin/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
     Route::post('/admin/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
     Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
     Route::post('/admin/upload-image', [ProjectController::class, 'uploadImage'])->name('projects.upload-image');

     // Technologies web routes
     Route::get('/admin/technologies', [TechnologyController::class, 'index'])->name('technologies.index');
     Route::get('/admin/technologies/create', [TechnologyController::class, 'create'])->name('technologies.create');
     Route::post('/admin/technologies', [TechnologyController::class, 'store'])->name('technologies.store');
     Route::get('/admin/technologies/{technology}/edit', [TechnologyController::class, 'edit'])->name('technologies.edit');
     Route::post('/admin/technologies/{technology}', [TechnologyController::class, 'update'])->name('technologies.update');
     Route::delete('/admin/technologies/{technology}', [TechnologyController::class, 'destroy'])->name('technologies.destroy');
});

Route::middleware(['auth'])->group(function () {
    // Blog routes
    Route::get('/admin/blogs', [BlogController::class, 'index'])->name('admin.blogs.index');
    Route::get('/admin/blogs/create', [BlogController::class, 'create'])->name('admin.blogs.create');
    Route::post('/admin/blogs', [BlogController::class, 'store'])->name('admin.blogs.store');
    Route::get('/admin/blogs/{blog}/edit', [BlogController::class, 'edit'])->name('admin.blogs.edit');
    Route::post('/admin/blogs/{blog}', [BlogController::class, 'update'])->name('admin.blogs.update');
    Route::delete('/admin/blogs/{blog}', [BlogController::class, 'destroy'])->name('admin.blogs.destroy');
    Route::get('/admin/blogs/{blog}/preview', [BlogController::class, 'preview'])->name('blogs.preview');
    Route::post('/admin/upload-image', [BlogController::class, 'uploadImage'])->name('admin.blogs.upload-image');
    Route::resource('admin/categories', CategoryController::class)->names('admin.categories');
});

// Public routes
Route::get('projects', [ProjectController::class, 'index']);
Route::get('projects/{project}', [ProjectController::class, 'show']);

// Public blog routes (if enabled)
Route::get('blogs', [BlogController::class, 'index']);
Route::get('blogs/create', [BlogController::class, 'create']);
Route::get('bloglist', [BlogController::class, 'bloglist'])->name('bloglist');
Route::get('blogDetails', [BlogController::class, 'blogDetails'])->name('blogDetails');
Route::get('blogs/{blog:slug}', [BlogController::class, 'show']);
Route::get('api/latest-blogs', [BlogController::class, 'getLatestBlogs'])->name('api.latest-blogs');

// Public CV download
Route::get('cv/download', [ProfileController::class, 'downloadCv']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
