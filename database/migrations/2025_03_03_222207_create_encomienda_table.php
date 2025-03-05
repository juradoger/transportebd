<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEncomiendaTable extends Migration
{
    public function up()
    {
        Schema::create('encomienda', function (Blueprint $table) {
            $table->id();
            $table->text('descripcion');
            $table->decimal('peso', 5, 2)->nullable();
            $table->enum('tipo_paquete', ['Estándar', 'Otro'])->default('Estándar');
            $table->decimal('largo', 5, 2)->nullable();
            $table->decimal('ancho', 5, 2)->nullable();
            $table->decimal('alto', 5, 2)->nullable();
            $table->string('origen', 255);
            $table->string('destino', 255);
            $table->string('codigo_rastreo', 300);
            $table->enum('estado', ['Registrada', 'En Tránsito', 'Entregada', 'Cancelada'])->default('Registrada');
            $table->date('fecha_envio');
            $table->date('fecha_entrega')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('nombre_destinatario', 100); // Nuevo campo
            $table->string('telefono_destinatario', 20); // Nuevo campo
            $table->string('correo_destinatario', 100); // Nuevo campo
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('encomienda');
    }
}
