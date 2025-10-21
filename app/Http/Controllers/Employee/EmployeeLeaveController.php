<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\LeaveApplication;
use App\Models\LeaveType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeLeaveController extends Controller
{
    public function index()
    {
        $employeeId = session()->get('employee_id');

        $leaves = LeaveApplication::with('leaveType')
            ->where('employee_id', $employeeId)
            ->latest()
            ->get();

        $leaveTypes = LeaveType::select('id', 'name')->get();

        return Inertia::render('employee/LeaveApplications', [
            'leaves' => $leaves,
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'leave_type_id' => 'required|exists:leave_types,id',
            'leave_start_date' => 'required|date',
            'leave_end_date' => 'required|date|after_or_equal:leave_start_date',
            'reason' => 'nullable|string|max:500',
            'hard_copy' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $validated['employee_id'] = session()->get('employee_id');
        $validated['apply_date'] = now();
        $validated['requested_days'] = Carbon::parse($validated['leave_start_date'])
            ->diffInDays(Carbon::parse($validated['leave_end_date'])) + 1;

        if ($validated['hard_copy'] != null) {
            if (!file_exists(public_path('employee/hard_copy'))) {
                mkdir(public_path('employee/hard_copy'), 0755, true);
            }

            $profile_image = $request->file('hard_copy');

            $profileImageName = 'hard_copy-' . time() . '.' . $profile_image->getClientOriginalExtension();
            $profile_image->move(public_path('employee/hard_copy'), $profileImageName);

            $validated['hard_copy'] = $profileImageName;
        }

        LeaveApplication::create($validated);

        return back()->with('success', 'Leave application submitted successfully!');
    }

    public function update(Request $request, $id)
    {
        $leave = LeaveApplication::findOrFail($id);

        if ($leave->status === 'Approved') {
            return back()->with('error', 'Approved leaves cannot be modified.');
        }

        $validated = $request->validate([
            'leave_type_id' => 'required|exists:leave_types,id',
            'leave_start_date' => 'required|date',
            'leave_end_date' => 'required|date|after_or_equal:leave_start_date',
            'reason' => 'nullable|string|max:500',
            'hard_copy' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $validated['requested_days'] = Carbon::parse($validated['leave_start_date'])
            ->diffInDays(Carbon::parse($validated['leave_end_date'])) + 1;

        if ($validated['hard_copy'] != null) {
            $hardCopyPath = public_path('employee/hard_copy');

            if (!empty($employeeDetails->hard_copy)) {
                $oldFile = $hardCopyPath . '/' . $leave->hard_copy;
                if (file_exists($oldFile)) {
                    unlink($oldFile);
                }
            }

            $hardCopyFile = $request->file('hard_copy');
            $newFileName = 'hard_copy-' . time() . '.' . $hardCopyFile->getClientOriginalExtension();
            $hardCopyFile->move($hardCopyPath, $newFileName);

            $validated['hard_copy'] = $newFileName;
        }

        $leave->update($validated);

        return back()->with('success', 'Leave application updated successfully!');
    }

    public function destroy($id)
    {
        $leave = LeaveApplication::findOrFail($id);

        if ($leave->status === 'Approved') {
            return back()->with('error', 'Approved leaves cannot be deleted.');
        }

        if (!empty($leave->hard_copy)) {
            $hardCopyPath = public_path('employee/hard_copy');
            $oldFile = $hardCopyPath . '/' . $leave->hard_copy;
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
        }

        $leave->delete();

        return back()->with('success', 'Leave deleted successfully.');
    }
}
