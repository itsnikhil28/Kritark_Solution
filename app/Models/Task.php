<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = [];

    // protected $casts = [
    //     'deadline' => 'date',
    // ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function updates()
    {
        return $this->hasMany(TaskUpdate::class);
    }
}
