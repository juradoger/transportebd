<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleReservaTable extends Migration
{
    public function up()
    {
        Schema::create('detalle_reserva', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('reserva_id');
            $table->integer('cantidad');
            $table->date('fecha_reserva');
            $table->decimal('precio_total', 10, 2);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('reserva_id')->references('id')->on('reserva')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detalle_reserva');
    }
}
