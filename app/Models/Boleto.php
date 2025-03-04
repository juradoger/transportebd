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
        'viaje_id',
        'nro_asiento',
        'codigo_qr',
        'fecha_viaje',
        'estado',
        'precio'
    ];

    public function viaje()
    {
        return $this->belongsTo(related: Viaje::class);
    }


    public function detalleCompra()
    {
        return $this->hasMany(DetalleCompra::class);
    }
}
