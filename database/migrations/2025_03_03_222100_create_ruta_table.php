<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRutaTable extends Migration
{
    public function up()
    {
        Schema::create('ruta', function (Blueprint $table) {
            $table->id();
            $table->string('origen', 100);
            $table->string('destino', 100);
            $table->string('duracion')->nullable();
            $table->string('clase')->nullable();
            $table->time('horario')->nullable();
            $table->string(column: 'maps_url')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ruta');
    }
}
