<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LeaveApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class LeaveApprovalController extends Controller
{
    public function index()
    {
        $leaves = LeaveApplication::with(['employee', 'leaveType'])->latest()->get();

        return Inertia::render('admin/leaveType/LeaveApproval', [
            'leaves' => $leaves,
        ]);
    }

    public function approve(Request $request, $id)
    {
        $validated = $request->validate([
            'approved_start_date' => 'required|date',
            'approved_end_date' => 'required|date|after_or_equal:approved_start_date',
            'manager_comments' => 'required|string|max:500',
        ]);

        $leave = LeaveApplication::findOrFail($id);

        $days = Carbon::parse($validated['approved_start_date'])
            ->diffInDays(Carbon::parse($validated['approved_end_date'])) + 1;

        $leave->update([
            'approved_date' => now(),
            'approved_start_date' => $validated['approved_start_date'],
            'approved_end_date' => $validated['approved_end_date'],
            'approved_days' => $days,
            'status' => 'Approved',
            'manager_comments' => $validated['manager_comments'],
        ]);

        return back()->with('success', 'Leave approved successfully.');
    }

    public function reject(Request $request, $id)
    {
        $validated = $request->validate([
            'manager_comments' => 'required|string|max:500',
        ]);

        $leave = LeaveApplication::findOrFail($id);
        $leave->update([
            'manager_comments' => $validated['manager_comments'],
            'status' => 'Rejected',
        ]);

        return back()->with('error', 'Leave rejected successfully.');
    }
}
