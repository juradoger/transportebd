import ClientLayout from '@/layouts/client-layout';
import { useShipingStore } from '@/store/shiping-store';
import { router } from '@inertiajs/react';
import { CreditCard } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type ShippingComponentProps = {
    origins: any[];
    destinations: any[];
};

const ShippingComponent: React.FC<ShippingComponentProps> = ({ origins, destinations }) => {
    const { packageForm, setPackageForm } = useShipingStore();

    const [showShippingSummary, setShowShippingSummary] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);
    const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('');

    const packageTypes = {
        Estándar: 'Estándar',
        Otro: 'Otro',
    };

    const calculateShipping = () => {
        const baseRate = 3; // Base rate in Bs
        const weightRate = packageForm.weight * 2; // Additional cost per weight
        const volumeRate = ((packageForm.length * packageForm.width * packageForm.height) / 1000) * 1; // Volume-based cost

        const totalCost = baseRate + weightRate + volumeRate;

        setShippingCost(totalCost);
        setEstimatedDeliveryTime('1-2 días hábiles');
        setShowShippingSummary(true);
    };

    useEffect(() => {
        calculateShipping();
    }, [packageForm.type, packageForm.weight, packageForm.length, packageForm.width, packageForm.height]);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'weight' || name === 'length' || name === 'width' || name === 'height') {
            setPackageForm({ [name]: parseFloat(value) });
        } else {
            setPackageForm({ [name]: value });
        }
    };

    const proceedToPayment = () => {
        const requiredFields = [
            'type',
            'weight',
            'length',
            'width',
            'height',
            'description',
            'origin',
            'destination',
            'fechaEnvio',
            'fechaEntrega',
            'recipientName',
            'recipientPhone',
            'recipientEmail',
        ];

        for (const field of requiredFields) {
            //@ts-expect-error nose
            if (!packageForm[field] || packageForm[field] === '') {
                alert(`Por favor, complete el campo: ${field}`);
                return; // Detener el proceso si algún campo está vacío
            }
        }
        router.visit('/shipings/checkout');
    };

    return (
        <ClientLayout>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-2xl font-semibold text-white">Envío de Paquetes</h1>

                <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Package Details Form */}
                            <div>
                                <h2 className="mb-4 text-lg font-medium text-white">Detalles del Paquete</h2>

                                <div className="space-y-4">
                                    {/* Package Type */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Tipo de Paquete</label>
                                        <select
                                            name="type"
                                            value={packageForm.type}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        >
                                            {Object.entries(packageTypes).map(([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Weight */}
                                    <div className="g">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-300">Peso (kg)</label>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={packageForm.weight}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="0.5"
                                                step="0.1"
                                                min="0.1"
                                            />
                                        </div>
                                    </div>

                                    {/* Dimensions */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Dimensiones</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <input
                                                type="number"
                                                name="length"
                                                value={packageForm.length}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="Largo (cm)"
                                                min="1"
                                            />
                                            <input
                                                type="number"
                                                name="width"
                                                value={packageForm.width}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="Ancho (cm)"
                                                min="1"
                                            />
                                            <input
                                                type="number"
                                                name="height"
                                                value={packageForm.height}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                                placeholder="Alto (cm)"
                                                min="1"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Descripción del Contenido</label>
                                        <textarea
                                            name="description"
                                            value={packageForm.description}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                            placeholder="Describa el contenido del paquete"
                                            rows={2}
                                        ></textarea>
                                    </div>

                                    {/* Origin */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Origen</label>
                                        <select
                                            name="origin"
                                            value={packageForm.origin}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        >
                                            <option value="">Seleccionar ciudad</option>
                                            {origins.map((origin) => (
                                                <option key={origin} value={origin}>
                                                    {origin}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Destination */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Destino</label>
                                        <select
                                            name="destination"
                                            value={packageForm.destination}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        >
                                            <option value="">Seleccionar ciudad</option>
                                            {destinations.map((destination) => (
                                                <option key={destination} value={destination}>
                                                    {destination}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Envio</label>
                                        <input
                                            type="date"
                                            value={packageForm.fechaEnvio}
                                            onChange={(e) => setPackageForm({ ...packageForm, fechaEnvio: e.target.value })}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Entrega</label>
                                        <input
                                            type="date"
                                            value={packageForm.fechaEntrega}
                                            onChange={(e) => setPackageForm({ ...packageForm, fechaEntrega: e.target.value })}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                        />
                                    </div>

                                    {/* Recipient Details */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Datos del Destinatario</label>
                                        <input
                                            type="text"
                                            name="recipientName"
                                            value={packageForm.recipientName}
                                            onChange={handleInputChange}
                                            className="mb-2 w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                            placeholder="Nombre completo"
                                        />
                                        <input
                                            type="text"
                                            name="recipientPhone"
                                            value={packageForm.recipientPhone}
                                            onChange={handleInputChange}
                                            className="mb-2 w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                            placeholder="Teléfono"
                                        />
                                        <input
                                            type="email"
                                            name="recipientEmail"
                                            value={packageForm.recipientEmail}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                            placeholder="Correo electrónico"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Summary */}
                            {showShippingSummary && (
                                <div className="rounded-xl bg-gray-700 p-6">
                                    <h2 className="mb-4 text-lg font-medium text-white">Resumen del Envío</h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Tipo de Paquete:</span>
                                            {/* @ts-expect-error nose */}
                                            <span className="font-medium text-white">{packageTypes[packageForm.type]}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Peso:</span>
                                            <span className="font-medium text-white">{packageForm.weight} kg</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Dimensiones:</span>
                                            <span className="font-medium text-white">{`${packageForm.length}×${packageForm.width}×${packageForm.height} cm`}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Origen:</span>
                                            <span className="font-medium text-white">{packageForm.origin}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Destino:</span>
                                            <span className="font-medium text-white">{packageForm.destination}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Destinatario:</span>
                                            <span className="font-medium text-white">{packageForm.recipientName}</span>
                                        </div>

                                        <div className="my-4 border-t border-gray-600 pt-4">
                                            <div className="flex justify-between text-lg">
                                                <span className="text-gray-300">Costo de Envío:</span>
                                                <span className="font-bold text-white">{shippingCost.toFixed(2)} Bs</span>
                                            </div>

                                            <div className="mt-2 flex justify-between text-sm">
                                                <span className="text-gray-300">Tiempo estimado:</span>
                                                <span className="text-white">{estimatedDeliveryTime}</span>
                                            </div>
                                        </div>

                                        {/* Proceed to Payment Button */}
                                        <button
                                            onClick={proceedToPayment}
                                            className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                                        >
                                            <span className="mr-2">Proceder al Pago</span>
                                            <CreditCard className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
};

export default ShippingComponent;
