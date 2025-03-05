import { Button } from '@/components/ui/button';
import ClientLayout from '@/layouts/client-layout';
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import html2canvas from 'html2canvas-pro';

export default function TicketsConfirmationPage(props: any) {
    console.log('🚀 ~ TicketsConfirmationPage ~ props:', props);

    const downloadTicket = () => {
        const qrElement = document.getElementById('ticketQr') as HTMLElement;

        html2canvas(qrElement).then((canvas) => {
            // Convertir el canvas a una URL de imagen en formato PNG
            const imageUrl = canvas.toDataURL('image/png');

            // Crear un enlace temporal para la descarga
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'qr-code.png'; // Nombre del archivo descargado

            // Disparar el clic en el enlace para iniciar la descarga
            link.click();
        });
    };

    const goToDashboard = () => {
        // Lógica para ir al inicio o dashboard
        console.log('Volver al inicio...');
    };

    const verify = () => {
        // open new window in props.maps_url
        router.visit(`/shipings/updateStatus/${props.encomienda.id}`);

        window.open(props.url, '_blank');
    };

    return (
        <ClientLayout>
            <Head title="Confirmacion" />

            <div className="py-6 text-center">
                <div className="mx-auto mt-36 mb-6 max-w-md rounded-lg bg-gray-700 p-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Código de Seguimiento</h3>

                    <div className="mb-10 space-y-4">
                        <div className="mx-auto h-40 w-40 rounded-lg bg-white p-2" id="ticketQr">
                            <div className="[&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: props.qrCode }}></div>
                        </div>

                        <p id="identifier" className="text-lg font-bold">
                            TICKET {props.identifier}
                        </p>

                        <p>Código de Seguimiento</p>

                        <Button onClick={verify}>Verificar</Button>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-md mb-2 font-medium text-white">Estado del Envío</h3>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="h-0.5 w-full bg-gray-600"></div>
                            </div>
                            <div className="relative flex justify-between">
                                <div>
                                    {/* Registrada
En Tránsito
Entregada
Cancelada */}
                                    <div
                                        className={cn([
                                            'flex h-4 w-4 items-center justify-center rounded-full',
                                            props.encomienda.estado === 'Registrada' ? 'bg-[#037995]' : 'bg-gray-600',
                                        ])}
                                    ></div>
                                    <div className="mt-1 text-xs text-gray-400">Registrado</div>
                                </div>
                                <div>
                                    <div
                                        className={cn([
                                            'flex h-4 w-4 items-center justify-center rounded-full',
                                            props.encomienda.estado === 'En Tránsito' ? 'bg-[#037995]' : 'bg-gray-600',
                                        ])}
                                    ></div>
                                    <div className="mt-1 text-xs text-gray-400">En tránsito</div>
                                </div>
                                <div>
                                    <div
                                        className={cn([
                                            'flex h-4 w-4 items-center justify-center rounded-full',
                                            props.encomienda.estado === 'Entregada' ? 'bg-[#037995]' : 'bg-gray-600',
                                        ])}
                                    ></div>
                                    <div className="mt-1 text-xs text-gray-400">Entregada</div>
                                </div>
                                <div>
                                    <div
                                        className={cn([
                                            'flex h-4 w-4 items-center justify-center rounded-full',
                                            props.encomienda.estado === 'Cancelada' ? 'bg-[#037995]' : 'bg-gray-600',
                                        ])}
                                    ></div>
                                    <div className="mt-1 text-xs text-gray-400">Cancelada</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        {/*   <div className="flex justify-between">
                            <span className="text-gray-300">Ruta:</span>
                            <span className="text-white">
                                {props.viaje.ruta.origen} - {props.viaje.ruta.destino}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-300">Fecha:</span>
                            <span className="text-white">{props.viaje.fecha_salida}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-300">Hora:</span>
                            <span className="text-white">{new Date(props.viaje.fecha_salida).toLocaleTimeString()}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-300">Asientos:</span>
                            <span className="text-white">{props.boletos.map((x: any) => x.nro_asiento).join(', ')}</span>
                        </div> */}
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={downloadTicket}
                        className="flex items-center justify-center rounded-lg bg-[#037995] px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Descargar
                    </button>

                    <button
                        onClick={goToDashboard}
                        className="flex items-center justify-center rounded-lg bg-gray-700 px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:bg-gray-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Volver al Inicio
                    </button>
                </div>
            </div>
        </ClientLayout>
    );
}
