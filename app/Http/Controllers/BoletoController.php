<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Boleto;

class BoletoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boletos = Boleto::all();
        return view('boletos.index', compact('boletos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('boletos.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        Boleto::create($request->all());

        return redirect()->route('boletos.index')
            ->with('success', 'Boleto created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $boleto = Boleto::findOrFail($id);
        return view('boletos.show', compact('boleto'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $boleto = Boleto::findOrFail($id);
        return view('boletos.edit', compact('boleto'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        $boleto = Boleto::findOrFail($id);
        $boleto->update($request->all());

        return redirect()->route('boletos.index')
            ->with('success', 'Boleto updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $boleto = Boleto::findOrFail($id);
        $boleto->delete();

        return redirect()->route('boletos.index')
            ->with('success', 'Boleto deleted successfully.');
    }

    /**
     * Filter boletos based on the given criteria.
     */
    public function buscar(Request $request)
    {
        $query = Boleto::with(['ruta', 'vehiculo']);

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

        if ($request->has('ciudad')) {
            $query->whereHas('ruta', function ($q) use ($request) {
                $q->where('ciudad', $request->input('ciudad'));
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
            $boletosUtilizados = Boleto::where('ruta_id', $boleto->ruta_id)
                ->where('estado', 'Utilizado')
                ->count();
            $boleto->asientos_disponibles = $vehiculo->capacidad - $boletosUtilizados;
            return $boleto;
        });

        return response()->json($boletos);
    }
}
