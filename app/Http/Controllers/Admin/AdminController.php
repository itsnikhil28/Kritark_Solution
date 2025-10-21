<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Employee;
use App\Models\EmployeeAttendance;
use App\Models\EmployeeSalary;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $avgProductivity = Task::average('progress_percentage');
        $totalTasks = Task::count();
        $totalEmployees = Employee::count();
        $monthlySalary = EmployeeSalary::whereMonth('created_at', now()->month)->sum('net_salary');

        $completedTasks = Task::where('status', 'Completed')->count();
        $pendingTasks = Task::where('status', "!=", 'Completed')->count();

        $clientDomainData = $this->clientDomainData();

        $revenueData = $this->salaryExpenditure();

        $employeeUtilization = $this->employeeUtilization();

        $milestones = $this->milestones();

        return Inertia::render('admin/dashboard', [
            'avgProductivity' => round($avgProductivity, 2),
            'totalTasks' => $totalTasks,
            'totalEmployees' => $totalEmployees,
            'monthlySalary' => round($monthlySalary, 2),
            'completedTasks' => $completedTasks,
            'pendingTasks' => $pendingTasks,
            'clientDomainData' => $clientDomainData,
            'revenueData' => $revenueData,
            'employeeUtilization' => $employeeUtilization,
            'milestones' => $milestones,
        ]);
    }

    protected function salaryExpenditure()
    {
        $months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        $year = now()->year;

        $data = [];

        foreach ($months as $index => $monthName) {
            $monthNumber = str_pad($index + 1, 2, '0', STR_PAD_LEFT);
            $monthKey = "$year-$monthNumber";

            $totalSalary = EmployeeSalary::whereHas('salaryGeneration', function ($q) use ($monthKey) {
                $q->where('salary_month', $monthKey)
                    ->where('status', 'Approved');
            })->sum('net_salary');

            $data[] = [
                'month' => $monthName,
                'Salary' => $totalSalary ?: 0,
            ];
        }

        return $data;
    }

    protected function clientDomainData()
    {
        $employeeCounts = Employee::select('department', DB::raw('count(*) as total'))
            ->groupBy('department')
            ->get();

        $clientDomainData = [];
        $knownDepartments = Department::pluck('name')->toArray();

        foreach ($employeeCounts as $ec) {
            if (in_array($ec->department, $knownDepartments)) {
                $clientDomainData[] = [
                    'domain' => $ec->department,
                    'employees' => $ec->total,
                ];
            }
        }

        $otherCount = Employee::whereNull('department')
            ->orWhereNotIn('department', $knownDepartments)
            ->count();

        if ($otherCount > 0) {
            $clientDomainData[] = [
                'domain' => 'Other',
                'clients' => $otherCount,
            ];
        }

        return $clientDomainData;
    }

    protected function employeeUtilization()
    {
        $departments = Employee::distinct()->pluck('department')->toArray();

        $employeeUtilization = [];

        foreach ($departments as $dept) {
            $avg = Task::whereHas('employee', function ($q) use ($dept) {
                $q->where('department', $dept);
            })->avg('progress_percentage');

            $employeeUtilization[] = [
                'name' => $dept ?? 'Other', // default 'Other' if department is null
                'rate' => round($avg ?? 0, 2),
            ];
        }

        return $employeeUtilization;
    }

    protected function milestones()
    {
        $tasks = Task::with('employee')
            ->orderByDesc('created_at') // latest tasks
            ->take(4)
            ->get(['title', 'description', 'deadline', 'progress_percentage', 'employee_id']);

        $milestones = $tasks->map(fn($task) => [
            'project' => $task->employee->name ?? 'N/A', // Employee name as project header
            'task' => $task->title,
            'deadline' => $task->deadline ? Carbon::parse($task->deadline)->format('Y-m-d') : '-',
            'progress' => $task->progress_percentage,
        ]);

        return $milestones;
    }

    public function departments()
    {
        $departments = Department::all();
        return Inertia::render('admin/department', ['departments' => $departments]);
    }

    public function department_store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:departments',
        ]);

        $department = Department::create([
            'name' => $request->name,
            'status' => $request->status,
            'code' => $request->code,
        ]);

        return redirect()->route('admin.departments');
    }

    public function department_update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:departments,code,' . $request->id,
        ]);

        $department = Department::findOrFail($id);
        $department->update([
            'name' => $request->name,
            'status' => $request->status,
            'code' => $request->code,
        ]);

        return redirect()->route('admin.departments');
    }

    public function department_destroy(string $id)
    {
        Department::destroy($id);
        return redirect()->route('admin.departments');
    }

    public function employees()
    {
        $employees = Employee::with('tasks')->get();
        $departments = Department::where('status', 'Active')->get();
        $avgProductivity = Task::average('progress_percentage');
        $totalHours = Task::sum('time_spent_minutes') / 60;
        $activeProjects = Task::where('status', "!=", 'Completed')->count();
        $completionRate = Task::where('status', 'Completed')->count() / Task::count();
        return Inertia::render(
            'admin/employees/employees',
            [
                'employees' => $employees,
                'departments' => $departments,
                'avgProductivity' => round($avgProductivity, 2),
                'totalHours' => number_format($totalHours, 2),
                'activeProjects' => $activeProjects,
                'completionRate' => number_format($completionRate, 2),
            ]
        );
    }

    public function attendance()
    {
        $employees = Employee::with(['attendances' => function ($query) {
            $query->whereMonth('date', now()->month);
        }])->get();

        $attendanceSummary = $employees->map(function ($employee) {
            $records = $employee->attendances;

            $totalDays = $records->count();
            $lateDays = $records->where('is_late', true)->count();
            $officeDays = $records->where('location_type', 'Office')->count();
            $homeDays = $records->where('location_type', 'Home')->count();
            $outsideDays = $records->where('location_type', 'Outside')->count();

            $avgHours = $records->avg('total_hours') ? round($records->avg('total_hours'), 2) : 0;

            return [
                'employee_id' => $employee->id,
                'name' => $employee->name ?? 'N/A',
                'total_days' => $totalDays,
                'late_days' => $lateDays,
                'office_days' => $officeDays,
                'home_days' => $homeDays,
                'outside_days' => $outsideDays,
                'avg_hours' => $avgHours,
            ];
        });

        return Inertia::render('admin/attendance/attendance', [
            'attendanceSummary' => $attendanceSummary,
        ]);
    }

    public function attendance_show(string $id)
    {
        $employee = Employee::findOrFail($id);

        $attendances = EmployeeAttendance::where('employee_id', $employee->id)
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($a) {
                return [
                    'date' => Carbon::parse($a->date)->format('d M Y'),
                    'check_in' => $a->check_in_time ? Carbon::parse($a->check_in_time)->format('h:i A') : '-',
                    'check_out' => $a->check_out_time ? Carbon::parse($a->check_out_time)->format('h:i A') : '-',
                    'total_hours' => $a->total_hours ?? 0,
                    'is_late' => $a->is_late,
                    'location_type' => $a->location_type ?? 'N/A',
                    'status' => $a->status ?? 'Present',
                ];
            });

        return inertia('admin/attendance/show', [
            'employee' => [
                'id' => $employee->id,
                'name' => $employee->name ?? 'N/A',
                'email' => $employee->email ?? '-',
            ],
            'attendances' => $attendances,
        ]);
    }
}
