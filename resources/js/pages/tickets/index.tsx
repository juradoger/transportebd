import ClientLayout from '@/layouts/client-layout';

import { useTicketStore } from '@/store/ticket-store';
import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';

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
    origins: string[];
    destinations: string[];
};

export default function TicketPage(props: Props) {
    console.log('🚀 ~ TicketPage ~ props:', props);
    const { ticketForm, setTicketForm } = useTicketStore();

    const searchRoutes = () => {
        const params = new URLSearchParams({
            origin: ticketForm.origin,
            destination: ticketForm.destination,
            date: ticketForm.date,
            passengers: ticketForm.passengers.toString(),
        });

        router.visit(`/tickets/results?${params.toString()}`);
    };

    return (
        <ClientLayout>
            <Head title="Tickets" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-white">Compra de Boletos </h1>

                    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                        <div className="p-6">
                            <h2 className="mb-4 text-lg font-medium text-white">Buscar Rutas</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Origen</label>
                                        <select
                                            value={ticketForm.origin}
                                            onChange={(e) => setTicketForm({ ...ticketForm, origin: e.target.value })}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        >
                                            <option value="">Seleccionar ciudad</option>

                                            {props.origins.map((origin) => (
                                                <option key={origin} value={origin}>
                                                    {origin}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Destino</label>
                                        <select
                                            value={ticketForm.destination}
                                            onChange={(e) => setTicketForm({ ...ticketForm, destination: e.target.value })}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        >
                                            <option value="">Seleccionar ciudad</option>

                                            {props.destinations.map((destionation) => (
                                                <option key={destionation} value={destionation}>
                                                    {destionation}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Viaje</label>
                                        <input
                                            type="date"
                                            value={ticketForm.date}
                                            onChange={(e) => setTicketForm({ ...ticketForm, date: e.target.value })}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Pasajeros</label>
                                        <select
                                            value={ticketForm.passengers}
                                            onChange={(e) => setTicketForm({ ...ticketForm, passengers: +e.target.value })}
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
                                        <Search />
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
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
