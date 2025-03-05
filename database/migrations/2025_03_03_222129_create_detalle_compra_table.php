<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleCompraTable extends Migration
{
    public function up()
    {
        Schema::create('detalle_compra', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('boleto_id');
            $table->integer('cantidad');
            $table->date('fecha_compra');
            $table->decimal('precio_total', 10, 2);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('boleto_id')->references('id')->on('boleto')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detalle_compra');
    }
}
