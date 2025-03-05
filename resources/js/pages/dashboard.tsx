import ClientLayout from '@/layouts/client-layout';

import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Activity = {
    title: string;
    description: string;
    status: string;
    statusClass: string;
    date: string;
};

export default function Dashboard() {
    const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

    useEffect(() => {
        setRecentActivities([
            {
                title: 'Boleto reservado',
                description: 'Ciudad de México a Guadalajara - 28/03/2023',
                status: 'Confirmado',
                statusClass: 'bg-green-100 text-green-800',
                date: '2025-03-15T12:00:00',
            },
            {
                title: 'Paquete enviado',
                description: 'Envío #12345 - En tránsito',
                status: 'En progreso',
                statusClass: 'bg-yellow-100 text-yellow-800',
                date: '2023-03-16T08:30:00',
            },
            {
                title: 'Boleto cancelado',
                description: 'Monterrey a Tijuana - 15/03/2023',
                status: 'Cancelado',
                statusClass: 'bg-red-100 text-red-800',
                date: '2023-03-14T16:45:00',
            },
        ]);
    }, []);

    return (
        <ClientLayout>
            <Head title="Dashboard" />

            <>
                <div className="flex-grow">
                    <main>
                        {/* Header */}
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h1 className="mb-6 text-2xl font-semibold text-white">Bienvenido, Juan</h1>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Envío de Paquetes */}
                                    <div className="transform overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#037995]">
                                        <div className="p-6">
                                            <div className="mb-4 flex items-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#037995]">
                                                    {/* SVG */}
                                                </div>
                                                <h2 className="ml-4 text-xl font-semibold text-white">Envío de Paquetes</h2>
                                            </div>

                                            <p className="mb-6 text-gray-300">
                                                Envía paquetes a cualquier destino de manera rápida y segura. Seguimiento en tiempo real y
                                                notificaciones de estado.
                                            </p>

                                            <button className="flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]">
                                                <span className="mr-2">Enviar un Paquete</span>
                                                {/* SVG */}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Compra de Boletos */}
                                    <div className="transform overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#037995]">
                                        <div className="p-6">
                                            <div className="mb-4 flex items-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#037995]">
                                                    {/* SVG */}
                                                </div>
                                                <h2 className="ml-4 text-xl font-semibold text-white">Compra de Boletos</h2>
                                            </div>

                                            <p className="mb-6 text-gray-300">
                                                Reserva tus boletos para viajar a cualquier destino. Selección de asientos, pago en línea y
                                                confirmación inmediata.
                                            </p>

                                            <button className="flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]">
                                                <span className="mr-2">Comprar Boletos</span>
                                                {/* SVG */}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Actividad reciente */}
                                <div className="mt-8">
                                    <h2 className="mb-4 text-lg font-medium text-white">Actividad Reciente</h2>
                                    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                                        <ul className="divide-y divide-gray-700">
                                            {recentActivities.map((activity, index) => (
                                                <li key={index} className="px-6 py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="bg-opacity-20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#037995]">
                                                            {/* SVG */}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-medium text-white">{activity.title}</p>
                                                            <p className="truncate text-sm text-gray-400">{activity.description}</p>
                                                        </div>
                                                        <div>
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${activity.statusClass}`}
                                                            >
                                                                {activity.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        </ClientLayout>
    );
}
