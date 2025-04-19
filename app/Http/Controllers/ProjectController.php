<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('technologies')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dashboard/project/page/index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        $technologies = Technology::orderBy('name')->get();
        
        return Inertia::render('Dashboard/project/page/create', [
            'technologies' => $technologies
        ]);
    }

    public function store(Request $request)
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
            'technologies.*' => 'exists:technologies,id'
        ]);

        $project = Project::create($validated);

        if (isset($validated['technologies'])) {
            $project->technologies()->sync($validated['technologies']);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $project->load('technologies');
        
        return Inertia::render('Dashboard/project/page/edit', [
            'project' => $project
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
            'technologies.*' => 'exists:technologies,id'
        ]);

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
        // Check if this is an AJAX request
        if (!$request->ajax()) {
            return redirect()->back()->with('error', 'Invalid request method');
        }

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('public/projects', $filename);
            
            return response()->json([
                'success' => true,
                'image_path' => Storage::url($path)
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No image uploaded'
        ], 400);
    }
} 