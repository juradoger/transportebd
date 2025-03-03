<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservaTable extends Migration
{
    public function up()
    {
        Schema::create('reserva', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vehiculo_id');
            $table->unsignedBigInteger('ruta_id');
            $table->integer('nro_asiento');
            $table->date('fecha_reserva');
            $table->enum('estado', ['Pendiente', 'Confirmada', 'Cancelada'])->default('Pendiente');
            $table->decimal('precio', 10, 2);
            $table->foreign('vehiculo_id')->references('id')->on('vehiculo')->onDelete('cascade');
            $table->foreign('ruta_id')->references('id')->on('ruta')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reserva');
    }
}
