import PaymentForm from '@/components/payment-form';
import SummaryShip from '@/components/shiping/summary-ship';
import SelectedViajeInfo from '@/components/tickets/selected-viaje-info';
import ClientLayout from '@/layouts/client-layout';
import { useShipingStore } from '@/store/shiping-store';
import { SharedData } from '@/types';

import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface PaymentForm {
    method: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
    paypalEmail: string;
    reference: string;
    terms: boolean;
}

interface TicketForm {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
}

interface Route {
    time: string;
    duration?: string;
    type?: string;
    seats?: number;
    price: number;
    class?: string;
    viaje?: any;
}

interface Seat {
    id: number;
    status: 'available' | 'occupied' | 'selected';
    boleto_id: string | null;
}

export default function TicketsCheckOutPage() {
    const { getTotal, packageForm } = useShipingStore();

    const { auth } = usePage<SharedData>().props;

    const getPackageTypeName = (type: string): string => {
        const types: { [key: string]: string } = {
            document: 'Documento',
            small: 'Paquete Pequeño',
            medium: 'Paquete Mediano',
            large: 'Paquete Grande',
            special: 'Carga Especial',
        };

        return types[type] || type;
    };

    const completePayment = async (method: string) => {
        const payload = {
            descripcion: packageForm.description,
            peso: packageForm.weight,
            tipo_paquete: getPackageTypeName(packageForm.type),
            largo: packageForm.length,
            ancho: packageForm.width,
            alto: packageForm.height,
            origen: packageForm.origin,
            destino: packageForm.destination,
            codigo_rastreo: `TRK-${Math.floor(Math.random() * 1000000)}`,
            estado: 'Registrada',
            fecha_envio: packageForm.fechaEnvio,
            fecha_entrega: packageForm.fechaEntrega,
            user_id: auth.user.id,
            nombre_destinatario: packageForm.recipientName,
            telefono_destinatario: packageForm.recipientPhone,
            correo_destinatario: packageForm.recipientEmail,
            paymentMethod: method,
            total: getTotal(),
        };

        try {
            router.visit('/shipings/completarPago', {
                method: 'post',
                data: payload,
                onError: (e) => {
                    console.log('🚀 ~ completePayment ~ e:', e);
                },
            });
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert('Ocurrió un error al procesar el pago. Por favor intenta de nuevo.');
        }
    };

    useEffect(() => {
        if (!packageForm.origin || !packageForm.destination) {
            router.visit('/shipings', {
                replace: true,
            });
        }
    }, [packageForm.origin, packageForm.destination]);

    return (
        <ClientLayout>
            <Head title="Tickets" />

            <div className="min-h-screen bg-gray-900 p-6 text-white">
                {/* Interfaz de pago */}
                <div>
                    <SelectedViajeInfo title="Método de Pago" titleBack="Volver" showDestination={false} />

                    <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
                        {/* Formulario de pago */}
                        <PaymentForm onCompletePayment={completePayment} />

                        {/* Resumen de compra */}
                        <div className="rounded-lg bg-gray-700 p-4">
                            <h3 className="text-md mb-4 font-medium text-white">Resumen de Compra</h3>

                            <div className="space-y-3">
                                <div>
                                    <SummaryShip packageForm={packageForm} totalCost={getTotal()} />
                                </div>

                                <div className="my-3 border-t border-gray-600 pt-3">
                                    <div className="mt-3 flex justify-between text-lg font-bold">
                                        <span className="text-gray-300">Total a Pagar:</span>
                                        <span className="text-white">Bs. {getTotal()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 rounded-lg bg-gray-800 p-4">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-5 w-5 text-[#037995]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                    <span className="text-sm text-gray-300">Pago 100% seguro con encriptación SSL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
