<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with(['tags', 'category'])
                    ->orderBy('published_at', 'desc')
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


    public function create()
    {
        $categories = Category::orderBy('name')->get();
        return Inertia::render('Dashboard/blog/create', [
            'categories' => $categories
        ]);
    }


    public function bloglist(Request $request)
    {
        $query = Blog::where('is_published', true)
                   ->orderBy('published_at', 'desc');

        // Filter by category if provided
        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }
        
        // Filter by tag if provided
        if ($request->has('tag')) {
            $query->whereHas('tags', function($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        $blogs = $query->with(['category', 'tags'])->get();

        // Get categories with blog counts
        $categories = Category::withCount(['blogs' => function($query) {
                $query->where('is_published', true);
            }])
            ->orderBy('name')
            ->get();
            
        // Get popular tags with blog counts (top 15)
        $popularTags = Tag::withCount(['blogs' => function($query) {
                $query->where('is_published', true);
            }])
            ->having('blogs_count', '>', 0)
            ->orderBy('blogs_count', 'desc')
            ->take(15)
            ->get();

        return Inertia::render('blogPage', [
            'blogs' => $blogs,
            'categories' => $categories,
            'currentCategory' => $request->category,
            'currentTag' => $request->tag,
            'popularTags' => $popularTags
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

    public function edit(Blog $blog)
    {
        $categories = Category::orderBy('name')->get();
        
        // Load the tags relationship
        $blog->load('tags');
        
        return Inertia::render('Dashboard/blog/edit', [
            'blog' => $blog,
            'categories' => $categories
        ]);
    }


      /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'excerpt' => 'nullable|string',
                'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_published' => 'required|boolean',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'tags' => 'nullable|string', // Accept tags as a JSON string
            ]);

            // Create the blog post
            $blog = new Blog();
            $blog->title = $validated['title'];
            $blog->slug = Str::slug($validated['title']);
            $blog->content = $validated['content'];
            $blog->excerpt = $validated['excerpt'];
            $blog->meta_title = $validated['meta_title'];
            $blog->meta_description = $validated['meta_description'];
            $blog->category_id = $validated['category_id'];
            $blog->is_published = $validated['is_published'];
            
            if ($request->hasFile('featured_image')) {
                $path = $request->file('featured_image')->store('blog-images', 'public');
                $blog->featured_image_path = $path;
            }

            if ($blog->is_published) {
                $blog->published_at = now();
            }

            $blog->save();

            // Process tags
            if ($request->has('tags')) {
                try {
                    $tags = json_decode($request->tags, true);
                    if (is_array($tags)) {
                        foreach ($tags as $tagName) {
                            $tag = Tag::firstOrCreate(
                                ['name' => $tagName],
                                ['slug' => Str::slug($tagName)]
                            );
                            $blog->tags()->attach($tag->id);
                        }
                    }
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error('Error processing tags: ' . $e->getMessage());
                }
            }

            return redirect()->route('admin.blogs.index')
                ->with('success', 'Blog post created successfully.');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error creating blog post: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to create blog post. Please try again.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)
            ->with(['tags', 'category'])
            ->first();

        if (is_null($blog)) {
            return back()->with('error', 'Blog not found.');
        }

        // Get previous blog
        $previousBlog = Blog::where('is_published', true)
            ->where('published_at', '<', $blog->published_at)
            ->orderBy('published_at', 'desc')
            ->with(['tags', 'category'])
            ->first();

        // Get next blog
        $nextBlog = Blog::where('is_published', true)
            ->where('published_at', '>', $blog->published_at)
            ->orderBy('published_at', 'asc')
            ->with(['tags', 'category'])
            ->first();

        // Get recent blogs for the sidebar
        $recentBlogs = Blog::where('is_published', true)
                          ->where('id', '!=', $blog->id)
                          ->orderBy('published_at', 'desc')
                          ->with(['tags', 'category'])
                          ->take(3)
                          ->get();

        // Get categories for the sidebar
        $categories = \App\Models\Category::withCount(['blogs' => function($query) {
                $query->where('is_published', true);
            }])
            ->get();

        // Get popular tags (top 10 most used tags)
        $popularTags = Tag::withCount(['blogs' => function($query) {
                $query->where('is_published', true);
            }])
            ->having('blogs_count', '>', 0)
            ->orderBy('blogs_count', 'desc')
            ->take(10)
            ->get()
            ->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'slug' => $tag->slug,
                    'blogs_count' => $tag->blogs_count
                ];
            });

        return Inertia::render('blogDetails', [
            'blog' => $blog,
            'recentBlogs' => $recentBlogs,
            'categories' => $categories,
            'previousBlog' => $previousBlog,
            'nextBlog' => $nextBlog,
            'popularTags' => $popularTags
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $input = $request->all();
        
        // Debug log
        \Illuminate\Support\Facades\Log::info('Update request data:', $input);

        // Remove tags from validation to handle it separately
        $validationRules = [
            'title' => 'sometimes|required',
            'excerpt' => 'sometimes|required',
            'content' => 'sometimes|required',
            'featured_image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_published' => 'sometimes|boolean',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'category_id' => 'required|exists:categories,id',
        ];

        $validator = Validator::make($input, $validationRules);

        if($validator->fails()){
            \Illuminate\Support\Facades\Log::error('Validation errors:', $validator->errors()->toArray());
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
        $blog->meta_title = $input['meta_title'] ?? $blog->meta_title;
        $blog->meta_description = $input['meta_description'] ?? $blog->meta_description;
        $blog->category_id = $input['category_id'];
        
        if (isset($input['is_published'])) {
            $blog->is_published = $input['is_published'];
            $blog->published_at = $input['is_published'] ? now() : null;
        }

        $blog->save();

        // Handle tags separately
        try {
            if (isset($input['tags'])) {
                \Illuminate\Support\Facades\Log::info('Processing tags:', ['tags' => $input['tags']]);
                
                // Handle both string and array inputs
                $tagNames = is_string($input['tags']) ? json_decode($input['tags'], true) : $input['tags'];
                \Illuminate\Support\Facades\Log::info('Processed tags:', ['processed_tags' => $tagNames]);
                
                if (is_array($tagNames)) {
                    $tagIds = [];
                    foreach ($tagNames as $tagName) {
                        $tag = Tag::firstOrCreate(
                            ['name' => trim($tagName)],
                            ['slug' => Str::slug(trim($tagName))]
                        );
                        $tagIds[] = $tag->id;
                        \Illuminate\Support\Facades\Log::info('Created/Found tag:', ['tag_id' => $tag->id, 'tag_name' => $tag->name]);
                    }
                    $blog->tags()->sync($tagIds);
                    \Illuminate\Support\Facades\Log::info('Synced tags with blog:', ['blog_id' => $blog->id, 'tag_ids' => $tagIds]);
                }
            } else {
                $blog->tags()->detach();
                \Illuminate\Support\Facades\Log::info('Detached all tags from blog:', ['blog_id' => $blog->id]);
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error processing tags: ' . $e->getMessage());
            // Don't return an error, just log it and continue
        }

        return redirect()->route('admin.blogs.index')->with('flash', [
            'success' => 'Blog updated successfully'
        ]);
    }

    public function destroy(Blog $blog)
    {
        if ($blog->featured_image_path) {
            Storage::disk('public')->delete($blog->featured_image_path);
        }

        $blog->delete();

        // Redirect to the blog index page with a success message
        return redirect()->route('admin.blogs.index')->with('flash', [
            'success' => 'Blog deleted successfully'
        ]);
    }

    public function preview(Blog $blog)
    {
        $categories = Category::orderBy('name')->get();
        return Inertia::render('Dashboard/blog/preview', [
            'blog' => $blog,
            'categories' => $categories
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blog-images', 'public');
            return response()->json([
                'url' => Storage::url($path)
            ]);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }

    /**
     * Get the latest three published blogs.
     */
    public function getLatestBlogs()
    {
        $blogs = Blog::where('is_published', true)
                   ->orderBy('published_at', 'desc')
                   ->take(3)
                   ->with('category')
                   ->get();

        return response()->json($blogs);
    }
} 