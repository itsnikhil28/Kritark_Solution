<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Task;
use App\Models\TaskUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::with(['admin','employee'])->latest()->get();
        $employees = Employee::all();
        return Inertia::render('admin/tasks/tasks', ['tasks' => $tasks, 'employees' => $employees]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required',
            'title' => 'required|max:255',
            'description' => 'required',
            'start_date' => 'required',
            'deadline' => 'required|date|after:start_date',
            'priority' => 'required|in:Low,Medium,High,Urgent',
            'status' => 'required|in:Pending,In Progress,Completed,Delayed',
            'remarks' => 'required',
        ]);

        $task = Task::create([
            'admin_id' => Auth::user()->id,
            'employee_id' => $request->employee_id,
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'deadline' => $request->deadline,
            'completion_date' => null,
            'priority' => $request->priority,
            'status' => $request->status,
            'remarks' => $request->remarks,
        ]);

        TaskUpdate::create([
            'task_id' => $task->id,
            'updated_by' => Auth::user()->id,
            'status' => 'Pending',
            'remark' => 'Task Assigned By Admin',
            'progress_percentage' => 10,
        ]);

        return redirect()->route('admin.tasks');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::with('employee')->findorFail($id);
        $taskUpdates = TaskUpdate::with('employee')->where('task_id', $id)->get();
        return Inertia::render('admin/tasks/ViewTask', ['task' => $task, 'taskUpdates' => $taskUpdates]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $task = Task::with('employee')->findorFail($id);
        return Inertia::render('admin/tasks/EditTask', ['task' => $task]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::findOrFail($id);

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'start_date' => 'required',
            'deadline' => 'required|date|after:start_date',
            'priority' => 'required|in:Low,Medium,High,Urgent',
            'remarks' => 'required',
        ]);

        $task->update($validatedData);

        return redirect()->route('admin.tasks');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);
        $task->updates()->delete();
        $task->delete();

        return redirect()->route('admin.tasks');
    }
}
