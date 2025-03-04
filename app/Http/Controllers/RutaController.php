<?php

namespace App\Http\Controllers;

use App\Models\Boleto;
use App\Models\Ruta;
use Illuminate\Http\Request;

class RutaController extends Controller
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

    public function buscar(Request $request)
    {
        // Empezamos la consulta sobre la tabla 'Ruta', pero también obtenemos los boletos asociados
        $query = Ruta::query();

        // Filtro por 'origen' de la ruta
        if ($request->has('origen')) {
            $query->where('origen', $request->input('origen'));
        }

        // Filtro por 'destino' de la ruta
        if ($request->has('destino')) {
            $query->where('destino', $request->input('destino'));
        }

        // Si se filtra por 'fecha_viaje', lo haremos sobre la tabla 'Boleto', ya que la fecha está allí
        if ($request->has('fecha_viaje')) {
            $query->whereHas('boletos', function ($q) use ($request) {
                $q->whereDate('fecha_viaje', $request->input('fecha_viaje'));
            });
        }

        $rutas = $query->get()->map(function ($ruta) {
            // Aquí obtenemos los boletos relacionados con la ruta
            $boletosUtilizados = Boleto::where('ruta_id', $ruta->id)
                ->where('estado', 'Utilizado')
                ->count();

            // Ahora obtenemos los vehículos asociados a los boletos de esta ruta
            $vehiculo = Boleto::where('ruta_id', $ruta->id)->first()?->vehiculo;

            // Si encontramos un vehículo, calculamos los asientos disponibles
            if ($vehiculo) {
                $ruta->asientos_disponibles = $vehiculo->capacidad - $boletosUtilizados;
            } else {
                $ruta->asientos_disponibles = 0; // Si no hay vehículo asociado, asignamos 0 asientos disponibles
            }

            return $ruta;
        });

        return response()->json($rutas);
    }
}
