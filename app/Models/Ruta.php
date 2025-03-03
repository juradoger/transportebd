<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruta extends Model
{
    use HasFactory;

    protected $table = 'ruta';
    protected $primaryKey = 'id';
    protected $fillable = ['origen', 'destino', 'horario'];

    public function boletos()
    {
        return $this->hasMany(Boleto::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
}
