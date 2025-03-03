<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuario';
    protected $primaryKey = 'id';
    protected $fillable = [
        'correo',
        'contraseña',
        'nombre',
        'apellidos',
        'telefono',
        'estado',
    ];

    public function roles()
    {
        return $this->belongsToMany(Rol::class, 'usuario_rol', 'usuario_id', 'rol_id');
    }

    public function detallesCompra()
    {
        return $this->hasMany(DetalleCompra::class);
    }

    public function detallesReserva()
    {
        return $this->hasMany(DetalleReserva::class);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }

    public function encomiendas()
    {
        return $this->hasMany(Encomienda::class);
    }

    public function reportes()
    {
        return $this->hasMany(Reporte::class);
    }
}
