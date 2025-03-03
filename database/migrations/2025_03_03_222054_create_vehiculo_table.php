<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiculoTable extends Migration
{
    public function up()
    {
        Schema::create('vehiculo', function (Blueprint $table) {
            $table->id();
            $table->string('placa', 20);
            $table->integer('capacidad');
            $table->string('modelo', 100)->nullable();
            $table->enum('estado', ['Disponible', 'En Mantenimiento', 'En Ruta', 'Fuera de Servicio'])->default('Disponible');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vehiculo');
    }
}
