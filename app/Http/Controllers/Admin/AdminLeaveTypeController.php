<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLeaveTypeController extends Controller
{
    public function index()
    {
        $leaveTypes = LeaveType::orderBy('name')->get();
        return Inertia::render('admin/leaveType/leave', [
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:leave_types,name',
            'days' => 'required|integer|min:0',
            'description' => 'nullable|string|max:500',
        ]);

        LeaveType::create($request->all());

        return redirect()->back()->with('success', 'Leave Type created successfully!');
    }

    public function update(Request $request, $id)
    {
        $leaveType = LeaveType::findOrFail($id);

        $request->validate([
            'name' => "required|string|max:255|unique:leave_types,name,{$id}",
            'days' => 'required|integer|min:0',
            'description' => 'nullable|string|max:500',
        ]);

        $leaveType->update($request->all());

        return redirect()->back()->with('success', 'Leave Type updated successfully!');
    }

    public function destroy($id)
    {
        $leaveType = LeaveType::findOrFail($id);
        $leaveType->delete();

        return redirect()->back()->with('success', 'Leave Type deleted successfully!');
    }
}
