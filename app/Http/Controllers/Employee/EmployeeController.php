<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\EmployeeAttendance;
use App\Models\EmployeeDetails;
use App\Models\EmployeeSalary;
use App\Models\Holiday;
use App\Models\Task;
use App\Models\TaskUpdate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        $employeeDetails = EmployeeDetails::where('employee_id', session()->get('employee_id'))->first();

        if (!$employeeDetails || $employeeDetails->is_completed == 0) {
            return redirect()->route('employee.complete-profile');
        }

        $employee_id = session()->get('employee_id');

        $activetasks = Task::where('employee_id', '=', $employee_id)->count();
        $completedtasks = Task::where('status', 'Completed')->where('employee_id', '=', $employee_id)->count();
        $pendingtasks = Task::where('status', 'Pending')->where('employee_id', '=', $employee_id)->count();
        $productivity = Task::where('employee_id', '=', $employee_id)->avg('progress_percentage');
        $productivity = round($productivity, 2);
        $pendingTasksList = Task::where('status', 'Pending')
            ->where('employee_id', '=', $employee_id)
            ->get([
                'id',
                'title',
                'description',
                'deadline',
                'priority',
                'progress_percentage'
            ]);

        $currentYear = Carbon::now()->year;

        $months = collect(range(1, 12))->map(function ($m) {
            return Carbon::create(null, $m, 1)->format('M');
        });

        $salaries = EmployeeSalary::with('salaryGeneration')
            ->where('employee_id', $employee_id)
            ->whereYear('created_at', $currentYear)
            ->get()
            ->keyBy(function ($item) {
                return Carbon::parse($item->salaryGeneration->salary_month)->format('M');
            });

        $salaryData = $months->map(function ($month) use ($salaries) {
            return [
                'month' => $month,
                'Monthly Salary' => isset($salaries[$month]) ? (float) $salaries[$month]->net_salary : 0,
            ];
        });

        return Inertia::render('employee/dashboard', [
            'activetasks' => $activetasks,
            'completedtasks' => $completedtasks,
            'pendingtasks' => $pendingtasks,
            'productivity' => $productivity,
            'pendingTasksList' => $pendingTasksList,
            'salaryData' => $salaryData,
        ]);
    }

    public function completeProfile(Request $request)
    {
        if (!$request->isMethod('post')) {
            return Inertia::render('employee/CompleteProfile');
        }

        $request->validate([
            'profile_image' => 'required|image|max:1024|mimes:png,jpg,jpeg,gif',
            'address' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'card_no' => 'required|string|max:255',
            'passport_no' => 'required|string|max:255',
            'driving_license_no' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'marital_status' => 'required|string|max:255',
            'no_of_kids' => 'required|string|max:255',
            'blood_group' => 'required|string|max:255',
            'religion' => 'required|string|max:255',
            'ethnic_group' => 'required|string|max:255',
            'account_no' => 'required|string|max:255',
            'ifsc_code' => 'required|string|max:255',
            'bank_name' => 'required|string|max:255',
            'branch_name' => 'required|string|max:255',
            'tax_identification_no' => 'required|string|max:255',
            'documents' => 'required',
        ]);

        if ($request->has('profile_image')) {
            if (!file_exists(public_path('employee/profile_images'))) {
                mkdir(public_path('employee/profile_images'), 0755, true);
            }

            $profile_image = $request->file('profile_image');

            $profileImageName = 'profile_image-' . time() . '.' . $profile_image->getClientOriginalExtension();
            $profile_image->move(public_path('employee/profile_images'), $profileImageName);
        }

        if ($request->has('documents')) {
            if (!file_exists(public_path('employee/documents'))) {
                mkdir(public_path('employee/documents'), 0755, true);
            }
            $documents = $request->file('documents');

            $documentName = 'documents-' . time() . '.' . $documents->getClientOriginalExtension();
            $documents->move(public_path('employee/documents'), $documentName);
        }

        EmployeeDetails::create([
            'is_completed' => 1,
            'employee_id' => session()->get('employee_id'),
            'address' => $request->address,
            'date_of_birth' => $request->date_of_birth,
            'card_no' => $request->card_no,
            'passport_no' => $request->passport_no,
            'driving_license_no' => $request->driving_license_no,
            'gender' => $request->gender,
            'marital_status' => $request->marital_status,
            'no_of_kids' => $request->no_of_kids,
            'blood_group' => $request->blood_group,
            'religion' => $request->religion,
            'ethnic_group' => $request->ethnic_group,
            'account_no' => $request->account_no,
            'ifsc_code' => $request->ifsc_code,
            'bank_name' => $request->bank_name,
            'branch_name' => $request->branch_name,
            'tax_identification_no' => $request->tax_identification_no,
            'profile_image' => $profileImageName,
            'documents' => json_encode($documentName),
        ]);

        return redirect()->route('employee.dashboard');
    }

    public function tasks()
    {
        $tasks = Task::where('employee_id', session()->get('employee_id'))->get();
        return Inertia::render('employee/Tasks', ['tasks' => $tasks]);
    }

    public function taskUpdate(Request $request, String $id)
    {
        $request->validate([
            'status' => 'required|string|max:255',
            'remarks' => 'required',
            'time_spent_minutes' => 'required|numeric',
        ]);

        $task = Task::findOrFail($id);

        $status = $request->status;
        $employee_id = session()->get('employee_id');

        if ($status == 'In Progress') {
            $task->update([
                'status' => $status,
                'progress_percentage' => 25,
                'time_spent_minutes' => $request->time_spent_minutes,
                'completion_date' => null,
            ]);

            TaskUpdate::create([
                'task_id' => $task->id,
                'updated_by' => $employee_id,
                'status' => $status,
                'progress_percentage' => 25,
                'time_logged_minutes' => $request->time_spent_minutes,
                'remark' => $request->remarks,
            ]);
        } elseif ($status == 'Completed') {
            $task->update([
                'status' => $status,
                'progress_percentage' => 100,
                'time_spent_minutes' => $request->time_spent_minutes,
                'completion_date' => now(),
            ]);

            TaskUpdate::create([
                'task_id' => $task->id,
                'updated_by' => $employee_id,
                'status' => $status,
                'progress_percentage' => 100,
                'time_logged_minutes' => $request->time_spent_minutes,
                'remark' => $request->remarks,
            ]);
        } elseif ($status == 'Delayed') {
            $task->update([
                'status' => $status,
                'progress_percentage' => 0,
                'time_spent_minutes' => $request->time_spent_minutes,
            ]);

            TaskUpdate::create([
                'task_id' => $task->id,
                'updated_by' => $employee_id,
                'status' => $status,
                'progress_percentage' => 0,
                'time_logged_minutes' => $request->time_spent_minutes,
                'remark' => $request->remarks,
            ]);
        }

        return redirect()->route('employee.tasks');
    }

    public function attendance()
    {
        $employee_id = session()->get('employee_id');
        $today = Carbon::today()->toDateString();

        $attendanceToday = EmployeeAttendance::where('employee_id', $employee_id)
            ->where('date', $today)
            ->first();

        $recentAttendances = EmployeeAttendance::where('employee_id', $employee_id)
            ->orderByDesc('date')
            ->take(7)
            ->get();

        return Inertia::render('employee/attendance', [
            'attendanceToday' => $attendanceToday,
            'recentAttendances' => $recentAttendances,
        ]);
    }

    public function checkin(Request $request)
    {
        $employee_id = session()->get('employee_id');

        if (!$employee_id) {
            return back()->withErrors(['employee' => 'Employee record not found.']);
        }

        $request->validate([
            'location_type' => 'required|in:Home,Office,Outside',
        ]);

        $today = Carbon::today()->toDateString();

        $existing = EmployeeAttendance::where('employee_id', $employee_id)
            ->where('date', $today)
            ->first();

        if ($existing) {
            return back()->withErrors(['checkin' => 'You have already checked in today.']);
        }

        $checkInTime = Carbon::now();
        $isLate = $checkInTime->gt(Carbon::parse('10:15 AM'));

        EmployeeAttendance::create([
            'employee_id' => $employee_id,
            'date' => $today,
            'check_in_time' => $checkInTime,
            'status' => 'Present',
            'is_late' => $isLate,
            'location_type' => $request->location_type,
        ]);

        return back()->with('success', 'Checked in successfully at ' . $checkInTime->format('h:i A'));
    }

    public function checkOut(Request $request)
    {
        $employee_id = session()->get('employee_id');

        if (!$employee_id) {
            return back()->withErrors(['employee' => 'Employee record not found.']);
        }

        $today = Carbon::today()->toDateString();

        $attendance = EmployeeAttendance::where('employee_id', $employee_id)
            ->where('date', $today)
            ->first();

        if (!$attendance) {
            return back()->withErrors(['checkout' => 'You have not checked in yet.']);
        }

        if ($attendance->check_out_time) {
            return back()->withErrors(['checkout' => 'You have already checked out today.']);
        }

        $checkOutTime = Carbon::now();

        $checkIn = Carbon::parse($attendance->check_in_time);
        $totalHours = $checkIn->diffInMinutes($checkOutTime) / 60;
        $totalHours = round($totalHours, 2);

        $attendance->update([
            'check_out_time' => $checkOutTime,
            'total_hours' => $totalHours,
        ]);

        return back()->with('success', 'Checked out successfully at ' . $checkOutTime->format('h:i A'));
    }

    public function holiday()
    {
        $holidays = Holiday::orderBy('from_date', 'asc')->get();

        return Inertia::render('employee/HolidayList', [
            'holidays' => $holidays,
        ]);
    }

    public function salary()
    {
        $salaries = EmployeeSalary::with(['employee', 'salaryGeneration'])
            ->latest()
            ->get()
            ->sortByDesc('id')
            ->where('employee_id', session()->get('employee_id'))
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'employee_name' => $item->employee->name ?? 'N/A',
                    'salary_month' => $item->salaryGeneration->salary_month ?? 'N/A',
                    'total_salary' => $item->net_salary ?? 0,
                ];
            });

        return inertia('employee/EmployeeSalaryList', [
            'salaries' => $salaries,
        ]);
    }
}
