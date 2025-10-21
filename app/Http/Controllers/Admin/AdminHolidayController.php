<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Holiday;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminHolidayController extends Controller
{
    public function index()
    {
        $holidays = Holiday::orderByDesc('from_date')->get();
        return Inertia::render('admin/holiday/index', [
            'holidays' => $holidays
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'holiday_name' => 'required|string|max:255',
            'from_date' => 'required|date',
            'to_date' => 'nullable|date|after_or_equal:from_date',
            'type' => 'required|in:Public,Weekly',
        ]);

        $totalDays = $request->to_date ? now()->parse($request->to_date)->diffInDays(now()->parse($request->from_date)) + 1 : 1;

        Holiday::create([
            'holiday_name' => $request->holiday_name,
            'from_date' => $request->from_date,
            'to_date' => $request->to_date,
            'type' => $request->type,
            'total_days' => $totalDays,
        ]);

        return redirect()->back()->with('success', 'Holiday created successfully!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'holiday_name' => 'required|string|max:255',
            'from_date' => 'required|date',
            'to_date' => 'nullable|date|after_or_equal:from_date',
            'type' => 'required|in:Public,Weekly',
        ]);

        $holiday = Holiday::findOrFail($id);

        $totalDays = $request->to_date ? now()->parse($request->to_date)->diffInDays(now()->parse($request->from_date)) + 1 : 1;

        $holiday->update([
            'holiday_name' => $request->holiday_name,
            'from_date' => $request->from_date,
            'to_date' => $request->to_date,
            'type' => $request->type,
            'total_days' => $totalDays,
        ]);

        return redirect()->back()->with('success', 'Holiday updated successfully!');
    }

    public function destroy($id)
    {
        $holiday = Holiday::findOrFail($id);
        $holiday->delete();

        return redirect()->back()->with('success', 'Holiday deleted successfully!');
    }
}
