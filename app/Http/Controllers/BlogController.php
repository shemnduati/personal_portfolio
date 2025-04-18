<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::orderBy('published_at', 'desc')
                    ->get();

        // Return the data to the Inertia view
        return Inertia::render('Dashboard/blog/index', [
            'blogs' => [
                'data' => $blogs,
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => $blogs->count(),
                'total' => $blogs->count()
            ]
        ]);
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Dashboard/blog/edit', [
            'blog' => $blog
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'featured_image' => 'nullable|image|max:2048'
        ]);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($blog->featured_image_path) {
                Storage::delete($blog->featured_image_path);
            }
            
            // Store new image
            $path = $request->file('featured_image')->store('blog-images', 'public');
            $validated['featured_image_path'] = $path;
        }

        // Update published_at based on is_published
        if ($validated['is_published'] && !$blog->published_at) {
            $validated['published_at'] = now();
        } elseif (!$validated['is_published']) {
            $validated['published_at'] = null;
        }

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog post updated successfully.');
    }
} 