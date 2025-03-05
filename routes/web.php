<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ShipingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TicketController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('tickets', [TicketController::class, 'index'])
        ->name('tickets.index');

    Route::get('tickets/results', [TicketController::class, 'results'])
        ->name('tickets.results');


    Route::get('tickets/viaje/{id}/asientos', [TicketController::class, 'seats'])
        ->name('tickets.seats');

    Route::get('tickets/checkout', [TicketController::class, 'checkout'])
        ->name('tickets.checkout');

    Route::post('tickets/completarPago', [TicketController::class, 'completarPago'])
        ->name('tickets.completarPago');

    Route::get('tickets/confirmation/{id}', [TicketController::class, 'confirmation'])
        ->name('tickets.confirmation');


    Route::get('reservations', [ReservationController::class, 'index'])
        ->name('reservations.index');

    Route::get('reservations/results', [ReservationController::class, 'results'])
        ->name('reservations.results');


    Route::get('reservations/viaje/{id}/asientos', [ReservationController::class, 'seats'])
        ->name('reservations.seats');

    Route::get('reservations/checkout', [ReservationController::class, 'checkout'])
        ->name('reservations.checkout');

    Route::post('reservations/completarPago', [ReservationController::class, 'completarPago'])
        ->name('reservations.completarPago');

    Route::get('reservations/confirmation/{id}', [ReservationController::class, 'confirmation'])
        ->name('reservations.confirmation');


    Route::get('shipings', [ShipingController::class, 'index'])
        ->name('shipings.index');

    Route::get('shipings/checkout', [ShipingController::class, 'checkout'])
        ->name('shipings.checkout');

    Route::post('shipings/completarPago', [ShipingController::class, 'completarPago'])
        ->name('shipings.completarPago');

    Route::get('shipings/confirmation/{id}', [ShipingController::class, 'confirmation'])
        ->name('shipings.confirmation');

    Route::get('shipings/updateStatus/{id}', [ShipingController::class, 'updateStatus'])
        ->name('shipings.updateStatus');

    Route::get('invoice/{id}', [InvoiceController::class, 'show'])
        ->name('invoice.show');


    Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
