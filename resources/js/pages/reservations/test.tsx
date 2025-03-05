import ClientLayout from '@/layouts/client-layout';
import { useState } from 'react';

import { useCounter } from '@/store/counter-store';
import { Head } from '@inertiajs/react';

export type PaymentMethod = 'card' | 'paypal' | 'transfer' | 'cash';

export interface TicketFormData {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
}

export interface Route {
    time: string;
    duration: string;
    type: string;
    seats: number;
    price: number;
    class: string;
    viaje: any; // Replace with more specific type if possible
}

export interface Seat {
    id: number;
    status: 'available' | 'selected' | 'occupied';
    boleto_id: number | null;
}

export interface PackageFormData {
    type: 'document' | 'small' | 'medium' | 'large' | 'special';
    weight: number;
    length: number;
    width: number;
    height: number;
    value: number;
    description: string;
    origin: string;
    destination: string;
    recipientName: string;
    recipientPhone: string;
    recipientEmail: string;
}

export interface PaymentFormData {
    method: PaymentMethod;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    cardName?: string;
    paypalEmail?: string;
    reference?: string;
    terms: boolean;
}

export default function TicketPage() {
    const counterStore = useCounter();

    const [ticketStep, setTicketStep] = useState('search');
    const [ticketForm, setTicketForm] = useState({
        origin: '',
        destination: '',
        date: '',
        passengers: '1',
    });
    const [availableRoutes, setAvailableRoutes] = useState([
        {
            time: '08:00 AM',
            type: 'Directo',
            duration: '4h 30m',
            seats: 25,
            class: 'Ejecutivo',
            price: 150,
        },
        {
            time: '11:30 AM',
            type: 'Con paradas',
            duration: '5h 15m',
            seats: 15,
            class: 'Económico',
            price: 100,
        },
    ]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([
        { id: 'A1', status: 'available' },
        { id: 'A2', status: 'available' },
        { id: 'B1', status: 'occupied' },
        // ... more seats
    ]);

    const searchRoutes = () => {
        // Logic to search routes based on form data
        setTicketStep('results');
    };

    const selectRoute = (route) => {
        setSelectedRoute(route);
        setTicketStep('seats');
    };

    const selectSeat = (seat) => {
        if (seat.status === 'available') {
            const updatedSeats = seats.map((s) => (s.id === seat.id ? { ...s, status: s.status === 'selected' ? 'available' : 'selected' } : s));
            setSeats(updatedSeats);

            const selectedSeatIds = updatedSeats.filter((s) => s.status === 'selected').map((s) => s.id);
            setSelectedSeats(selectedSeatIds);
        }
    };

    const formatDate = (dateString) => {
        // Basic date formatting
        return new Date(dateString).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
    };

    const proceedToPayment = () => {
        setTicketStep('payment');
    };

    const renderSearchStep = () => (
        <div>
            <h2 className="mb-4 text-lg font-medium text-white">Buscar Rutas</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-300">Origen</label>
                        <select
                            x-model="ticketForm.origin"
                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                        >
                            <option value="">Seleccionar ciudad</option>
                            <option>Santa Cruz</option>
                            <option>La Paz</option>
                            <option>Potosi</option>
                            <option>Sucre</option>
                            <option>Cochabamba</option>
                            <option>Tarija</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-300">Destino</label>
                        <select
                            x-model="ticketForm.destination"
                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                        >
                            <option value="">Seleccionar ciudad</option>
                            <option>Ciudad de México</option>
                            <option>Guadalajara</option>
                            <option>Monterrey</option>
                            <option>Puebla</option>
                            <option>Tijuana</option>
                            <option>Bermejo</option>
                            <option>Yacuiba</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Viaje</label>
                        <input
                            type="date"
                            x-model="ticketForm.date"
                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-300">Pasajeros</label>
                        <select
                            x-model="ticketForm.passengers"
                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button
                        onClick={searchRoutes}
                        className="flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                    >
                        <span className="mr-2">Buscar Rutas</span>
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
                            <circle cx={11} cy={11} r={8} />
                            <line x1={21} y1={21} x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </div>
                <div className="hidden md:block">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BUSROUTES"
                        alt="Bus Routes"
                        className="h-auto w-full rounded-lg opacity-20"
                    />
                </div>
            </div>
        </div>
    );

    const renderRoutesStep = () => (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Rutas Disponibles</h2>
                <button onclick="ticketStep = 'search'" className="flex items-center text-sm text-[#037995] hover:underline">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Volver a la búsqueda
                </button>
            </div>
            <div className="mb-4 text-white">
                <span className="font-medium" x-text="ticketForm.origin" /> a <span className="font-medium" x-text="ticketForm.destination" /> -{' '}
                <span x-text="formatDate(ticketForm.date)" />
            </div>
            <div className="space-y-4">
                &lt;&gt;
                <div
                    className="cursor-pointer rounded-lg bg-gray-700 p-4 transition-colors duration-200 hover:bg-gray-600"
                    onClick={() => selectRoute({})}
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#037995]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-white" x-text="route.time" />
                                    <p className="text-sm text-gray-300" x-text="route.type" />
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Duración</p>
                                    <p className="text-sm font-medium text-white" x-text="route.duration" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Asientos</p>
                                    <p className="text-sm font-medium text-white" x-text="route.seats + ' disponibles'" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Clase</p>
                                    <p className="text-sm font-medium text-white" x-text="route.class" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col items-end md:mt-0">
                            <p className="text-2xl font-bold text-white" x-text="'Bs. ' + route.price" />
                            <p className="text-sm text-gray-400">por persona</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSeatsStep = () => (
        <div className="py-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Selección de Asientos</h2>
                <button onclick="ticketStep = 'results'" className="flex items-center text-sm text-[#037995] hover:underline">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Volver a las rutas
                </button>
            </div>
            <div className="mb-4 text-white">
                <div>
                    <span className="font-medium" x-text="ticketForm.origin" /> a <span className="font-medium" x-text="ticketForm.destination" />
                </div>
                <div className="text-sm text-gray-300">
                    <span x-text="formatDate(ticketForm.date)" /> - <span x-text="selectedRoute.time" /> - <span x-text="selectedRoute.duration" />
                </div>
            </div>
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
                                &lt;&gt;
                                <div
                                    onclick="selectSeat(seat)"
                                    mouseenter="seat.status !== 'occupied' && (hoveredSeat = seat)"
                                    mouseleave="hoveredSeat = null"
                                >
                                    <span x-text="seat.id" />
                                </div>
                            </div>
                            {/* Pasillo (espacio) */}
                            <div className="mx-1 w-4 rounded-md bg-gray-700" />
                            {/* Asientos lado derecho */}
                            <div className="grid w-1/2 grid-cols-2 gap-2">
                                &lt;&gt;
                                <div
                                    onclick="selectSeat(seat)"
                                    mouseenter="seat.status !== 'occupied' && (hoveredSeat = seat)"
                                    mouseleave="hoveredSeat = null"
                                >
                                    <span x-text="seat.id" />
                                </div>
                            </div>
                        </div>
                        {/* Parte trasera del autobús */}
                        <div className="h-6 border-t border-gray-600 bg-gray-700" />
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-300">
                        <p>
                            Asientos seleccionados: <span x-text="selectedSeats.join(', ') || 'Ninguno'" />
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            Seleccione <span x-text="ticketForm.passengers" /> asiento(s)
                        </p>
                    </div>
                </div>
                {/* Detalles de asientos y resumen de compra */}
                <div className="flex w-full flex-col gap-4 md:w-1/2">
                    {/* Detalles de asientos seleccionados */}
                    <div className="rounded-lg bg-gray-700 p-4">
                        <h3 className="text-md mb-4 font-medium text-white">Detalles de Asientos</h3>
                        <div x-show="selectedSeats.length === 0" className="py-6 text-center text-gray-400">
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
                        <div x-show="selectedSeats.length > 0" className="space-y-4">
                            &lt;&gt;
                            <div className="rounded-lg border border-gray-600 bg-gray-800 p-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-[#037995] font-bold text-white">
                                            <span x-text="seatId" />
                                        </div>
                                        <span className="font-medium text-white">
                                            Asiento <span x-text="seatId" />
                                        </span>
                                    </div>
                                    <button onclick="unselectSeat(seatId)" className="text-gray-400 hover:text-white" title="Quitar selección">
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
                                            <circle cx={12} cy={12} r={10} />
                                            <line x1={15} y1={9} x2={9} y2={15} />
                                            <line x1={9} y1={9} x2={15} y2={15} />
                                        </svg>
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-400">Tipo:</span>
                                        <span className="text-white" x-text="getSeatType(seatId)" />
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Ubicación:</span>
                                        <span className="text-white" x-text="getSeatLocation(seatId)" />
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Pasajero:</span>
                                        <span className="text-white" x-text="'Pasajero ' + (index + 1)" />
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Precio:</span>
                                        <span className="text-white" x-text="'$' + selectedRoute.price" />
                                    </div>
                                </div>
                                {/* Características del asiento */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-1 h-3 w-3"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                            <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
                                        </svg>
                                        Reclinable
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-1 h-3 w-3"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="M12 5v14" />
                                        </svg>
                                        USB
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-1 h-3 w-3"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                                            <line x1={6} y1={1} x2={6} y2={4} />
                                            <line x1={10} y1={1} x2={10} y2={4} />
                                            <line x1={14} y1={1} x2={14} y2={4} />
                                        </svg>
                                        Aire
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Resumen de compra */}
                    <div className="rounded-lg bg-gray-700 p-4">
                        <h3 className="text-md mb-4 font-medium text-white">Resumen de Compra</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Ruta:</span>
                                <span className="text-white" x-text="ticketForm.origin + ' - ' + ticketForm.destination" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Fecha:</span>
                                <span className="text-white" x-text="formatDate(ticketForm.date)" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Hora:</span>
                                <span className="text-white" x-text="selectedRoute.time" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Clase:</span>
                                <span className="text-white" x-text="selectedRoute.class" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Asientos:</span>
                                <span className="text-white" x-text="selectedSeats.join(', ') || 'Ninguno'" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Pasajeros:</span>
                                <span className="text-white" x-text="ticketForm.passengers" />
                            </div>
                            <div className="my-3 border-t border-gray-600 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Precio por boleto:</span>
                                    <span className="text-white" x-text="'Bs.' + selectedRoute.price" />
                                </div>
                                <div className="mt-1 flex justify-between">
                                    <span className="text-gray-300">Subtotal:</span>
                                    <span className="text-white" x-text="'Bs.' + (selectedRoute.price * ticketForm.passengers).toFixed(2)" />
                                </div>
                                <div className="mt-1 flex justify-between">
                                    <span className="text-gray-300">Impuestos:</span>
                                    <span className="text-white" x-text="'Bs.' + (selectedRoute.price * ticketForm.passengers * 0.16).toFixed(2)" />
                                </div>
                                <div className="mt-3 flex justify-between text-lg font-bold">
                                    <span className="text-gray-300">Total:</span>
                                    <span className="text-white" x-text="'Bs.' + (selectedRoute.price * ticketForm.passengers * 1.16).toFixed(2)" />
                                </div>
                            </div>
                        </div>
                        <button onClick={proceedToPayment}>
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
                        </button>
                        <div x-show="selectedSeats.length < ticketForm.passengers" className="mt-2 text-center text-sm text-red-400">
                            Por favor seleccione <span x-text="ticketForm.passengers" /> asiento(s)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPaymentStep = () => <div></div>;

    const renderConfirmationStep = () => (
        <div x-show="ticketStep === 'confirmation'">
            <div className="py-6 text-center">
                <div className="bg-opacity-20 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#037995]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#037995]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">¡Pago Completado con Éxito!</h2>
                <p className="mb-6 text-gray-300">Tu reserva ha sido confirmada. Recibirás un correo electrónico con los detalles.</p>
                <div className="mx-auto mb-6 max-w-md rounded-lg bg-gray-700 p-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Código de Confirmación</h3>
                    <div className="mx-auto mb-2 h-40 w-40 rounded-lg bg-white p-2" id="ticketQr"></div>
                    <p id="identifier" className="mb-4 text-lg font-bold text-[#037995]">
                        TICKET12345678
                    </p>
                    <div className="space-y-2 text-left">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Ruta:</span>
                            <span className="text-white" x-text="ticketForm.origin + ' - ' + ticketForm.destination" />
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Fecha:</span>
                            <span className="text-white" x-text="formatDate(ticketForm.date)" />
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Hora:</span>
                            <span className="text-white" x-text="selectedRoute.time" />
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Asientos:</span>
                            <span className="text-white" x-text="selectedSeats.join(', ')" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button
                        onclick="downloadTicket"
                        className="flex items-center justify-center rounded-lg bg-[#037995] px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1={12} y1={15} x2={12} y2={3} />
                        </svg>
                        Descargar Factura
                    </button>
                    <button
                        onclick="activeTab = 'dashboard'"
                        className="flex items-center justify-center rounded-lg bg-gray-700 px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:bg-gray-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <ClientLayout>
            <Head title="Tickets" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-white">Reserva de Boletos {counterStore.bears}</h1>
                    <button onClick={counterStore.increasePopulation}>Incrementar</button> {/* Hook up the increment function */}
                    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                        <div className="p-6">
                            {/* Búsqueda de rutas */}
                            {ticketStep === 'search' && renderSearchStep()}
                            {ticketStep === 'results' && renderRoutesStep()}
                            {ticketStep === 'seats' && renderSeatsStep()}
                            {ticketStep === 'payment' && renderPaymentStep()}
                            {ticketStep === 'confirmation' && renderConfirmationStep()}
                            {/* Resultados de búsqueda */}

                            {/* Reemplaza la sección de selección de asientos existente con este código mejorado */}

                            {/* Selección de asientos */}

                            {/* Interfaz de pago */}

                            {/* Confirmación */}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
