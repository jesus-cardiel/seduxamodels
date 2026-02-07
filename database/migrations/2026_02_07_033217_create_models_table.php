<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('models', function (Blueprint $table) {
            $table->id();
            $table->string('real_name');
            $table->string('nick');
            $table->integer('age');
            $table->string('country_code');
            $table->string('whatsapp');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('selfie');
            $table->enum('status', ['revision', 'aprobado', 'reprobado'])->default('revision');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('models');
    }
};
