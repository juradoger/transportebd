<?php

namespace App\Http\Controllers;

use App\Models\Boleto;
use App\Models\DetalleCompra;
use App\Models\Pago;
use App\Models\Ruta;
use App\Models\Viaje;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(): Response
    {
        $allOrigins = Ruta::select('origen')->distinct()->get()->pluck('origen');
        $allDestinations = Ruta::select('destino')->distinct()->get()->pluck('destino');

        return Inertia::render('tickets/index', [
            'origins' => $allOrigins,
            'destinations' => $allDestinations,
        ]);
    }


    public function results(Request $request)
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

        return Inertia::render('tickets/results', [
            'viajes' => $viajes
        ]);
    }

    public function seats(string $id)
    {
        return Inertia::render('tickets/seats');
    }

    public function checkout()
    {
        return Inertia::render('tickets/checkout');
    }

    public function completarPago(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'viaje_id' => 'required|exists:viaje,id',
                'boleto_ids' => 'required|array', // Aseguramos que boleto_ids sea un arreglo
                'boleto_ids.*' => 'exists:boleto,id', // Validamos que cada boleto_id exista
                'metodo' => 'required|string', // Validamos que el método de pago sea un string
            ]);

            $userId = $request->input('user_id');
            $viajeId = $request->input('viaje_id');
            $boletoIds = $request->input('boleto_ids');
            $metodo = $request->input('metodo');

            // Inicializamos el monto total
            $montoTotal = 0;

            // Recorremos los boletos seleccionados
            foreach ($boletoIds as $boletoId) {
                // Obtener el boleto
                $boleto = Boleto::where('id', $boletoId)
                    ->where('viaje_id', $viajeId)
                    ->where('estado', 'Emitido')
                    ->firstOrFail();

                // Sumar el precio de cada boleto al total
                $montoTotal += $boleto->precio;

                // Cambiar el estado del boleto a 'Utilizado'
                $boleto->estado = 'Utilizado';
                $boleto->save();
            }

            // Crear el pago
            $pago = new Pago();
            $pago->user_id = $userId;
            $pago->monto = $montoTotal;
            $pago->fecha = now();
            $pago->metodo = $metodo;
            $pago->save();

            // Crear los detalles de la compra
            foreach ($boletoIds as $boletoId) {
                // Crear un detalle de compra por cada boleto
                $detalleCompraData = [
                    'user_id' => $userId,
                    'boleto_id' => $boletoId,
                    'cantidad' => 1, // Asumimos una cantidad de 1 por boleto
                    'fecha_compra' => now(),
                    'precio_total' => Boleto::findOrFail($boletoId)->precio,
                ];

                DetalleCompra::create($detalleCompraData);
            }

            $identifier = "$userId|$viajeId|" . implode(',', $boletoIds);



            return to_route('tickets.confirmation', [
                'id' => $identifier
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function confirmation(string $identifier)
    {
        $ids = explode('|', $identifier);
        $userId = $ids[0];
        $viajeId = $ids[1];
        $boletoIds = explode(',', $ids[2]);

        $boletos = Boleto::whereIn('id', $boletoIds)->get();
        $viaje = Viaje::with(['ruta', 'vehiculo'])->findOrFail($viajeId);
        $pago = Pago::where('user_id', $userId)->latest()->first();

        $qrCode = QrCode::size(200)->generate($identifier)->toHtml();

        return Inertia::render('tickets/confirmation', [
            'boletos' => $boletos,
            'pago' => $pago,
            'viaje' => $viaje,
            'qrCode' => $qrCode,
            'identifier' => $identifier
        ]);
    }
}
