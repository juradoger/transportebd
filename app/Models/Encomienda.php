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
        'user_id',
        'nombre_destinatario',
        'telefono_destinatario',
        'correo_destinatario'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
