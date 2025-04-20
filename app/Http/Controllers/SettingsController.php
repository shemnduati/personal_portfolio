<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = [
            'github_url' => Setting::getValue('github_url'),
            'linkedin_url' => Setting::getValue('linkedin_url'),
            'twitter_url' => Setting::getValue('twitter_url'),
            'facebook_url' => Setting::getValue('facebook_url'),
            'cv_path' => Setting::getValue('cv_path'),
            'cv_name' => Setting::getValue('cv_name'),
            'blog_title' => Setting::getValue('blog_title'),
            'blog_description' => Setting::getValue('blog_description'),
            'posts_per_page' => Setting::getValue('posts_per_page'),
            'show_author' => Setting::getValue('show_author'),
            'show_date' => Setting::getValue('show_date'),
            'enable_comments' => Setting::getValue('enable_comments'),
        ];

        return Inertia::render('Dashboard/settings/page/index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'github_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'blog_title' => 'nullable|string|max:255',
            'blog_description' => 'nullable|string',
            'posts_per_page' => 'nullable|integer|min:1|max:50',
            'show_author' => 'nullable|string|in:true,false',
            'show_date' => 'nullable|string|in:true,false',
            'enable_comments' => 'nullable|string|in:true,false',
        ]);

        foreach ($validated as $key => $value) {
            Setting::setValue($key, $value);
        }

        return redirect()->back()->with('success', 'Settings updated successfully');
    }

    public function uploadCV(Request $request)
    {
        $request->validate([
            'cv' => 'required|mimes:pdf,doc,docx|max:10240'
        ]);

        if ($request->hasFile('cv')) {
            // Delete old CV if exists
            $oldCVPath = Setting::getValue('cv_path');
            if ($oldCVPath && Storage::disk('public')->exists($oldCVPath)) {
                Storage::disk('public')->delete($oldCVPath);
            }

            $file = $request->file('cv');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('cv', $filename, 'public');

            // Make sure the file was stored successfully
            if (!Storage::disk('public')->exists($path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to store CV file'
                ], 500);
            }

            Setting::setValue('cv_path', $path);
            Setting::setValue('cv_name', $file->getClientOriginalName());

            return response()->json([
                'success' => true,
                'message' => 'CV uploaded successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No file uploaded'
        ], 400);
    }

    public function downloadCV()
    {
        $cvPath = Setting::getValue('cv_path');
        $cvName = Setting::getValue('cv_name');

        if (!$cvPath) {
            abort(404, 'CV path not found in settings');
        }

        if (!Storage::disk('public')->exists($cvPath)) {
            abort(404, 'CV file not found in storage');
        }

        $fullPath = Storage::disk('public')->path($cvPath);
        
        if (!file_exists($fullPath)) {
            abort(404, 'CV file not found on disk');
        }

        return response()->download($fullPath, $cvName, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $cvName . '"'
        ]);
    }
} 