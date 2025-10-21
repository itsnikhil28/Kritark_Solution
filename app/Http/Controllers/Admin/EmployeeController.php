<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:employees',
            'phone' => 'required|string|max:255|unique:employees',
            'password' => 'required|string|min:8',
            'employee_code' => 'required|string|max:255|unique:employees',
            'department' => 'required|string|max:255',
            'employment_type' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        $employee = Employee::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'employee_code' => $request->employee_code,
            'password' => Hash::make($request->password),
            'department' => $request->department,
            'employment_type' => $request->employment_type,
            'status' => $request->status,
            'joining_date' => now(),
        ]);

        return redirect()->route('admin.employees');    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::with('employeeDetails')->findOrFail($id);
        return Inertia::render('admin/employees/ViewEmployee', ['employee' => $employee]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Employee::destroy($id);
        return redirect()->route('admin.employees');
    }
}
