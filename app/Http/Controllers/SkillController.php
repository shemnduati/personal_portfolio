<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/skill/page/index', [
            'skills' => Skill::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/skill/page/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'proficiency' => 'required|integer|min:0|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $data = $request->except(['icon']);

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('skills/icons', 'public');
        }

        Skill::create($data);

        return redirect()->route('skills.index')->with('success', 'Skill created successfully.');
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('Dashboard/skill/page/edit', [
            'skill' => $skill
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'proficiency' => 'required|integer|min:0|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $data = $request->except(['icon']);

        if ($request->hasFile('icon')) {
            if ($skill->icon) {
                Storage::disk('public')->delete($skill->icon);
            }
            $data['icon'] = $request->file('icon')->store('skills/icons', 'public');
        }

        $skill->update($data);

        return redirect()->route('skills.index')->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        if ($skill->icon) {
            Storage::disk('public')->delete($skill->icon);
        }

        $skill->delete();

        return redirect()->route('skills.index')->with('success', 'Skill deleted successfully.');
    }
} 