<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up()
    {
        Schema::create('viaje', function (Blueprint $table) {
            $table->id(); // Crea id_viaje como clave primaria auto-incrementable

            // Claves foráneas
            $table->unsignedBigInteger('ruta_id');
            $table->unsignedBigInteger('vehiculo_id');

            // Columnas de fechas
            $table->dateTime('fecha_salida');
            $table->dateTime('fecha_llegada');

            $table->decimal('precio', 10, 2);

            // Timestamps para created_at y updated_at
            $table->timestamps();

            // Definición de claves foráneas
            $table->foreign('ruta_id')
                ->references('id')
                ->on('ruta')
                ->onDelete('cascade');

            $table->foreign('vehiculo_id')
                ->references('id')
                ->on('vehiculo')
                ->onDelete('cascade');

            // Índices para mejorar rendimiento
            $table->index('fecha_salida');
            $table->index(['ruta_id', 'vehiculo_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('viaje');
    }
};
