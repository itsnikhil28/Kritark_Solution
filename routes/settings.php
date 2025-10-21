<?php

use App\Http\Controllers\Settings\EmployeePasswordController;
use App\Http\Controllers\Settings\EmployeeProfileController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Middleware\EmployeeAuth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('settings', '/settings/profile');
Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
Route::get('settings/appearance', function () {
    return Inertia::render('settings/appearance');
})->name('appearance.edit');

Route::middleware('auth')->group(function () {
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');
});

Route::middleware([EmployeeAuth::class])->group(function () {
    Route::patch('employee/settings/profile', [EmployeeProfileController::class, 'update'])->name('employee.profile.update');
    Route::delete('employee/settings/profile', [EmployeeProfileController::class, 'destroy'])->name('employee.profile.destroy');

    Route::put('employee/settings/password', [EmployeePasswordController::class, 'update'])
        ->name('employee.password.update');
});
