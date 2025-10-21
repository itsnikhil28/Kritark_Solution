<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Employee;
use App\Models\EmployeeAttendance;
use App\Models\SalaryAdvance;
use App\Models\SalaryGeneration;
use App\Models\EmployeeSalary;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SalaryGenerationController extends Controller
{
    public function index()
    {
        $salaryGenerations = SalaryGeneration::where('salary_month', '>=', now()->format('Y-m'))->latest()->get();
        return Inertia::render('admin/Salary/SalaryGenerationList', [
            'salaryGenerations' => $salaryGenerations
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'salary_month' => 'required|date_format:Y-m',
        ]);

        // prevent duplicate generation for same month
        if (SalaryGeneration::where('salary_month', $request->salary_month)->exists()) {
            return back()->withErrors(['salary_month' => 'Salary for this month already generated']);
        }

        // Create main salary generation entry
        $generation = SalaryGeneration::create([
            'salary_month' => $request->salary_month,
            'generate_date' => now(),
            'generate_by' => Auth::user()->name ?? 'Admin',
            'status' => 'Approved',
            'approved_date' => now(),
            'approved_by' => Auth::user()->name ?? 'Admin',
        ]);

        $advances = SalaryAdvance::where('salary_month', $request->salary_month)->get();

        if ($advances->isEmpty()) {
            $generation->delete();
            return back()->withErrors(['salary_month' => 'No salary advance records found for this month']);
        }

        foreach ($advances as $advance) {
            $employee = $advance->employee;

            // This is the total salary released for the month
            $releaseAmount = $advance->release_amount ?? 0;

            // Salary structure breakdown (based on release amount)
            $basic = $releaseAmount * 0.8; // 80% as base salary
            $transport = $releaseAmount * 0.05; // 5% transport allowance
            $totalBenefit = $basic + $transport;
            $grossSalary = $totalBenefit;

            // Deductions (if any)
            $stateTax = $releaseAmount * 0.00;
            $socialSecurity = $releaseAmount * 0.00;
            $employerContribution = $releaseAmount * 0.00;
            $loanDeduction = 0;
            $salaryAdvance = 0; // ✅ not a deduction anymore

            // Total deductions
            $totalDeductions = $stateTax + $socialSecurity + $loanDeduction + $salaryAdvance;

            // ✅ Net salary = Gross salary (since advance is not deducted)
            $netSalary = $grossSalary - $totalDeductions;

            EmployeeSalary::create([
                'salary_generation_id' => $generation->id,
                'employee_id' => $employee->id,
                'basic_salary' => round($basic, 2),
                'transport_allowance' => round($transport, 2),
                'total_benefit' => round($totalBenefit, 2),
                'gross_salary' => round($grossSalary, 2),
                'state_income_tax' => round($stateTax, 2),
                'social_security_npf' => round($socialSecurity, 2),
                'employer_contribution' => round($employerContribution, 2),
                'loan_deduction' => round($loanDeduction, 2),
                'salary_advance' => round($salaryAdvance, 2),
                'total_deductions' => round($totalDeductions, 2),
                'net_salary' => round($netSalary, 2),
            ]);
        }


        return back()->with('success', 'Salary generated successfully for ' . $request->salary_month);
    }

    public function show($id)
    {
        $generation = SalaryGeneration::with('employeeSalaries.employee')->findOrFail($id);

        $payrollSummary = [
            'gross' => $generation->employeeSalaries->sum('gross_salary'),
            'net' => $generation->employeeSalaries->sum('net_salary'),
            'loan' => $generation->employeeSalaries->sum('loan_deduction'),
            'salary_advance' => $generation->employeeSalaries->sum('salary_advance'),
            'state_tax' => $generation->employeeSalaries->sum('state_income_tax'),
            'npf' => $generation->employeeSalaries->sum('social_security_npf'),
            'employer_contribution' => $generation->employeeSalaries->sum('employer_contribution'),
            'iicf' => 0,
        ];

        return Inertia::render('admin/Salary/SalaryView', [
            'generation' => $generation,
            'payrollSummary' => $payrollSummary,
        ]);
    }


    public function approve($id)
    {
        $generation = SalaryGeneration::findOrFail($id);
        $generation->update([
            'status' => 'Approved',
            'approved_date' => now(),
            'approved_by' => Auth::user()->name ?? 'Admin',
        ]);

        return back()->with('success', 'Salary approved successfully');
    }

    public function employeeSalaryChart($id)
    {
        $generation = SalaryGeneration::with('employeeSalaries.employee')->findOrFail($id);

        return Inertia::render('admin/Salary/EmployeeSalaryChart', [
            'generation' => $generation,
        ]);
    }

    public function employeeSalaryList()
    {
        $salaries = EmployeeSalary::with(['employee', 'salaryGeneration'])
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'employee_name' => $item->employee->name ?? 'N/A',
                    'salary_month' => $item->salaryGeneration->salary_month ?? 'N/A',
                    'total_salary' => $item->net_salary ?? 0,
                ];
            });

        return inertia('admin/Salary/EmployeeSalaryList', [
            'salaries' => $salaries,
        ]);
    }

    public function showPayslip($salaryId)
    {
        $salary = EmployeeSalary::with(['employee', 'salaryGeneration'])
            ->findOrFail($salaryId);

        $employee = $salary->employee;
        $month = $salary->salaryGeneration->salary_month;

        $startDate = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
        $endDate = Carbon::createFromFormat('Y-m', $month)->endOfMonth();

        $totalWorkingHours = EmployeeAttendance::where('employee_id', $employee->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('total_hours');

        return inertia('employee/Payslip', [
            'salary' => $salary,
            'employee' => $employee,
            'month' => $month,
            'totalWorkingHours' => $totalWorkingHours,
        ]);
    }
}
