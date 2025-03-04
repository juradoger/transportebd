<?php

namespace App\Http\Controllers;

use App\Models\Boleto;
use App\Models\Pago;
use Illuminate\Http\Request;
use App\Models\DetalleCompra;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class DetalleCompraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $detallesCompra = DetalleCompra::all();
        return response()->json($detallesCompra);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'usuario_id' => 'required|exists:usuario,id',
                'boleto_ids' => 'required|array', // Aseguramos que boleto_ids sea un arreglo
                'boleto_ids.*' => 'exists:boleto,id', // Validamos que cada boleto_id exista
                'metodo' => 'required|string', // Validamos que el método de pago sea un string
            ]);

            $usuarioId = $request->input('usuario_id');
            $boletoIds = $request->input('boleto_ids');
            $metodo = $request->input('metodo');

            // Inicializamos el monto total
            $montoTotal = 0;

            // Recorremos los boletos seleccionados
            foreach ($boletoIds as $boletoId) {
                // Obtener el boleto
                $boleto = Boleto::findOrFail($boletoId);

                // Sumar el precio de cada boleto al total
                $montoTotal += $boleto->precio;

                // Cambiar el estado del boleto a 'Utilizado'
                $boleto->estado = 'Utilizado';
                $boleto->save();
            }

            // Crear el pago
            $pago = new Pago();
            $pago->usuario_id = $usuarioId;
            $pago->monto = $montoTotal;
            $pago->fecha = now();
            $pago->metodo = $metodo;
            $pago->save();

            // Crear los detalles de la compra
            foreach ($boletoIds as $boletoId) {
                // Crear un detalle de compra por cada boleto
                $detalleCompraData = [
                    'usuario_id' => $usuarioId,
                    'boleto_id' => $boletoId,
                    'cantidad' => 1, // Asumimos una cantidad de 1 por boleto
                    'fecha_compra' => now(),
                    'precio_total' => Boleto::findOrFail($boletoId)->precio,
                ];

                DetalleCompra::create($detalleCompraData);
            }

            $identifier = "$usuarioId|" . implode(',', $boletoIds);

            $qrCode = QrCode::size(300)->generate('http://localhost:8000/factura/' . $identifier)->toHtml();


            // Retornamos una respuesta con el estado de la compra
            return response()->json([
                'mensaje' => 'Compra realizada con éxito.',
                'identifier' => $identifier,
                'qrCode' => $qrCode
            ], 201);
        } catch (\Throwable $th) {
            // Manejar la excepción y retornar un mensaje de error
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $detalleCompra = DetalleCompra::findOrFail($id);
        return response()->json($detalleCompra);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuario,id',
            'boleto_id' => 'required|exists:boleto,id',
            'cantidad' => 'required|integer',
            'fecha_compra' => 'required|date',
            'precio_total' => 'required|numeric',
        ]);

        $detalleCompra = DetalleCompra::findOrFail($id);
        $detalleCompra->update($request->all());
        return response()->json($detalleCompra);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $detalleCompra = DetalleCompra::findOrFail($id);
        $detalleCompra->delete();
        return response()->json(null, 204);
    }
}
