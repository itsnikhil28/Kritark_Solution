<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class EmployeeSessionController extends Controller
{

    /**
     * Show the login page.
     */
    public function create(Request $request)
    {
        if ($request->session()->has('employee_id')) {
            return redirect()->route('employee.dashboard');
        }

        return Inertia::render('auth/employee/login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $user = Employee::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'No account found for this email.']);
        }

        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Invalid Credentials.']);
        }

        Auth::login($user, $request->boolean('remember'));

        $request->session()->put('employee_id', $user->id);

        $request->session()->regenerate();

        return redirect()->intended(route('employee.dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->forget('employee_id');

        return redirect('/employee/login');
    }
}
