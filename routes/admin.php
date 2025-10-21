<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminHolidayController;
use App\Http\Controllers\Admin\AdminLeaveTypeController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\LeaveApprovalController;
use App\Http\Controllers\Admin\SalaryAdvanceController;
use App\Http\Controllers\Admin\SalaryGenerationController;
use App\Http\Controllers\Admin\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    Route::get('departments', [AdminController::class, 'departments'])->name('departments');
    Route::post('department/store', [AdminController::class, 'department_store'])->name('department.store');
    Route::put('department/{id}', [AdminController::class, 'department_update'])->name('department.update');
    Route::delete('department/{id}', [AdminController::class, 'department_destroy'])->name('department.destroy');

    Route::get('employees', [AdminController::class, 'employees'])->name('employees');
    Route::resource('employee', EmployeeController::class)->except('index');

    Route::get('tasks', [TaskController::class, 'index'])->name('tasks');
    Route::resource('task', TaskController::class)->except('index');

    Route::get('attendance', [AdminController::class, 'attendance'])->name('attendance');
    Route::get('attendance/show/{id}', [AdminController::class, 'attendance_show'])->name('attendance.show');

    Route::get('holidays', [AdminHolidayController::class, 'index'])->name('holiday.index');
    Route::post('holidays', [AdminHolidayController::class, 'store'])->name('holiday.store');
    Route::put('holidays/{id}', [AdminHolidayController::class, 'update'])->name('holiday.update');
    Route::delete('holidays/{id}', [AdminHolidayController::class, 'destroy'])->name('holiday.destroy');

    Route::get('leave-types', [AdminLeaveTypeController::class, 'index'])->name('leave.type.index');
    Route::post('leave-types', [AdminLeaveTypeController::class, 'store'])->name('leave.type.store');
    Route::put('leave-types/{id}', [AdminLeaveTypeController::class, 'update'])->name('leave.type.update');
    Route::delete('leave-types/{id}', [AdminLeaveTypeController::class, 'destroy'])->name('leave.type.destroy');

    Route::get('leave-approval', [LeaveApprovalController::class, 'index'])->name('leave.approval.index');
    Route::post('leave-approval/{id}/approve', [LeaveApprovalController::class, 'approve'])->name('leave.approve');
    Route::post('leave-approval/{id}/reject', [LeaveApprovalController::class, 'reject'])->name('leave.reject');

    Route::get('salary-advance', [SalaryAdvanceController::class, 'index'])->name('salary.advance.index');
    Route::post('salary-advance', [SalaryAdvanceController::class, 'store'])->name('salary.advance.store');
    Route::put('salary-advance/{id}', [SalaryAdvanceController::class, 'update'])->name('salary.advance.update');
    Route::delete('salary-advance/{id}', [SalaryAdvanceController::class, 'destroy'])->name('salary.advance.destroy');

    Route::get('salary/generate', [SalaryGenerationController::class, 'index'])->name('salary.generate');
    Route::post('salary/generate', [SalaryGenerationController::class, 'store'])->name('salary.generate.store');
    Route::get('salary/{id}/view', [SalaryGenerationController::class, 'show'])->name('salary.generate.show');
    Route::get('salary/{id}/employee-chart', [SalaryGenerationController::class, 'employeeSalaryChart'])->name('salary.employee-chart');

    Route::get('salary/employee-salary', [SalaryGenerationController::class, 'employeeSalaryList'])->name('salary.employee-salary');
});
