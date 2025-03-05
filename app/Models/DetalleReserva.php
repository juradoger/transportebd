<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleReserva extends Model
{
    use HasFactory;

    protected $table = 'detalle_reserva';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'reserva_id',
        'cantidad',
        'fecha_reserva',
        'precio_total'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }
}
