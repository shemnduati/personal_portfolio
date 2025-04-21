<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/education/page/index', [
            'education' => Education::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/education/page/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'degree' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        Education::create($request->all());

        return redirect()->route('education.index')->with('success', 'Education created successfully.');
    }

    public function edit(Education $education)
    {
        return Inertia::render('Dashboard/education/page/edit', [
            'education' => $education
        ]);
    }

    public function update(Request $request, Education $education)
    {
        $request->validate([
            'degree' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $education->update($request->all());

        return redirect()->route('education.index')->with('success', 'Education updated successfully.');
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return redirect()->route('education.index')->with('success', 'Education deleted successfully.');
    }
}
