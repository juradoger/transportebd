import SummaryShip from '@/components/shiping/summary-ship';
import SelectedViajeInfo from '@/components/tickets/selected-viaje-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { paymentMethods } from '@/data/payment-methods';
import ClientLayout from '@/layouts/client-layout';
import { useShipingStore } from '@/store/shiping-store';
import { SharedData } from '@/types';

import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

    const [paymentForm, setPaymentForm] = useState<PaymentForm>({
        method: 'card',
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: '',
        paypalEmail: '',
        reference: '',
        terms: false,
    });

    const [paymentType, setPaymentType] = useState<string>('tickets');
    const [paymentMethod, setPaymentMethod] = useState('Tarjeta');

    const [urlTicket, setUrlTicket] = useState<string>('');

    const formatDate = (dateString: string): string => {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

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

    const proceedToPayment = (type: string) => {
        setPaymentType(type);

        if (type === 'tickets') {
            // setTicketStep('payment');
        } else {
            //  setPaymentVisible(true);
        }
    };

    const goBackFromPayment = () => {
        if (paymentType === 'tickets') {
            //    setTicketStep('seats');
        } else {
            //  setPaymentVisible(false);
        }
    };

    const canCompletePayment = (): boolean => {
        if (!paymentForm.terms) return false;

        if (paymentForm.method === 'card') {
            return !!(paymentForm.cardNumber && paymentForm.expiry && paymentForm.cvv && paymentForm.cardName);
        }

        if (paymentForm.method === 'paypal') {
            return !!paymentForm.paypalEmail;
        }

        if (paymentForm.method === 'transfer') {
            return !!paymentForm.reference;
        }

        return true; // Para efectivo
    };

    const completePayment = async () => {
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
            paymentMethod: paymentMethod,
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
                        <div>
                            <Tabs onValueChange={setPaymentMethod} value={paymentMethod}>
                                <TabsList className="w-full gap-2 bg-transparent">
                                    {paymentMethods.map((method) => (
                                        <TabsTrigger
                                            value={method.id}
                                            className="flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border bg-gray-700 p-2"
                                        >
                                            <div className="mb-1 flex h-8 w-8 items-center justify-center">{method.icon}</div>
                                            <span className="text-center text-xs text-gray-300">{method.name}</span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <TabsContent value="Tarjeta" className="mt-10">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-300">Número de Tarjeta</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Expiración</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                    placeholder="MM/AA"
                                                    maxLength={5}
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-300">CVV</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                    placeholder="123"
                                                    maxLength={3}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-300">Nombre en la Tarjeta</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="JUAN PEREZ"
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-600 text-[#037995] focus:ring-[#037995]"
                                                />
                                                <span className="ml-2 text-sm text-gray-300">
                                                    Acepto los{' '}
                                                    <a href="#" className="text-[#037995] hover:underline">
                                                        términos y condiciones
                                                    </a>{' '}
                                                    y la{' '}
                                                    <a href="#" className="text-[#037995] hover:underline">
                                                        política de privacidad
                                                    </a>
                                                </span>
                                            </label>
                                        </div>

                                        <button
                                            onClick={completePayment}
                                            className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                                        >
                                            <span className="mr-2">Completar Pago</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="Efetivo" className="mt-10">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-300">Número de Tarjeta</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Expiración</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                    placeholder="MM/AA"
                                                    maxLength={5}
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-300">CVV</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                    placeholder="123"
                                                    maxLength={3}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-300">Nombre en la Tarjeta</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="JUAN PEREZ"
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-600 text-[#037995] focus:ring-[#037995]"
                                                />
                                                <span className="ml-2 text-sm text-gray-300">
                                                    Acepto los{' '}
                                                    <a href="#" className="text-[#037995] hover:underline">
                                                        términos y condiciones
                                                    </a>{' '}
                                                    y la{' '}
                                                    <a href="#" className="text-[#037995] hover:underline">
                                                        política de privacidad
                                                    </a>
                                                </span>
                                            </label>
                                        </div>

                                        <button className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]">
                                            <span className="mr-2">Completar Pago</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

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
