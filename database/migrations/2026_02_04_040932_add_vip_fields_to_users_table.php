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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('edad')->after('email')->nullable();
            $table->string('sexo')->after('edad')->nullable();
            $table->string('country_code', 10)->after('sexo')->nullable();
            $table->string('whatsapp')->after('country_code')->nullable();
            $table->string('role')->default('vip')->after('password');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['edad', 'sexo', 'country_code', 'whatsapp', 'role']);
        });
    }
};
