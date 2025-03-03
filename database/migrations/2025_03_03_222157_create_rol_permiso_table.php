<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolPermisoTable extends Migration
{
    public function up()
    {
        Schema::create('rol_permiso', function (Blueprint $table) {
            $table->unsignedBigInteger('rol_id');
            $table->unsignedBigInteger('permiso_id');
            $table->primary(['rol_id', 'permiso_id']);
            $table->foreign('rol_id')->references('id')->on('rol')->onDelete('cascade');
            $table->foreign('permiso_id')->references('id')->on('permiso')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('rol_permiso');
    }
}
