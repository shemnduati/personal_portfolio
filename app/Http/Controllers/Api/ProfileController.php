<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\CvUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ProfileController extends BaseController
{
    public function updateProfilePhoto(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();

        // Delete old photo if exists
        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        // Store new photo
        $path = $request->file('photo')->store('profile-photos', 'public');

        $user->profile_photo_path = $path;
        $user->save();

        return $this->sendResponse(['photo_url' => asset("storage/$path")], 'Profile photo updated successfully.');
    }

    public function uploadCv(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cv' => 'required|mimes:pdf|max:5120', // 5MB max
            'version' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

      // Deactivate all current CVs
        CvUpload::query()->update(['is_active' => false]);

        // Store new CV
        $path = $request->file('cv')->store('cv', 'public');

        $cvUpload = CvUpload::create([
            'file_path' => $path,
            'version' => $request->version,
            'is_active' => true,
            'uploaded_at' => now(),
        ]);

        return $this->sendResponse($cvUpload, 'CV uploaded successfully.');
    }

    public function downloadCv()
    {
         
        $cv = CvUpload::where('is_active', true)->latest()->firstOrFail();
       
        $path = storage_path('app/public/' . $cv->file_path);
        

       // Use Storage facade instead of direct path
        if (!Storage::disk('public')->exists($cv->file_path)) {
            abort(404, 'CV file not found');
        }


        return Storage::disk('public')->download(
            $cv->file_path,
            "{$cv->version}.pdf",
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="'.$cv->version.'.pdf"'
            ]
        );
    }

    public function getCvInfo()
    {
        $user = Auth::user();
        $cv = CvUpload::where('is_active', true)->latest()->first();

        if (!$cv) {
            return $this->sendError('No active CV found.');
        }

        return $this->sendResponse([
            'version' => $cv->version,
            'uploaded_at' => $cv->uploaded_at,
            'download_url' => url("/api/cv/download"),
        ], 'CV info retrieved successfully.');
    }
}
