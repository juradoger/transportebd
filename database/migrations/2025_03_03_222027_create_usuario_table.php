<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuarioTable extends Migration
{
    public function up()
    {
        Schema::create('usuario', function (Blueprint $table) {
            $table->id();
            $table->string('correo', 100);
            $table->string('contraseña', 255);
            $table->string('nombre', 100);
            $table->string('apellidos', 100);
            $table->string('telefono', 20);
            $table->enum('estado', ['Activo', 'Inactivo', 'Suspendido'])->default('Activo');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuario');
    }
}
