<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Technology;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['technologies', 'category'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dashboard/project/page/index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        $technologies = Technology::orderBy('name')->get();
        $categories = ProjectCategory::orderBy('name')->get();
        
        return Inertia::render('Dashboard/project/page/create', [
            'technologies' => $technologies,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'featured_image_path' => 'required|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'technologies' => 'array',
            'technologies.*' => 'exists:technologies,id',
            'category_id' => 'required|exists:project_categories,id'
        ]);

        // No need to move the image as it's already in the correct location
        $project = Project::create($validated);

        if (isset($validated['technologies'])) {
            $project->technologies()->sync($validated['technologies']);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $project->load(['technologies', 'category']);
        $technologies = Technology::orderBy('name')->get();
        $categories = ProjectCategory::orderBy('name')->get();
        
        return Inertia::render('Dashboard/project/page/edit', [
            'project' => $project,
            'technologies' => $technologies,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'featured_image_path' => 'nullable|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'technologies' => 'array',
            'technologies.*' => 'exists:technologies,id',
            'category_id' => 'required|exists:project_categories,id'
        ]);

        // Handle the featured image
        if (isset($validated['featured_image_path']) && $validated['featured_image_path'] !== $project->featured_image_path) {
            // Delete the old image if it exists
            if ($project->featured_image_path) {
                Storage::disk('public')->delete($project->featured_image_path);
            }
        }

        $project->update($validated);

        if (isset($validated['technologies'])) {
            $project->technologies()->sync($validated['technologies']);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }

    public function uploadImage(Request $request)
    {
        \Log::info('Upload image request received', [
            'is_ajax' => $request->ajax(),
            'has_file' => $request->hasFile('image'),
            'content_type' => $request->header('Content-Type'),
            'all_headers' => $request->headers->all()
        ]);

        // Check if this is an AJAX request
        if (!$request->ajax()) {
            \Log::error('Non-AJAX request received');
            return response()->json([
                'success' => false,
                'message' => 'Invalid request method'
            ], 400);
        }

        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                
                \Log::info('Processing image upload', [
                    'original_name' => $image->getClientOriginalName(),
                    'mime_type' => $image->getMimeType(),
                    'size' => $image->getSize()
                ]);

                $path = $image->storeAs('projects', $filename, 'public');
                
                \Log::info('Image uploaded successfully', ['path' => $path]);
                
                return response()->json([
                    'success' => true,
                    'image_path' => $path
                ]);
            }

            \Log::error('No image file found in request');
            return response()->json([
                'success' => false,
                'message' => 'No image uploaded'
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Error uploading image', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error uploading image: ' . $e->getMessage()
            ], 500);
        }
    }
} 