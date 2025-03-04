<!-- SHOW FACTURA -->
<!--
        $factura = [
            'id' => $id,
            'user_id' => $user_id,
            'boletos' => $boletos,

        ]; -->

@extends('layout.layoutDashboard')


@section('content')
<div class="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8" id="factura">
    <h1 class="font-bold text-2xl my-4 text-center text-blue-600">Transporte</h1>
    <hr class="mb-2">
    <div class="flex justify-between mb-6">
        <h1 class="text-lg font-bold">Factura</h1>
        <div class="text-gray-700">
            <div>Fecha: {{ \Carbon\Carbon::now()->format('d/m/Y') }}</div>
            <div>Factura #: INV{{ $factura['id'] }}</div>
        </div>
    </div>
    <div class="mb-8">
        <h2 class="text-lg font-bold mb-4">Bill To:</h2>
        <div class="text-gray-700 mb-2">{{ $user->nombre }} {{ $user->apellidos }}</div>
        <div class="text-gray-700 mb-2">{{ $user->telefono }}</div>
        <div class="text-gray-700">{{ $user->correo }}</div>
    </div>
    <table class="w-full mb-8">
        <thead>
            <tr>
                <th class="text-left font-bold text-gray-700">Descripcion</th>
                <th class="text-right font-bold text-gray-700">Cantidad</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($factura['boletos'] as $boleto)
            <tr>
                <td class="text-left text-gray-700">Boleto #{{ $boleto->id }} (Asiento: {{ $boleto->nro_asiento }})</td>
                <td class="text-right text-gray-700">${{ number_format($boleto->precio, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td class="text-left font-bold text-gray-700">Total</td>
                <td class="text-right font-bold text-gray-700">Bs {{ number_format($total, 2) }}</td>
            </tr>
        </tfoot>
    </table>
    <div class="text-gray-700 mb-2">Gracias por tu compra!</div>
</div>

<button onclick="downloadPdf()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mx-auto mt-4">
    Descargar
</button>


<script>
    function downloadPdf() {
        var element = document.getElementById('factura');
        html2pdf(element)
    }
</script>
@endsection
