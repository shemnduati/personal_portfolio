<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        ContactSubmission::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your message. We will get back to you soon!'
        ]);
    }

    public function index()
    {
        $messages = ContactSubmission::latest()
            ->paginate(10);

        return Inertia::render('Dashboard/contact/page/index', [
            'messages' => $messages
        ]);
    }

    public function markAsRead(ContactSubmission $submission)
    {
        $submission->update(['is_read' => true]);

        return response()->json([
            'success' => true
        ]);
    }

    public function destroy(ContactSubmission $submission)
    {
        $submission->delete();

        return redirect()->back()->with('success', 'Message deleted successfully');
    }
} 