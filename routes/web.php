<?php

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

// pages login.blade
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
