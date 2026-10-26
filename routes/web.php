<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('/clientes/verificar', [ClienteController::class,'verificarDuplicidade',])
        ->name('clientes.verificar');

    // Listar e pesquisar clientes
    Route::get('/clientes', [ClienteController::class, 'index'])
        ->name('clientes.index');

    // Exibir formulário de cadastro
    Route::get('/clientes/create', [ClienteController::class, 'create'])
        ->name('clientes.create');

    // Salvar novo cliente
    Route::post('/clientes', [ClienteController::class, 'store'])
        ->name('clientes.store');

    // Exibir dados de um cliente
    Route::get('/clientes/{cliente}', [ClienteController::class, 'show'])
        ->name('clientes.show');

    // Exibir formulário de edição
    Route::get('/clientes/{cliente}/edit', [ClienteController::class, 'edit'])
        ->name('clientes.edit');

    // Atualizar cliente existente
    Route::put('/clientes/{cliente}', [ClienteController::class, 'update'])
        ->name('clientes.update');

    // Excluir cliente
    Route::delete('/clientes/{cliente}', [ClienteController::class, 'destroy'])
        ->name('clientes.destroy');
});

require __DIR__.'/settings.php';
