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
        Schema::table('studios', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            $table->string('email')->unique()->after('id');
            $table->string('password')->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('studios', function (Blueprint $table) {
            $table->dropColumn(['email', 'password']);
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->after('id');
        });
    }
};
