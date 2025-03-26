<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SettingsController extends BaseController
{
    public function getSettings()
    {
        $settings = DB::table('settings')
                    ->pluck('value', 'key')
                    ->toArray();

        return $this->sendResponse($settings, 'Settings retrieved successfully.');
    }

    public function updateBlogStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'enabled' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        DB::table('settings')
            ->updateOrInsert(
                ['key' => 'blog_enabled'],
                ['value' => $request->enabled ? '1' : '0']
            );

        return $this->sendResponse([], 'Blog status updated successfully.');
    }
}
