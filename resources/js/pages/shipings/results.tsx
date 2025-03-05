import SelectedViajeInfo from '@/components/tickets/selected-viaje-info';
import ClientLayout from '@/layouts/client-layout';
import { useTicketStore } from '@/store/ticket-store';
import { ViajeResult } from '@/types/viaje';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

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

type Props = {
    viajes: ViajeResult[];
};

export default function TicketResultsPage(props: Props) {
    console.log('🚀 ~ TicketResultsPage ~ props:', props);
    const ticketStore = useTicketStore();

    const selectViaje = (viaje: ViajeResult) => {
        ticketStore.setSelectedViaje(viaje);
        ticketStore.generateSeats(viaje);
        router.visit(`/tickets/viaje/${viaje.id}/asientos`);
    };

    useEffect(() => {
        if (ticketStore.ticketForm.origin === '' || ticketStore.ticketForm.destination === '' || ticketStore.ticketForm.date === '') {
            const searchParams = new URLSearchParams(window.location.search);
            const origin = searchParams.get('origin') || '';
            const destination = searchParams.get('destination') || '';
            const date = searchParams.get('date') || '';

            if (origin === '' || destination === '' || date === '') {
                router.replace({
                    url: '/tickets',
                });
                return;
            }

            ticketStore.setTicketForm({
                origin,
                destination,
                date,
                passengers: 1,
            });
        }
    }, []);

    return (
        <ClientLayout>
            <Head title="Tickets" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-white">Compra de Boletos </h1>

                    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                        <div className="p-6">
                            <SelectedViajeInfo title="Viajes Disponibles" titleBack="Volver a la búsqueda" />

                            <div className="space-y-4">
                                {props.viajes.map((viaje) => (
                                    <div
                                        key={viaje.id}
                                        className="cursor-pointer rounded-lg bg-gray-700 p-4 transition-colors duration-200 hover:bg-gray-600"
                                        onClick={() => selectViaje(viaje)}
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
                                                        <p className="text-sm font-medium text-white" x-text="route.duration">
                                                            {viaje.ruta.duracion}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">Asientos</p>
                                                        <p className="text-sm font-medium text-white" x-text="route.seats + ' disponibles'">
                                                            {viaje.total_asientos_disponibles}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">Clase</p>
                                                        <p className="text-sm font-medium text-white" x-text="route.class">
                                                            {viaje.ruta.clase}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex flex-col items-end md:mt-0">
                                                <p className="text-2xl font-bold text-white" x-text="'Bs. ' + route.price">
                                                    Bs. {viaje.precio}
                                                </p>
                                                <p className="text-sm text-gray-400">por persona</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
