<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Encomienda extends Model
{
    use HasFactory;

    protected $table = 'encomienda';
    protected $primaryKey = 'id';
    protected $fillable = [
        'descripcion', 
        'peso', 
        'tipo_paquete', 
        'largo', 
        'ancho', 
        'alto', 
        'origen', 
        'destino', 
        'codigo_rastreo', 
        'estado', 
        'fecha_envio', 
        'fecha_entrega', 
        'usuario_id'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
