<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable as AuthAuthenticatable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model implements Authenticatable
{
    use AuthAuthenticatable;
    
    protected $guarded = [];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function taskUpdates()
    {
        return $this->hasMany(TaskUpdate::class, 'updated_by');
    }

    public function employeeDetails()
    {
        return $this->hasMany(EmployeeDetails::class);
    }

    public function attendances()
    {
        return $this->hasMany(EmployeeAttendance::class);
    }

    public function leaveApplications()
    {
        return $this->hasMany(LeaveApplication::class);
    }
}
