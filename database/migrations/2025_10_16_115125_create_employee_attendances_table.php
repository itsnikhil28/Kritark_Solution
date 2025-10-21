<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employee_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');

            $table->date('date');

            $table->time('check_in_time')->nullable();
            $table->time('check_out_time')->nullable();

            $table->decimal('total_hours', 5, 2)->nullable();

            $table->enum('status', ['Present', 'Absent', 'Leave'])->default('Present');

            $table->boolean('is_late')->default(false);
            $table->enum('location_type', ['Home', 'Office', 'Outside'])->nullable();

            $table->string('remarks')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_attendances');
    }
};
