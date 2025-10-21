<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class EmployeePasswordController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $employee = Employee::find(session()->get('employee_id'));

        if (! Hash::check($request->current_password, $employee->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        $employee->update([
            'password' => Hash::make($request->password),
        ]);

        return back();
    }
}
