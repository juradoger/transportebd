<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleCompra extends Model
{
    use HasFactory;

    protected $table = 'detalle_compra';
    protected $primaryKey = 'id';
    protected $fillable = [
        'usuario_id',
        'boleto_id',
        'cantidad',
        'fecha_compra',
        'precio_total'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function boleto()
    {
        return $this->belongsTo(Boleto::class);
    }
}
