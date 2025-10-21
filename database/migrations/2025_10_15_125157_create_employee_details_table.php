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
        Schema::create('employee_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->string('profile_image')->nullable();
            $table->string('address')->nullable();

            $table->date('date_of_birth')->nullable();
            $table->string('card_no')->nullable();
            $table->string('passport_no')->nullable();
            $table->string('driving_license_no')->nullable();
            $table->string('gender')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('no_of_kids')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('religion')->nullable();
            $table->string('ethnic_group')->nullable();

            $table->string('account_no')->nullable();
            $table->string('ifsc_code')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('branch_name')->nullable();
            $table->string('tax_identification_no')->nullable();
            $table->string('salary_basic')->nullable();
            $table->string('salary_transport_allowance')->nullable();
            $table->string('salary_gross')->nullable();

            $table->string('pension')->nullable();
            $table->string('nsf')->nullable();
            $table->string('nhif')->nullable();

            $table->json('documents')->nullable();
            $table->string('is_completed')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_details');
    }
};
