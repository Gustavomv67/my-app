<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;

Route::inertia('/', 'welcome')->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('/clientes', [ClienteController::class, 'index'])
    ->name('clientes.index');
});

require __DIR__.'/settings.php';
