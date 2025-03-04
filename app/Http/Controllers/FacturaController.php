<?php

namespace App\Http\Controllers;

use App\Models\Boleto;
use App\Models\Usuario;
use Illuminate\Http\Request;

class FacturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('facturas.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // $id is user_id|boleto_id1,boleto_id2,boleto_id3.....

        $user_id = explode('|', $id)[0];
        $boleto_ids = explode(',', explode('|', $id)[1]);

        // get boletos and user id info

        $boletos = Boleto::whereIn('id', $boleto_ids)->get();
        $user = Usuario::where('id', $user_id)->first();

        $total = 0;


        foreach ($boletos as $boleto) {
            $total += $boleto->precio;
        }


        $factura = [
            'id' => $id,
            'user_id' => $user_id,
            'boletos' => $boletos,

            'total' => $total,
        ];

        return view('pages.factura', data: compact('factura', 'user', 'boletos', 'total'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {}
}
