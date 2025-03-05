import SelectedViajeInfo from '@/components/tickets/selected-viaje-info';
import SummaryViaje from '@/components/tickets/summary-viaje';
import { Button } from '@/components/ui/button';
import ClientLayout from '@/layouts/client-layout';
import { useTicketStore } from '@/store/ticket-store';

import { Head, router } from '@inertiajs/react';
import { Bed, Usb, Wind } from 'lucide-react';
import { useEffect } from 'react';

export default function TicketSeatsPage() {
    const { ticketForm, seats, selectedSeats, selectSeat, unselectSeat, selectedViaje, totalPassengers } = useTicketStore();

    const proceedToPayment = () => {
        router.visit('/tickets/checkout');
    };

    const getSeatColor = (seat: any) => {
        switch (seat.status) {
            case 'available':
                return 'bg-gray-500';
            case 'selected':
                return 'bg-[#037995]';
            case 'occupied':
                return 'bg-gray-800';
            default:
                return 'bg-gray-500';
        }
    };

    useEffect(() => {
        if (!seats.length) {
            router.visit('/tickets', {
                replace: true,
            });
        }
    }, [seats.length]);

    return (
        <ClientLayout>
            <Head title="Tickets" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-white">Compra de Boletos</h1>

                    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                        <div className="p-6">
                            <div className="py-4">
                                <SelectedViajeInfo title="Selección de Asientos" titleBack="Volver a los viajes" />

                                <div className="flex flex-col gap-6 md:flex-row">
                                    {/* Mapa de asientos (ahora más grande) */}
                                    <div className="w-full rounded-lg bg-gray-700 p-4 md:w-1/2">
                                        <h3 className="text-md mb-4 text-center font-medium text-white">Seleccione sus asientos</h3>
                                        <div className="mb-4 flex justify-center">
                                            <div className="flex flex-wrap justify-center gap-4">
                                                <div className="flex items-center">
                                                    <div className="mr-2 h-4 w-4 rounded-sm bg-gray-500" />
                                                    <span className="text-xs text-gray-300">Disponible</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="mr-2 h-4 w-4 rounded-sm bg-[#037995]" />
                                                    <span className="text-xs text-gray-300">Seleccionado</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="mr-2 h-4 w-4 rounded-sm bg-gray-800" />
                                                    <span className="text-xs text-gray-300">Ocupado</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Autobús mejorado */}
                                        <div className="relative mx-auto mb-4 max-w-md rounded-t-3xl border-2 border-gray-600 bg-gray-800">
                                            {/* Parte frontal del autobús */}
                                            <div className="flex h-12 items-center justify-center rounded-t-3xl border-b border-gray-600 bg-gray-700">
                                                <div className="h-6 w-16 rounded-md bg-gray-500" />
                                            </div>
                                            {/* Conductor */}
                                            <div className="absolute top-3 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-white"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx={12} cy={7} r={4} />
                                                </svg>
                                            </div>
                                            {/* Pasillo central */}
                                            <div className="flex h-full w-full p-4">
                                                {/* Asientos lado izquierdo */}
                                                <div className="grid w-1/2 grid-cols-2 gap-2">
                                                    {seats.slice(0, seats.length / 2).map((seat) => (
                                                        <div
                                                            key={seat.id}
                                                            onClick={() => selectSeat(seat)}
                                                            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded ${getSeatColor(seat)} ${seat.status === 'occupied' ? 'cursor-not-allowed opacity-50' : ''} `}
                                                        >
                                                            {seat.id}
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Pasillo (espacio) */}
                                                <div className="mx-1 w-4 rounded-md bg-gray-700" />
                                                {/* Asientos lado derecho */}
                                                <div className="grid w-1/2 grid-cols-2 gap-2">
                                                    {seats.slice(seats.length / 2).map((seat) => (
                                                        <div
                                                            key={seat.id}
                                                            onClick={() => selectSeat(seat)}
                                                            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded ${getSeatColor(seat)} ${seat.status === 'occupied' ? 'cursor-not-allowed opacity-50' : ''} `}
                                                        >
                                                            {seat.id}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Parte trasera del autobús */}
                                            <div className="h-6 border-t border-gray-600 bg-gray-700" />
                                        </div>
                                        <div className="mt-4 text-center text-sm text-gray-300">
                                            <p>
                                                Asientos seleccionados: <span>{selectedSeats.length ?? 'Ninguno'}</span>
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Seleccione <span>{ticketForm.passengers}</span> asiento(s)
                                            </p>
                                        </div>
                                    </div>
                                    {/* Detalles de asientos y resumen de compra */}
                                    <div className="flex w-full flex-col gap-4 md:w-1/2">
                                        {/* Detalles de asientos seleccionados */}
                                        <div className="rounded-lg bg-gray-700 p-4">
                                            <h3 className="text-md mb-4 font-medium text-white">Detalles de Asientos</h3>
                                            {selectedSeats.length === 0 && (
                                                <div className="py-6 text-center text-gray-400">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="mx-auto mb-2 h-12 w-12 text-gray-500"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <rect x={2} y={6} width={20} height={12} rx={2} ry={2} />
                                                        <path d="M6 12h12" />
                                                    </svg>
                                                    <p>Seleccione asientos para ver sus detalles</p>
                                                </div>
                                            )}
                                            <div className="space-y-4">
                                                {selectedSeats.map((seatId, index) => (
                                                    <div key={seatId} className="rounded-lg bg-gray-700 p-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="mr-3 rounded bg-[#037995] px-3 py-1 text-white">{seatId}</div>
                                                                <span>Asiento {seatId}</span>
                                                            </div>
                                                            <button onClick={() => unselectSeat(seatId)} className="text-gray-400 hover:text-white">
                                                                ✕
                                                            </button>
                                                        </div>
                                                        <div className="mt-2 flex gap-2">
                                                            <span className="inline-flex items-center rounded-full bg-gray-800 px-2 py-1 text-xs">
                                                                <Bed className="mr-1 h-3 w-3" /> Reclinable
                                                            </span>
                                                            <span className="inline-flex items-center rounded-full bg-gray-800 px-2 py-1 text-xs">
                                                                <Usb className="mr-1 h-3 w-3" /> USB
                                                            </span>
                                                            <span className="inline-flex items-center rounded-full bg-gray-800 px-2 py-1 text-xs">
                                                                <Wind className="mr-1 h-3 w-3" /> Aire
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Resumen de compra */}
                                        <div className="rounded-lg bg-gray-700 p-4">
                                            <SummaryViaje selectedSeats={selectedSeats} selectedViaje={selectedViaje} ticketForm={ticketForm} />

                                            <div className="mt-3 flex justify-between text-lg font-bold">
                                                <span className="text-gray-300">Total:</span>
                                                <span className="text-white">
                                                    {/* @ts-expect-error nose */}
                                                    Bs. {((selectedViaje?.precio / 2) * ticketForm.passengers * 1.16).toFixed(2)}
                                                </span>
                                            </div>

                                            <Button onClick={proceedToPayment} className="w-full" disabled={selectedSeats.length === 0}>
                                                <span className="mr-2">Proceder al Pago</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                                                    <line x1={1} y1={10} x2={23} y2={10} />
                                                </svg>
                                            </Button>

                                            {selectedSeats.length === 0 && (
                                                <div className="mt-2 text-center text-sm text-red-400">
                                                    Por favor seleccione <span x-text="ticketForm.passengers" /> asiento(s)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
