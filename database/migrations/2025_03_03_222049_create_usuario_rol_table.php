<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuarioRolTable extends Migration
{
    public function up()
    {
        Schema::create('usuario_rol', function (Blueprint $table) {
            $table->unsignedBigInteger('usuario_id');
            $table->unsignedBigInteger('rol_id');
            $table->primary(['usuario_id', 'rol_id']);
            $table->foreign('usuario_id')->references('id')->on('usuario')->onDelete('cascade');
            $table->foreign('rol_id')->references('id')->on('rol')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuario_rol');
    }
}
