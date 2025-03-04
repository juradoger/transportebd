@extends('layout.layoutDashboard')

@section('content')
<div x-data="transportApp()">
    <main class="flex-grow">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Formulario de pago -->
            <div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-300 mb-1">Método de Pago</label>
                    <div class="grid grid-cols-4 gap-2">
                        <template x-for="method in paymentMethods" :key="method.id">
                            <div :class="[
                                                            'border rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200',
                                                            paymentForm.method === method.id ? 'border-[#037995] bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
                                                        ]" @click="paymentForm.method = method.id">
                                <div class="h-8 w-8 flex items-center justify-center mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                        <line x1="1" y1="10" x2="23" y2="10"></line>
                                    </svg>
                                </div>
                                <span class="text-xs text-center text-gray-300" x-text="method.name"></span>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Tarjeta de crédito/débito -->
                <div x-show="paymentForm.method === 'card'" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Número de Tarjeta</label>
                        <input type="text" x-model="paymentForm.cardNumber"
                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                            placeholder="1234 5678 9012 3456" maxlength="19" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">Fecha de Expiración</label>
                            <input type="text" x-model="paymentForm.expiry"
                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                placeholder="MM/AA" maxlength="5" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">CVV</label>
                            <input type="text" x-model="paymentForm.cvv"
                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                placeholder="123" maxlength="3" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Nombre en la Tarjeta</label>
                        <input type="text" x-model="paymentForm.cardName"
                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                            placeholder="JUAN PEREZ" />
                    </div>
                </div>

                <!-- PayPal -->
                <div x-show="paymentForm.method === 'paypal'" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico de PayPal</label>
                        <input type="email" x-model="paymentForm.paypalEmail"
                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                            placeholder="correo@ejemplo.com" />
                    </div>

                    <p class="text-sm text-gray-400">
                        Serás redirigido a PayPal para completar el pago de manera segura.
                    </p>
                </div>

                <!-- Transferencia -->
                <div x-show="paymentForm.method === 'transfer'" class="space-y-4">
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h4 class="text-white font-medium mb-2">Datos Bancarios</h4>
                        <p class="text-sm text-gray-300">Banco: Banco Nacional</p>
                        <p class="text-sm text-gray-300">Cuenta: 1234 5678 9012 3456</p>
                        <p class="text-sm text-gray-300">CLABE: 012 345 678 901 234 567</p>
                        <p class="text-sm text-gray-300">Beneficiario: TransPort S.A. de C.V.</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Referencia de Pago</label>
                        <input type="text" x-model="paymentForm.reference"
                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                            placeholder="Referencia de tu transferencia" />
                    </div>
                </div>

                <!-- Efectivo -->
                <div x-show="paymentForm.method === 'cash'" class="space-y-4">
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h4 class="text-white font-medium mb-2">Pago en Efectivo</h4>
                        <p class="text-sm text-gray-300">
                            Puedes realizar tu pago en efectivo en cualquiera de nuestras terminales o puntos de pago
                            autorizados.
                        </p>
                        <p class="text-sm text-gray-300 mt-2">
                            Presenta el código QR que te proporcionaremos al finalizar esta reserva.
                        </p>
                    </div>
                </div>

                <div class="mt-6">
                    <label class="flex items-center">
                        <input type="checkbox" x-model="paymentForm.terms"
                            class="h-4 w-4 text-[#037995] focus:ring-[#037995] border-gray-600 rounded">
                        <span class="ml-2 text-sm text-gray-300">
                            Acepto los <a href="#" class="text-[#037995] hover:underline">términos y condiciones</a> y
                            la <a href="#" class="text-[#037995] hover:underline">política de privacidad</a>
                        </span>
                    </label>
                </div>

                <button @click="completePayment" :disabled="!canCompletePayment" :class="[
                                                'w-full py-3 px-4 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center mt-6',
                                                !canCompletePayment ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#037995] hover:bg-[#026980]'
                                            ]">
                    <span class="mr-2">Completar Pago</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </button>
            </div>

            <!-- Resumen de compra -->
            <div class="bg-gray-700 rounded-lg p-4">
                <h3 class="text-md font-medium text-white mb-4">Resumen de Compra</h3>

                <div class="space-y-3">
                    <div x-show="paymentType === 'tickets'">
                        <div class="flex justify-between">
                            <span class="text-gray-300">Ruta:</span>
                            <span class="text-white" x-text="ticketForm.origin + ' - ' + ticketForm.destination"></span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-300">Fecha:</span>
                            <span class="text-white" x-text="formatDate(ticketForm.date)"></span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-300">Hora:</span>
                            <span class="text-white" x-text="selectedRoute.time"></span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-300">Asientos:</span>
                            <span class="text-white" x-text="selectedSeats.join(', ')"></span>
                        </div>
                    </div>

                    <div x-show="paymentType === 'shipping'">
                        <div class="flex justify-between">
                            <span class="text-gray-300">Tipo de Paquete:</span>
                            <span class="text-white" x-text="getPackageTypeName(packageForm.type)"></span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-300">Origen:</span>
                            <span class="text-white" x-text="packageForm.origin"></span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-300">Destino:</span>
                            <span class="text-white" x-text="packageForm.destination"></span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-300">Peso:</span>
                            <span class="text-white" x-text="packageForm.weight + ' kg'"></span>
                        </div>
                    </div>

                    <div class="border-t border-gray-600 my-3 pt-3">
                        <div class="flex justify-between mt-3 text-lg font-bold">
                            <span class="text-gray-300">Total a Pagar:</span>
                            <span class="text-white" x-text="paymentType === 'tickets' ?
                                                        '$' + (selectedRoute.price * ticketForm.passengers * 1.16).toFixed(2) :
                                                        '$' + shippingCost.toFixed(2)">
                            </span>
                        </div>
                    </div>
                </div>

                <div class="mt-6 bg-gray-800 p-4 rounded-lg">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#037995] mr-2" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span class="text-sm text-gray-300">Pago 100% seguro con encriptación SSL</span>
                    </div>
                </div>
            </div>
        </div>
</div>
</main>
</div>