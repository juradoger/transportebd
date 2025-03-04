<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Viaje extends Model
{
    use HasFactory;

    protected $table = 'viaje';
    protected $primaryKey = 'id';
    protected $fillable = [
        'ruta_id',
        'vehiculo_id',
        'fecha_salida',
        'fecha_llegada',
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

    public function boletos()
    {
        return $this->hasMany(Boleto::class);
    }
}
