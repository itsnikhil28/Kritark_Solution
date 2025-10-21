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
        Schema::create('leave_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->foreignId('leave_type_id')->constrained('leave_types')->onDelete('cascade');

            // application info
            $table->date('apply_date')->default(now());
            $table->date('leave_start_date');
            $table->date('leave_end_date');
            $table->integer('requested_days')->default(1);
            $table->text('reason')->nullable();

            // manager/admin section
            $table->date('approved_date')->nullable();
            $table->date('approved_start_date')->nullable();
            $table->date('approved_end_date')->nullable();
            $table->integer('approved_days')->nullable();

            $table->string('hard_copy')->nullable(); // file path for image/pdf
            $table->text('manager_comments')->nullable();

            $table->enum('status', ['Pending', 'Approved', 'Rejected'])->default('Pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_applications');
    }
};
