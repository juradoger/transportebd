<?php

use App\Http\Controllers\BoletoController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\ViajeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/', function () {
    return view('InicioSesion');
});
Route::get('/', function () {
    return view('InterfazUsuario');
});

Route::get('/login', function () {
    return view('pages.login');
});
Route::get('/', function () {
    return view('pages.dashboard');
});

Route::get('/shipping', function () {
    return view('pages.shipping');
});
Route::get('/tickets', function () {
    return view('pages.tickets');
});

Route::get('/boletos/buscar', [BoletoController::class, 'buscar'])->name('boletos.buscar');
Route::get('/rutas/buscar', [RutaController::class, 'buscar'])->name('rutas.buscar');
Route::get('/viajes/buscar', [ViajeController::class, 'buscar'])->name('viajes.buscar');
