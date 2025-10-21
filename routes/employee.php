<?php

use App\Http\Controllers\Auth\EmployeeSessionController;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\Employee\EmployeeLeaveController;
use App\Http\Middleware\EmployeeAuth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web', EmployeeAuth::class])->prefix('employee')->name('employee.')->group(function () {
    Route::get('dashboard', [EmployeeController::class, 'index'])->name('dashboard');
    Route::match(['get', 'post'], 'complete-profile', [EmployeeController::class, 'completeProfile'])->name('complete-profile');
    Route::get('tasks', [EmployeeController::class, 'tasks'])->name('tasks');
    Route::post('task/update/{id}', [EmployeeController::class, 'taskUpdate'])->name('task.update');
    Route::get('attendance', [EmployeeController::class, 'attendance'])->name('attendance');
    Route::post('attendance/checkin', [EmployeeController::class, 'checkin'])->name('attendance.checkin');
    Route::post('attendance/checkout', [EmployeeController::class, 'checkOut'])->name('attendance.checkout');

    Route::get('leaves', [EmployeeLeaveController::class, 'index'])->name('leaves.index');
    Route::post('leaves', [EmployeeLeaveController::class, 'store'])->name('leaves.store');
    Route::put('leaves/{id}', [EmployeeLeaveController::class, 'update'])->name('leaves.update');
    Route::delete('leaves/{id}', [EmployeeLeaveController::class, 'destroy'])->name('leave.destroy');

    Route::get('holidays', [EmployeeController::class, 'holiday'])->name('holidays.index');
    Route::get('salary', [EmployeeController::class, 'salary'])->name('salary.index');

    Route::post('employee/logout', [EmployeeSessionController::class, 'destroy'])->name('logout');
});
