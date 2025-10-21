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
        Schema::create('salary_generations', function (Blueprint $table) {
            $table->id();
            $table->string('salary_month');
            $table->date('generate_date');
            $table->string('generate_by')->default('Admin');
            $table->enum('status', ['Pending', 'Approved'])->default('Pending');
            $table->date('approved_date')->nullable();
            $table->string('approved_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salary_generations');
    }
};
