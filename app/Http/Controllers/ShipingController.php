<?php

namespace App\Http\Controllers;

use App\Models\Encomienda;
use App\Models\Pago;
use App\Models\Ruta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ShipingController extends Controller
{
    public function index()
    {
        $allOrigins = Ruta::select('origen')->distinct()->get()->pluck('origen');
        $allDestinations = Ruta::select('destino')->distinct()->get()->pluck('destino');

        return Inertia::render('shipings/index', [
            'origins' => $allOrigins,
            'destinations' => $allDestinations,
        ]);
    }

    public function checkout()
    {
        return Inertia::render('shipings/checkout');
    }

    public function completarPago(Request $request)
    {
        try {
            $encomienda = Encomienda::create([
                'user_id' => $request->user_id,
                'descripcion' => $request->descripcion,
                'peso' => $request->peso,
                'tipo_paquete' => $request->tipo_paquete,
                'largo' => $request->largo,
                'ancho' => $request->ancho,
                'alto' => $request->alto,
                'origen' => $request->origen,
                'destino' => $request->destino,
                'codigo_rastreo' => $request->codigo_rastreo,
                'estado' => 'Registrada',
                'fecha_envio' => $request->fecha_envio,
                'fecha_entrega' => $request->fecha_entrega,
                'nombre_destinatario' => $request->nombre_destinatario,
                'telefono_destinatario' => $request->telefono_destinatario,
                'correo_destinatario' => $request->correo_destinatario,
            ]);


            $pago = Pago::create([
                'user_id' => $request->user_id,
                'monto' => $request->total,
                'fecha' => now(),
                'metodo' => $request->paymentMethod,
            ]);



            // Si la creación fue exitosa, redirigir a la página de confirmación
            return to_route('shipings.confirmation', [
                'id' => $encomienda->id,
            ]);
        } catch (\Throwable $th) {
            // Manejo de errores
            report($th);
            return back()->withError('Error al procesar el pago y la encomienda');
        }
    }

    public function confirmation(string $identifier)
    {

        $encomienda = Encomienda::findOrFail($identifier);
        // flter Ruta with encomeinda origen and destino

        $ruta = Ruta::where('origen', $encomienda->origen)
            ->where('destino', $encomienda->destino)
            ->first();

        if ($ruta == null) {
            $ruta = Ruta::where('origen', $encomienda->origen)->first();
        }

        if ($ruta == null) {
            $ruta = Ruta::where('destino', $encomienda->destino)->first();
        }

        $qrCode = QrCode::size(200)->generate($ruta->maps_url)->toHtml();

        return Inertia::render('shipings/confirmation', [
            'qrCode' => $qrCode,
            'identifier' => $identifier,
            'encomienda' => $encomienda,
            'url' => $ruta->maps_url,
        ]);
    }

    public function updateStatus(string $identifier)
    {
        $encomienda = Encomienda::findOrFail($identifier);
        $encomienda->estado = 'En Tránsito';

        $encomienda->save();

        return to_route('shipings.confirmation', [
            'id' => $encomienda->id,
        ]);
    }
}
