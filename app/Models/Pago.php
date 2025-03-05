<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'pago';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'monto', 'fecha', 'metodo'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
