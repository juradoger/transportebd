<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoletoTable extends Migration
{
    public function up()
    {
        Schema::create('boleto', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vehiculo_id');
            $table->unsignedBigInteger('ruta_id');
            $table->integer('nro_asiento');
            $table->string('codigo_qr', 255);
            $table->date('fecha_viaje');
            $table->enum('estado', ['Emitido', 'Utilizado', 'Cancelado'])->default('Emitido');
            $table->decimal('precio', 10, 2);
            $table->foreign('vehiculo_id')->references('id')->on('vehiculo')->onDelete('cascade');
            $table->foreign('ruta_id')->references('id')->on('ruta')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('boleto');
    }
}
