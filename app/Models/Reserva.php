<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'reserva';
    protected $primaryKey = 'id';
    protected $fillable = [
        'vehiculo_id',
        'ruta_id',
        'nro_asiento',
        'fecha_reserva',
        'estado',
        'precio'
    ];

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }

    public function ruta()
    {
        return $this->belongsTo(Ruta::class);
    }

    public function detalleReserva()
    {
        return $this->hasMany(DetalleReserva::class);
    }
}
