<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boleto extends Model
{
    use HasFactory;

    protected $table = 'boleto';
    protected $primaryKey = 'id';
    protected $fillable = [
        'vehiculo_id',
        'ruta_id',
        'nro_asiento',
        'codigo_qr',
        'fecha_viaje',
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

    public function detalleCompra()
    {
        return $this->hasMany(DetalleCompra::class);
    }
}
