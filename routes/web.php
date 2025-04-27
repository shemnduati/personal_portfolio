<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController as ApiProjectController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TechnologyController;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ServiceController;

Route::get('/', [HomeController::class, 'index'])->name('home');

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
     Route::get('/admin/projects', [ProjectController::class, 'index'])->name('admin.projects.index');
     Route::get('/admin/projects/create', [ProjectController::class, 'create'])->name('admin.projects.create');
     Route::post('/admin/projects/upload-image', [ProjectController::class, 'uploadImage'])->name('admin.projects.upload-image');
     Route::post('/admin/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
     Route::get('/admin/projects/{project}/edit', [ProjectController::class, 'edit'])->name('admin.projects.edit');
     Route::match(['put', 'post'], '/admin/projects/{project}', [ProjectController::class, 'update'])->name('admin.projects.update');
     Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');

     // Technologies web routes
     Route::get('/admin/technologies', [TechnologyController::class, 'index'])->name('technologies.index');
     Route::get('/admin/technologies/create', [TechnologyController::class, 'create'])->name('technologies.create');
     Route::post('/admin/technologies', [TechnologyController::class, 'store'])->name('technologies.store');
     Route::get('/admin/technologies/{technology}/edit', [TechnologyController::class, 'edit'])->name('technologies.edit');
     Route::post('/admin/technologies/{technology}', [TechnologyController::class, 'update'])->name('technologies.update');
     Route::delete('/admin/technologies/{technology}', [TechnologyController::class, 'destroy'])->name('technologies.destroy');

    // Settings routes
    Route::get('/admin/settings', [SettingsController::class, 'index'])->name('admin.settings.index');
    Route::post('/admin/settings', [SettingsController::class, 'update'])->name('admin.settings.update');
    Route::post('/admin/settings/upload-cv', [SettingsController::class, 'uploadCV'])->name('admin.settings.upload-cv');
    Route::get('/admin/settings/download-cv', [SettingsController::class, 'downloadCV'])->name('admin.settings.download-cv');

    // Contact submissions routes
    Route::get('/admin/messages', [ContactController::class, 'index'])->name('admin.messages.index');
    Route::post('/admin/messages/{submission}/mark-as-read', [ContactController::class, 'markAsRead'])->name('admin.messages.mark-as-read');
    Route::delete('/admin/messages/{submission}', [ContactController::class, 'destroy'])->name('admin.messages.destroy');

    // Partner routes
    Route::get('/admin/partners', [PartnerController::class, 'index'])->name('partners.index');
    Route::get('/admin/partners/create', [PartnerController::class, 'create'])->name('partners.create');
    Route::post('/admin/partners', [PartnerController::class, 'store'])->name('partners.store');
    Route::get('/admin/partners/{partner}/edit', [PartnerController::class, 'edit'])->name('partners.edit');
    Route::post('/admin/partners/{partner}', [PartnerController::class, 'update'])->name('partners.update');
    Route::delete('/admin/partners/{partner}', [PartnerController::class, 'destroy'])->name('partners.destroy');

    // Experience routes
    Route::get('/admin/experiences', [ExperienceController::class, 'index'])->name('experiences.index');
    Route::get('/admin/experiences/create', [ExperienceController::class, 'create'])->name('experiences.create');
    Route::post('/admin/experiences', [ExperienceController::class, 'store'])->name('experiences.store');
    Route::get('/admin/experiences/{experience}/edit', [ExperienceController::class, 'edit'])->name('experiences.edit');
    Route::post('/admin/experiences/{experience}', [ExperienceController::class, 'update'])->name('experiences.update');
    Route::delete('/admin/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy');

    // Education routes
    Route::get('/admin/education', [EducationController::class, 'index'])->name('education.index');
    Route::get('/admin/education/create', [EducationController::class, 'create'])->name('education.create');
    Route::post('/admin/education', [EducationController::class, 'store'])->name('education.store');
    Route::get('/admin/education/{education}/edit', [EducationController::class, 'edit'])->name('education.edit');
    Route::post('/admin/education/{education}', [EducationController::class, 'update'])->name('education.update');
    Route::delete('/admin/education/{education}', [EducationController::class, 'destroy'])->name('education.destroy');

    // Testimonial routes
    Route::get('/admin/testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
    Route::get('/admin/testimonials/create', [TestimonialController::class, 'create'])->name('testimonials.create');
    Route::post('/admin/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
    Route::get('/admin/testimonials/{testimonial}/edit', [TestimonialController::class, 'edit'])->name('testimonials.edit');
    Route::post('/admin/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('/admin/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');

    // Skill routes
    Route::get('/admin/skills', [SkillController::class, 'index'])->name('skills.index');
    Route::get('/admin/skills/create', [SkillController::class, 'create'])->name('skills.create');
    Route::post('/admin/skills', [SkillController::class, 'store'])->name('skills.store');
    Route::get('/admin/skills/{skill}/edit', [SkillController::class, 'edit'])->name('skills.edit');
    Route::post('/admin/skills/{skill}', [SkillController::class, 'update'])->name('skills.update');
    Route::delete('/admin/skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy');

    Route::resource('admin/services', ServiceController::class)->names('services');
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
Route::get('api/featured-projects', [ApiProjectController::class, 'getFeaturedProjects']);
Route::get('projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

// Public blog routes (if enabled)
Route::get('blogs', [BlogController::class, 'index']);
Route::get('blogs/create', [BlogController::class, 'create']);
Route::get('bloglist', [BlogController::class, 'bloglist'])->name('bloglist');
Route::get('blogDetails', [BlogController::class, 'blogDetails'])->name('blogDetails');
Route::get('blogs/{blog:slug}', [BlogController::class, 'show']);
Route::get('api/latest-blogs', [BlogController::class, 'getLatestBlogs'])->name('api.latest-blogs');

// Add this route outside the auth middleware group for public access
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// In your web.php
Route::get('/storage/{folder}/{filename}', function ($folder, $filename) {
    $path = storage_path('app/public/' . $folder . '/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path);
});
