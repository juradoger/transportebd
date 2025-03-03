<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;

    protected $table = 'vehiculo';
    protected $primaryKey = 'id';
    protected $fillable = ['placa', 'capacidad', 'modelo', 'estado'];

    public function boletos()
    {
        return $this->hasMany(Boleto::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
}
