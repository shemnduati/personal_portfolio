<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/partner/page/index', [
            'partners' => Partner::orderBy('order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/partner/page/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'website' => 'nullable|url|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $logo = $request->file('logo');
        $logoPath = $logo->store('partners', 'public');

        Partner::create([
            'name' => $request->name,
            'logo' => $logoPath,
            'website' => $request->website,
            'order' => $request->order ?? 0,
            'is_active' => $request->is_active ?? true
        ]);

        return redirect()->route('partners.index')->with('success', 'Partner created successfully.');
    }

    public function edit(Partner $partner)
    {
        return Inertia::render('Dashboard/partner/page/edit', [
            'partner' => $partner
        ]);
    }

    public function update(Request $request, Partner $partner)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'website' => 'nullable|url|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $data = $request->only(['name', 'website', 'order', 'is_active']);

        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($partner->logo) {
                Storage::disk('public')->delete($partner->logo);
            }
            
            $logo = $request->file('logo');
            $data['logo'] = $logo->store('partners', 'public');
        }

        $partner->update($data);

        return redirect()->route('partners.index')->with('success', 'Partner updated successfully.');
    }

    public function destroy(Partner $partner)
    {
        if ($partner->logo) {
            Storage::disk('public')->delete($partner->logo);
        }
        
        $partner->delete();

        return redirect()->route('partners.index')->with('success', 'Partner deleted successfully.');
    }
}
