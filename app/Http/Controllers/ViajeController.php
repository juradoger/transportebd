<?php

namespace App\Http\Controllers;

use App\Models\Boleto;
use App\Models\Viaje;
use Illuminate\Http\Request;

class ViajeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Filter boletos based on the given criteria.
     */
    public function buscar(Request $request)
    {
        $query = Viaje::with(['ruta', 'vehiculo']);

        if ($request->has('origen')) {
            $query->whereHas('ruta', function ($q) use ($request) {
                $q->where('origen', $request->input('origen'));
            });
        }

        if ($request->has('destino')) {
            $query->whereHas('ruta', function ($q) use ($request) {
                $q->where('destino', $request->input('destino'));
            });
        }

        if ($request->has('fecha_viaje')) {
            $query->whereDate('fecha_viaje', $request->input('fecha_viaje'));
        }

        if ($request->has('pasajeros')) {
            $query->where('pasajeros', $request->input('pasajeros'));
        }

        $boletos = $query->get()->map(function ($boleto) {
            $vehiculo = $boleto->vehiculo;
            $boletosUtilizados = Boleto::where('viaje_id', $boleto->viaje_id)
                ->where('estado', 'Utilizado')
                ->count();
            $boleto->asientos_disponibles = $vehiculo->capacidad - $boletosUtilizados;
            return $boleto;
        });

        return response()->json($boletos);
    }
}
