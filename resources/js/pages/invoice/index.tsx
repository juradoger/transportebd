import ClientLayout from '@/layouts/client-layout';

import { Head } from '@inertiajs/react';

export default function InvoicePage(props: any) {
    const { viaje, id, user, boletos, total } = props;
    const download = () => {
        const element = document.getElementById('factura');

        window?.html2pdf(element);
    };

    return (
        <ClientLayout>
            <Head title="Factura" />

            <>
                <div className="mx-auto mt-16 max-w-md rounded-lg border bg-white px-6 py-8 shadow-lg" id="factura">
                    <h1 className="my-4 text-center text-2xl font-bold text-blue-600">Transporte</h1>
                    <hr className="mb-2" />
                    <div className="mb-6 flex justify-between">
                        <h1 className="text-lg font-bold">Factura</h1>
                        <div className="text-gray-700">
                            <div>Fecha: {viaje?.fecha_salida}</div>
                            <div>Factura #: {id}</div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="mb-4 text-lg font-bold">Cliente:</h2>
                        <div className="mb-2 text-gray-700">
                            {user?.name} {user?.last_name}
                        </div>
                        <div className="mb-2 text-gray-700">{user?.phone}</div>
                        <div className="text-gray-700">{user?.email}</div>
                    </div>

                    <table className="mb-8 w-full">
                        <thead>
                            <tr>
                                <th className="text-left font-bold text-gray-700">Descripcion</th>
                                <th className="text-right font-bold text-gray-700">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapear los boletos */}
                            {boletos?.map((boleto: any) => (
                                <tr key={boleto.id}>
                                    <td className="text-left text-gray-700">
                                        Boleto #{boleto.id} (Asiento: {boleto.nro_asiento})
                                    </td>
                                    <td className="text-right text-gray-700">${Number(boleto.precio).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="text-left font-bold text-gray-700">Total</td>
                                <td className="text-right font-bold text-gray-700">Bs {total?.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="mb-2 text-gray-700">Gracias por tu compra!</div>
                </div>

                <div className="text-center">
                    <button onClick={download} className="mx-auto mt-4 w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                        Descargar
                    </button>
                </div>
            </>
        </ClientLayout>
    );
}
