<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\SalaryAdvance;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalaryAdvanceController extends Controller
{
    public function index()
    {
        $advances = SalaryAdvance::with('employee')->orderByDesc('id')->get();
        $employees = Employee::select('id', 'name')->get();

        return Inertia::render('admin/Salary/SalaryAdvance', [
            'advances' => $advances,
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'amount' => 'required|numeric|min:1',
            'salary_month' => 'required|date_format:Y-m',
        ]);

        $exists = SalaryAdvance::where('employee_id', $request->employee_id)
            ->where('salary_month', $request->salary_month)
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'employee_id' => 'An advance for this employee already exists for the selected month.',
            ])->withInput();
        }

        SalaryAdvance::create($request->all());

        return back()->with('success', 'Salary advance added successfully!');
    }


    public function update(Request $request, $id)
    {
        $advance = SalaryAdvance::findOrFail($id);

        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'amount' => 'required|numeric|min:1',
            'salary_month' => 'required|date_format:Y-m',
        ]);

        $exists = SalaryAdvance::where('employee_id', $request->employee_id)
            ->where('salary_month', $request->salary_month)
            ->where('id', '!=', $id)
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'employee_id' => 'Another advance record already exists for this employee and month.',
            ])->withInput();
        }

        $advance->update($request->all());

        return back()->with('success', 'Salary advance updated successfully!');
    }

    public function destroy($id)
    {
        SalaryAdvance::findOrFail($id)->delete();
        return back()->with('success', 'Salary advance deleted!');
    }
}

