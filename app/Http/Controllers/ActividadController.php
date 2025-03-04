<?php

namespace App\Http\Controllers;

use App\Models\DetalleCompra;
use Illuminate\Http\Request;

class ActividadController extends Controller
{
    public function buscar(Request $request)
    {

        $userId = $request->userId;
        $boletos = DetalleCompra::with(['boleto', 'boleto.viaje', 'boleto.viaje.ruta'])
            ->where('usuario_id', $userId)
            ->get()
            ->map(function ($boleto) {
                $boleto->activityType = 'boleto';
                return $boleto;
            });

        return response()->json($boletos);
    }
}
