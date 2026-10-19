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
    Schema::table('clientes', function (Blueprint $table) {
        $table->string('nome', 150);
        $table->string('cpf', 11)->unique();
        $table->string('email', 150)->unique();
        $table->string('telefone', 20)->nullable();
        $table->string('endereco', 255)->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('clientes', function (Blueprint $table) {
        $table->dropColumn([
            'nome',
            'cpf',
            'email',
            'telefone',
            'endereco',
        ]);
    });
}
};
