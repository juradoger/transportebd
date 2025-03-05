<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    use HasFactory;

    protected $table = 'reporte';
    protected $primaryKey = 'id';
    protected $fillable = ['titulo', 'descripcion', 'fecha_creacion', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
