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

        if ($request->has('origin')) {
            $query->whereHas('ruta', function ($q) use ($request) {
                $q->where('origen', $request->input('origin'));
            });
        }

        $destination = $request->input('destination');

        if ($request->has('destination') && isset($destination)) {
            $query->whereHas('ruta', function ($q) use ($request) {
                $q->where('destino', $request->input('destination'));
            });
        }

        $date = $request->input('date');
        if ($request->has('date') && isset($date)) {
            $query->whereDate('fecha_salida', $request->input('date'));
        }

        if ($request->has('pasajeros')) {
            $query->where('pasajeros', $request->input('pasajeros'));
        }

        $viajes = $query->get()->map(function ($viaje) {
            $vehiculo = $viaje->vehiculo;
            $boletosUtilizados = Boleto::where('viaje_id', $viaje->id)
                ->where('estado', 'Utilizado');
            $asientosDisponibles = Boleto::where('viaje_id', $viaje->id)
                ->select('id as boleto_id', 'nro_asiento')
                ->where('estado', 'Emitido')
                ->get();

            $countBoletosUtilizados = $boletosUtilizados->count();
            $numerosBoletosUtilizados = $boletosUtilizados->pluck('nro_asiento');

            $viaje->total_asientos_disponibles = $vehiculo->capacidad - $countBoletosUtilizados;
            $viaje->total_asientos = $vehiculo->capacidad;
            $viaje->numeros_asientos_utilizados = $numerosBoletosUtilizados;
            $viaje->asientos_disponibles = $asientosDisponibles;
            return $viaje;
        });

        return response()->json($viajes);
    }
}
