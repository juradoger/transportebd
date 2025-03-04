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
            $table->unsignedBigInteger('viaje_id');
            $table->integer('nro_asiento');
            $table->string('codigo_qr', 255);
            $table->date('fecha_viaje');
            $table->enum('estado', ['Emitido', 'Utilizado', 'Cancelado'])->default('Emitido');
            $table->decimal('precio', 10, 2);
            $table->foreign('viaje_id')->references('id')->on('viaje')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('boleto');
    }
}
