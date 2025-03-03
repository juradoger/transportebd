<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    use HasFactory;

    protected $table = 'reporte';
    protected $primaryKey = 'id';
    protected $fillable = ['titulo', 'descripcion', 'fecha_creacion', 'usuario_id'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
