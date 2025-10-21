<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalaryGeneration extends Model
{
    protected $guarded = [];

    public function employeeSalaries()
    {
        return $this->hasMany(EmployeeSalary::class);
    }
}
