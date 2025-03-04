<?php

use App\Http\Controllers\BoletoController;
use App\Http\Controllers\DetalleCompraController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\ViajeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('boletos', BoletoController::class);
Route::apiResource('rutas', RutaController::class);
Route::apiResource('viajes', controller: ViajeController::class);
Route::apiResource('detalle-compra', controller: DetalleCompraController::class);
