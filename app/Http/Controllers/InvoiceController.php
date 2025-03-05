<?php

namespace App\Http\Controllers;

use App\Models\Boleto;
use App\Models\User;
use App\Models\Viaje;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function show(string $id)
    {

        // $id is user_id|viaje_id|boleto_id1,boleto_id2,boleto_id3.....

        $user_id = explode('|', $id)[0];
        $viaje_id = explode('|', $id)[1];
        $boleto_ids = explode(',', explode('|', $id)[2]);

        // get boletos and user id info

        $boletos = Boleto::whereIn('id', $boleto_ids)->where('viaje_id', $viaje_id)->get();
        $user = User::where('id', $user_id)->first();
        $viaje = Viaje::where('id', $viaje_id)->first();

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

        return Inertia::render('invoice/index', [
            'id' => $id,
            'factura' => $factura,
            'user' => $user,
            'boletos' => $boletos,
            'total' => $total,
            'viaje' => $viaje,
        ]);
    }
}
