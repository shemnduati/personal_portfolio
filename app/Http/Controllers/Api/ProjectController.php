<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ProjectController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('projectImages')
                     ->orderBy('project_date', 'desc')
                     ->get();
        
        return $this->sendResponse($projects , 'Projects retrieved successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'short_description' => 'required',
            'full_description' => 'required',
            'project_date' => 'required',
            'featured_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        // Uploading featured image
        $imagePath = $request->file('featured_image')->store('projects','public');

        $project = Project::create([
            'title' => $input['title'],
            'slug' => Str::slug($input['title']),
            'short_description' => $input['short_description'],
            'full_description' => $input['full_description'],
            'project_date' => $input['project_date'],
            'featured_image_path' => $imagePath,
            'is_featured' => $input['is_featured'] ?? false,

        ]);

        return $this->sendResponse($project , 'Project created successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = Project::with('projectImages')->find($id);

        if(is_null($project)) {
            return $this->sendError('Project not found');
        }
        return $this->sendResponse($project, 'Project retrieved successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'sometimes|required|string|max:255',
            'short_description' => 'sometimes|required|string',
            'full_description' => 'sometimes|required|string',
            'project_date' => 'sometimes|required|date',
            'featured_image' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
            'is_featured' => 'sometimes|boolean'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if($request->hasfile('featured_image')) {
            // Delete old image
            Storage::disk('public')->delete($project->featured_image_path);
            // Upload new image
            $imagePath = $request->file('featured_image')->store('projects', 'public');
            $project->featured_image_path = $imagePath;
        }

        $project->title = $input['title'] ?? $project->title;
        $project->short_description = $input['short_description'] ?? $project->short_description;
        $project->full_description = $input['full_description'] ?? $project->full_description;
        $project->project_date = $input['project_date'] ?? $project->project_date;
        $project->is_featured = $input['is_featured'] ?? $project->is_featured;
        $project->save();

        return response()->json([
            'data' => $project->fresh()
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Check if images exist before looping
        if ($project->projectImages) {
            foreach($project->projectImages as $image) {
                if ($image->image_path) {
                    Storage::disk('public')->delete($image->image_path);
                }
                $image->delete();
            }
        }
    
        // Delete featured image if exists
        if ($project->featured_image_path) {
            Storage::disk('public')->delete($project->featured_image_path);
        }
    
        $project->delete();
    
        return $this->sendResponse([], 'Project deleted successfully.');
    }
    


    public function addImage(Request $request, Project $project)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'caption' => 'nullable|string',
        ]);

        if($validator->fails())
        {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $imagePath = $request->file('image')->store('project_images', 'public');

        $image = $project->images()->create([
            'image_path' => $imagePath,
            'caption' => $request->caption,
            'order' => $project->images()->count() + 1,
        ]);

        return $this->sendResponse($image, 'Image added successfully.');
    }
}
