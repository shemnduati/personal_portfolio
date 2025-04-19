<?php

namespace App\Http\Controllers;

use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TechnologyController extends Controller
{
    public function index()
    {
        $technologies = Technology::orderBy('name')->get();
        
        return Inertia::render('Dashboard/technology/page/index', [
            'technologies' => $technologies
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/technology/page/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:technologies,name',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        Technology::create($validated);

        return redirect()->route('technologies.index')
            ->with('success', 'Technology created successfully.');
    }

    public function edit(Technology $technology)
    {
        return Inertia::render('Dashboard/technology/page/edit', [
            'technology' => $technology
        ]);
    }

    public function update(Request $request, Technology $technology)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:technologies,name,' . $technology->id,
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        $technology->update($validated);

        return redirect()->route('technologies.index')
            ->with('success', 'Technology updated successfully.');
    }

    public function destroy(Technology $technology)
    {
        $technology->delete();

        return redirect()->route('technologies.index')
            ->with('success', 'Technology deleted successfully.');
    }
} 