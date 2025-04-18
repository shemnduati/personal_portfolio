<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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


    public function create()
    {
        return Inertia::render('Dashboard/blog/create');
    }


    public function bloglist()
    {
        $blogs = Blog::where('is_published', true)
                   ->orderBy('published_at', 'desc')
                   ->get();

        return Inertia::render('blogPage', [
            'projects' => $blogs
        ]);
    } 

    public function blogDetails()
    {
        $blog = Blog::where('is_published', true)
                ->orderBy('published_at', 'desc')
                ->first();

        return Inertia::render('blogDetails', ['blog' => $blog]);
    }

    public function adminIndex()
    {
        $blogs = Blog::orderBy('created_at','desc')->paginate(10);
        return Inertia::render('Dashboard/blog/index', [
            'blogs' => $blogs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input,[
            'title' => 'required',
            'excerpt' => 'required',
            'content' => 'required',
            'featured_image' => 'sometimes|image|mimes:jpeg,jpg,png,gif|max:2048',
            'is_published' => 'boolean',
        ]);


        if($validator->fails())
        {
            return back()->withErrors($validator->errors());
        }

        $imagePath = null;
        if($request->hasFile('featured_image'))
        {
            $imagePath =  $request->file('featured_image')->store('blogs', 'public');
        }

        // Generate a unique slug
        $baseSlug = Str::slug($input['title']);
        $slug = $baseSlug;
        $counter = 1;
        
        // Check if slug exists and append a number if it does
        while (Blog::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $blog = Blog::create([
            'title' => $input['title'],
            'slug' => $slug,
            'excerpt' => $input['excerpt'],
            'content' => $input['content'],
            'featured_image_path' => $imagePath,
            'is_published' => $input['is_published'] ?? false,
            'published_at' => $input['is_published']  ? now() : null,
        ]);

        // Get the blogs for the index page
        $blogs = Blog::where('is_published', true)
                   ->orderBy('published_at', 'desc')
                   ->get();

        // Return an Inertia response with the blogs data and a success message
        return Inertia::render('Dashboard/blog/index', [
            'blogs' => $blogs,
            'flash' => [
                'success' => 'Blog created successfully'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {$blog = Blog::where('slug', $slug)->first();

        if (is_null($blog)) {
            return back()->with('error', 'Blog not found.');
        }

        return Inertia::render('Dashboard/blog/show', [
            'blog' => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'sometimes|required',
            'excerpt' => 'sometimes|required',
            'content' => 'sometimes|required',
            'featured_image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_published' => 'sometimes|boolean',
        ]);

        if($validator->fails()){
            return back()->withErrors($validator->errors());
        }

        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($blog->featured_image_path) {
                Storage::disk('public')->delete($blog->featured_image_path);
            }
            
            // Upload new image
            $imagePath = $request->file('featured_image')->store('blogs', 'public');
            $blog->featured_image_path = $imagePath;
        }

        $blog->title = $input['title'] ?? $blog->title;
        $blog->slug = Str::slug($input['title'] ?? $blog->title);
        $blog->excerpt = $input['excerpt'] ?? $blog->excerpt;
        $blog->content = $input['content'] ?? $blog->content;
        
        if (isset($input['is_published'])) {
            $blog->is_published = $input['is_published'];
            $blog->published_at = $input['is_published'] ? now() : null;
        }

        $blog->save();

        // Get the blogs for the index page
        $blogs = Blog::where('is_published', true)
                   ->orderBy('published_at', 'desc')
                   ->get();

        // Return an Inertia response with the blogs data and a success message
        return Inertia::render('Dashboard/blog/index', [
            'blogs' => $blogs,
            'flash' => [
                'success' => 'Blog updated successfully'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if ($blog->featured_image_path) {
            Storage::disk('public')->delete($blog->featured_image_path);
        }

        $blog->delete();

        // Get the blogs for the index page
        $blogs = Blog::where('is_published', true)
                   ->orderBy('published_at', 'desc')
                   ->get();

        // Return an Inertia response with the blogs data and a success message
        return Inertia::render('Dashboard/blog/index', [
            'blogs' => $blogs,
            'flash' => [
                'success' => 'Blog deleted successfully'
            ]
        ]);
    }
}
