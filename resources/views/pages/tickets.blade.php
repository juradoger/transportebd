@extends('layout.layoutDashboard')

@section('content')
<div x-data="transportApp()">
    <main class="flex-grow">
        <!-- Envío de Paquetes -->
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-2xl font-semibold text-white mb-6">Compra de Boletos</h1>

                <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                    <div class="p-6">
                        <!-- Búsqueda de rutas -->
                        <div x-show="ticketStep === 'search'">
                            <h2 class="text-lg font-medium text-white mb-4">Buscar Rutas</h2>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Origen</label>
                                        <select
                                            x-model="ticketForm.origin"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]">
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
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Destino</label>
                                        <select
                                            x-model="ticketForm.destination"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]">
                                            <option value="">Seleccionar ciudad</option>
                                            <option>Ciudad de México</option>
                                            <option>Guadalajara</option>
                                            <option>Monterrey</option>
                                            <option>Puebla</option>
                                            <option>Tijuana</option>
                                            <option>Bermejo</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Fecha de Viaje</label>
                                        <input
                                            type="date"
                                            x-model="ticketForm.date"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]" />
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Pasajeros</label>
                                        <select
                                            x-model="ticketForm.passengers"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>

                                    <button
                                        @click="searchRoutes"
                                        class="w-full py-3 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center">
                                        <span class="mr-2">Buscar Rutas</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </button>
                                </div>

                                <div class="hidden md:block">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BUSROUTES" alt="Bus Routes" class="w-full h-auto rounded-lg opacity-20" />
                                </div>
                            </div>
                        </div>

                        <!-- Resultados de búsqueda -->
                        <div x-show="ticketStep === 'results'">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-medium text-white">Rutas Disponibles</h2>
                                <button
                                    @click="ticketStep = 'search'"
                                    class="text-sm text-[#037995] hover:underline flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                    Volver a la búsqueda
                                </button>
                            </div>

                            <div class="text-white mb-4">
                                <span class="font-medium" x-text="ticketForm.origin"></span> a <span class="font-medium" x-text="ticketForm.destination"></span> - <span x-text="formatDate(ticketForm.date)"></span>
                            </div>

                            <div class="space-y-4">
                                <template x-for="(route, index) in availableRoutes" :key="index">
                                    <div
                                        class="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                                        @click="selectRoute(route)">
                                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div class="flex-1">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0">
                                                        <div class="h-10 w-10 rounded-full bg-[#037995] flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="ml-4">
                                                        <h3 class="text-lg font-medium text-white" x-text="route.time"></h3>
                                                        <p class="text-sm text-gray-300" x-text="route.type"></p>
                                                    </div>
                                                </div>

                                                <div class="mt-4 grid grid-cols-3 gap-4">
                                                    <div>
                                                        <p class="text-sm text-gray-400">Duración</p>
                                                        <p class="text-sm font-medium text-white" x-text="route.duration"></p>
                                                    </div>
                                                    <div>
                                                        <p class="text-sm text-gray-400">Asientos</p>
                                                        <p class="text-sm font-medium text-white" x-text="route.seats + ' disponibles'"></p>
                                                    </div>
                                                    <div>
                                                        <p class="text-sm text-gray-400">Clase</p>
                                                        <p class="text-sm font-medium text-white" x-text="route.class"></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mt-4 md:mt-0 flex flex-col items-end">
                                                <p class="text-2xl font-bold text-white" x-text="'Bs. ' + route.price"></p>
                                                <p class="text-sm text-gray-400">por persona</p>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- Reemplaza la sección de selección de asientos existente con este código mejorado -->

                        <!-- Selección de asientos -->
                        <div x-show="ticketStep === 'seats'" class="py-4">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-medium text-white">Selección de Asientos</h2>
                                <button
                                    @click="ticketStep = 'results'"
                                    class="text-sm text-[#037995] hover:underline flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                    Volver a las rutas
                                </button>
                            </div>

                            <div class="text-white mb-4">
                                <div><span class="font-medium" x-text="ticketForm.origin"></span> a <span class="font-medium" x-text="ticketForm.destination"></span></div>
                                <div class="text-sm text-gray-300"><span x-text="formatDate(ticketForm.date)"></span> - <span x-text="selectedRoute.time"></span> - <span x-text="selectedRoute.duration"></span></div>
                            </div>

                            <div class="flex flex-col md:flex-row gap-6">
                                <!-- Mapa de asientos (ahora más grande) -->
                                <div class="w-full md:w-1/2 bg-gray-700 rounded-lg p-4">
                                    <h3 class="text-md font-medium text-white mb-4 text-center">Seleccione sus asientos</h3>

                                    <div class="flex justify-center mb-4">
                                        <div class="flex flex-wrap justify-center gap-4">
                                            <div class="flex items-center">
                                                <div class="h-4 w-4 rounded-sm bg-gray-500 mr-2"></div>
                                                <span class="text-xs text-gray-300">Disponible</span>
                                            </div>
                                            <div class="flex items-center">
                                                <div class="h-4 w-4 rounded-sm bg-[#037995] mr-2"></div>
                                                <span class="text-xs text-gray-300">Seleccionado</span>
                                            </div>
                                            <div class="flex items-center">
                                                <div class="h-4 w-4 rounded-sm bg-gray-800 mr-2"></div>
                                                <span class="text-xs text-gray-300">Ocupado</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Autobús mejorado -->
                                    <div class="relative mx-auto max-w-md border-2 border-gray-600 rounded-t-3xl bg-gray-800 mb-4">
                                        <!-- Parte frontal del autobús -->
                                        <div class="h-12 bg-gray-700 rounded-t-3xl flex items-center justify-center border-b border-gray-600">
                                            <div class="w-16 h-6 bg-gray-500 rounded-md"></div>
                                        </div>

                                        <!-- Conductor -->
                                        <div class="absolute top-3 left-4 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>

                                        <!-- Pasillo central -->
                                        <div class="w-full h-full p-4 flex">
                                            <!-- Asientos lado izquierdo -->
                                            <div class="w-1/2 grid grid-cols-2 gap-2">
                                                <template x-for="seat in seats.slice(0, 20)" :key="seat.id">
                                                    <div
                                                        :class="[
                                    'seat',
                                    seat.status === 'available' ? 'seat-available' : '',
                                    seat.status === 'selected' ? 'seat-selected' : '',
                                    seat.status === 'occupied' ? 'seat-occupied' : ''
                                ]"
                                                        @click="selectSeat(seat)"
                                                        @mouseenter="seat.status !== 'occupied' && (hoveredSeat = seat)"
                                                        @mouseleave="hoveredSeat = null">
                                                        <span x-text="seat.id"></span>
                                                    </div>
                                                </template>
                                            </div>

                                            <!-- Pasillo (espacio) -->
                                            <div class="w-4 mx-1 bg-gray-700 rounded-md"></div>

                                            <!-- Asientos lado derecho -->
                                            <div class="w-1/2 grid grid-cols-2 gap-2">
                                                <template x-for="seat in seats.slice(20, 40)" :key="seat.id">
                                                    <div
                                                        :class="[
                                    'seat',
                                    seat.status === 'available' ? 'seat-available' : '',
                                    seat.status === 'selected' ? 'seat-selected' : '',
                                    seat.status === 'occupied' ? 'seat-occupied' : ''
                                ]"
                                                        @click="selectSeat(seat)"
                                                        @mouseenter="seat.status !== 'occupied' && (hoveredSeat = seat)"
                                                        @mouseleave="hoveredSeat = null">
                                                        <span x-text="seat.id"></span>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>

                                        <!-- Parte trasera del autobús -->
                                        <div class="h-6 bg-gray-700 border-t border-gray-600"></div>
                                    </div>

                                    <div class="text-center text-sm text-gray-300 mt-4">
                                        <p>Asientos seleccionados: <span x-text="selectedSeats.join(', ') || 'Ninguno'"></span></p>
                                        <p class="text-xs text-gray-400 mt-1">Seleccione <span x-text="ticketForm.passengers"></span> asiento(s)</p>
                                    </div>
                                </div>

                                <!-- Detalles de asientos y resumen de compra -->
                                <div class="w-full md:w-1/2 flex flex-col gap-4">
                                    <!-- Detalles de asientos seleccionados -->
                                    <div class="bg-gray-700 rounded-lg p-4">
                                        <h3 class="text-md font-medium text-white mb-4">Detalles de Asientos</h3>

                                        <div x-show="selectedSeats.length === 0" class="text-center py-6 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                                                <path d="M6 12h12"></path>
                                            </svg>
                                            <p>Seleccione asientos para ver sus detalles</p>
                                        </div>

                                        <div x-show="selectedSeats.length > 0" class="space-y-4">
                                            <template x-for="(seatId, index) in selectedSeats" :key="seatId">
                                                <div class="bg-gray-800 rounded-lg p-3 border border-gray-600">
                                                    <div class="flex items-center justify-between mb-2">
                                                        <div class="flex items-center">
                                                            <div class="h-8 w-8 rounded-md bg-[#037995] flex items-center justify-center text-white font-bold mr-3">
                                                                <span x-text="seatId"></span>
                                                            </div>
                                                            <span class="text-white font-medium">Asiento <span x-text="seatId"></span></span>
                                                        </div>
                                                        <button
                                                            @click="unselectSeat(seatId)"
                                                            class="text-gray-400 hover:text-white"
                                                            title="Quitar selección">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div class="grid grid-cols-2 gap-2 text-sm">
                                                        <div>
                                                            <span class="text-gray-400">Tipo:</span>
                                                            <span class="text-white" x-text="getSeatType(seatId)"></span>
                                                        </div>
                                                        <div>
                                                            <span class="text-gray-400">Ubicación:</span>
                                                            <span class="text-white" x-text="getSeatLocation(seatId)"></span>
                                                        </div>
                                                        <div>
                                                            <span class="text-gray-400">Pasajero:</span>
                                                            <span class="text-white" x-text="'Pasajero ' + (index + 1)"></span>
                                                        </div>
                                                        <div>
                                                            <span class="text-gray-400">Precio:</span>
                                                            <span class="text-white" x-text="'$' + selectedRoute.price"></span>
                                                        </div>
                                                    </div>

                                                    <!-- Características del asiento -->
                                                    <div class="mt-3 flex flex-wrap gap-2">
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                                            </svg>
                                                            Reclinable
                                                        </span>
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M5 12h14"></path>
                                                                <path d="M12 5v14"></path>
                                                            </svg>
                                                            USB
                                                        </span>
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                                                <line x1="14" y1="1" x2="14" y2="4"></line>
                                                            </svg>
                                                            Aire
                                                        </span>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>

                                    <!-- Resumen de compra -->
                                    <div class="bg-gray-700 rounded-lg p-4">
                                        <h3 class="text-md font-medium text-white mb-4">Resumen de Compra</h3>

                                        <div class="space-y-3">
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
                                                <span class="text-gray-300">Clase:</span>
                                                <span class="text-white" x-text="selectedRoute.class"></span>
                                            </div>

                                            <div class="flex justify-between">
                                                <span class="text-gray-300">Asientos:</span>
                                                <span class="text-white" x-text="selectedSeats.join(', ') || 'Ninguno'"></span>
                                            </div>

                                            <div class="flex justify-between">
                                                <span class="text-gray-300">Pasajeros:</span>
                                                <span class="text-white" x-text="ticketForm.passengers"></span>
                                            </div>

                                            <div class="border-t border-gray-600 my-3 pt-3">
                                                <div class="flex justify-between">
                                                    <span class="text-gray-300">Precio por boleto:</span>
                                                    <span class="text-white" x-text="'Bs.' + selectedRoute.price"></span>
                                                </div>

                                                <div class="flex justify-between mt-1">
                                                    <span class="text-gray-300">Subtotal:</span>
                                                    <span class="text-white" x-text="'Bs.' + (selectedRoute.price * ticketForm.passengers).toFixed(2)"></span>
                                                </div>

                                                <div class="flex justify-between mt-1">
                                                    <span class="text-gray-300">Impuestos:</span>
                                                    <span class="text-white" x-text="'Bs.' + (selectedRoute.price * ticketForm.passengers * 0.16).toFixed(2)"></span>
                                                </div>

                                                <div class="flex justify-between mt-3 text-lg font-bold">
                                                    <span class="text-gray-300">Total:</span>
                                                    <span class="text-white" x-text="'Bs.' + (selectedRoute.price * ticketForm.passengers * 1.16).toFixed(2)"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            @click="proceedToPayment('tickets')"
                                            :disabled="selectedSeats.length < ticketForm.passengers"
                                            :class="[
                        'w-full py-3 px-4 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center mt-6',
                        selectedSeats.length < ticketForm.passengers ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#037995] hover:bg-[#026980]'
                    ]">
                                            <span class="mr-2">Proceder al Pago</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                <line x1="1" y1="10" x2="23" y2="10"></line>
                                            </svg>
                                        </button>

                                        <div x-show="selectedSeats.length < ticketForm.passengers" class="text-sm text-red-400 text-center mt-2">
                                            Por favor seleccione <span x-text="ticketForm.passengers"></span> asiento(s)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Interfaz de pago -->
                        <div x-show="ticketStep === 'payment' || paymentVisible">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-medium text-white">Método de Pago</h2>
                                <button
                                    @click="goBackFromPayment"
                                    class="text-sm text-[#037995] hover:underline flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                    Volver
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Formulario de pago -->
                                <div>
                                    <div class="mb-4">
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Método de Pago</label>
                                        <div class="grid grid-cols-4 gap-2">
                                            <template x-for="method in paymentMethods" :key="method.id">
                                                <div
                                                    :class="[
                                                            'border rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200',
                                                            paymentForm.method === method.id ? 'border-[#037995] bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
                                                        ]"
                                                    @click="paymentForm.method = method.id">
                                                    <div class="h-8 w-8 flex items-center justify-center mb-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                                            <input
                                                type="text"
                                                x-model="paymentForm.cardNumber"
                                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                placeholder="1234 5678 9012 3456"
                                                maxlength="19" />
                                        </div>

                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-300 mb-1">Fecha de Expiración</label>
                                                <input
                                                    type="text"
                                                    x-model="paymentForm.expiry"
                                                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                    placeholder="MM/AA"
                                                    maxlength="5" />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-300 mb-1">CVV</label>
                                                <input
                                                    type="text"
                                                    x-model="paymentForm.cvv"
                                                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                    placeholder="123"
                                                    maxlength="3" />
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-300 mb-1">Nombre en la Tarjeta</label>
                                            <input
                                                type="text"
                                                x-model="paymentForm.cardName"
                                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                placeholder="JUAN PEREZ" />
                                        </div>
                                    </div>

                                    <!-- PayPal -->
                                    <div x-show="paymentForm.method === 'paypal'" class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico de PayPal</label>
                                            <input
                                                type="email"
                                                x-model="paymentForm.paypalEmail"
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
                                            <input
                                                type="text"
                                                x-model="paymentForm.reference"
                                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                placeholder="Referencia de tu transferencia" />
                                        </div>
                                    </div>

                                    <!-- Efectivo -->
                                    <div x-show="paymentForm.method === 'cash'" class="space-y-4">
                                        <div class="bg-gray-700 p-4 rounded-lg">
                                            <h4 class="text-white font-medium mb-2">Pago en Efectivo</h4>
                                            <p class="text-sm text-gray-300">
                                                Puedes realizar tu pago en efectivo en cualquiera de nuestras terminales o puntos de pago autorizados.
                                            </p>
                                            <p class="text-sm text-gray-300 mt-2">
                                                Presenta el código QR que te proporcionaremos al finalizar esta reserva.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="mt-6">
                                        <label class="flex items-center">
                                            <input type="checkbox" x-model="paymentForm.terms" class="h-4 w-4 text-[#037995] focus:ring-[#037995] border-gray-600 rounded">
                                            <span class="ml-2 text-sm text-gray-300">
                                                Acepto los <a href="#" class="text-[#037995] hover:underline">términos y condiciones</a> y la <a href="#" class="text-[#037995] hover:underline">política de privacidad</a>
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        @click="completePayment"
                                        :disabled="!canCompletePayment"
                                        :class="[
                                                'w-full py-3 px-4 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center mt-6',
                                                !canCompletePayment ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#037995] hover:bg-[#026980]'
                                            ]">
                                        <span class="mr-2">Completar Pago</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#037995] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                            </svg>
                                            <span class="text-sm text-gray-300">Pago 100% seguro con encriptación SSL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Confirmación -->
                        <div x-show="ticketStep === 'confirmation'">
                            <div class="text-center py-6">
                                <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#037995] bg-opacity-20 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#037995]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>

                                <h2 class="text-xl font-bold text-white mb-2">¡Pago Completado con Éxito!</h2>
                                <p class="text-gray-300 mb-6">Tu reserva ha sido confirmada. Recibirás un correo electrónico con los detalles.</p>

                                <div class="bg-gray-700 rounded-lg p-6 max-w-md mx-auto mb-6">
                                    <h3 class="text-lg font-medium text-white mb-4">Código de Confirmación</h3>

                                    <div class="bg-white p-2 rounded-lg mb-2 mx-auto w-40 h-40">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET12345678" alt="QR Code" class="w-full h-full" />
                                    </div>

                                    <p class="text-lg font-bold text-[#037995] mb-4">TICKET12345678</p>

                                    <div class="text-left space-y-2">
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
                                </div>

                                <div class="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                        @click="downloadTicket"
                                        class="py-2 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="7 10 12 15 17 10"></polyline>
                                            <line x1="12" y1="15" x2="12" y2="3"></line>
                                        </svg>
                                        Descargar Boleto
                                    </button>

                                    <button
                                        @click="activeTab = 'dashboard'"
                                        class="py-2 px-4 bg-gray-700 text-white font-medium rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                        Volver al Inicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </main>
</div>
@endsection

@section('scripts')
<script>
    function onNavigateToShipping() {
        app.ticketStep = 'shipping';
        app.mobileMenuOpen = false;
        app.activeTab = 'shipping';

        window.location.href = '/shipping';
    }

    function transportApp() {
        return {
            // Estado general
            currentScreen: 'dashboard',
            activeTab: 'tickets',
            mobileMenuOpen: false,
            profileDropdown: false,

            // Formularios de login y registro
            showRegister: false,

            recentActivities: [{
                    title: 'Boleto reservado',
                    description: 'Ciudad de México a Guadalajara - 28/03/2023',
                    status: 'Confirmado',
                    statusClass: 'bg-green-100 text-green-800'
                },
                {
                    title: 'Paquete enviado',
                    description: 'Envío #12345 - En tránsito',
                    status: 'En progreso',
                    statusClass: 'bg-yellow-100 text-yellow-800'
                },
                {
                    title: 'Boleto cancelado',
                    description: 'Monterrey a Tijuana - 15/03/2023',
                    status: 'Cancelado',
                    statusClass: 'bg-red-100 text-red-800'
                }
            ],

            // Formulario de envío de paquetes
            packageForm: {
                type: 'small',
                weight: 1,
                length: 20,
                width: 15,
                height: 10,
                value: 100,
                description: '',
                origin: '',
                destination: '',
                recipientName: '',
                recipientPhone: '',
                recipientEmail: ''
            },
            showShippingSummary: false,
            shippingCost: 0,
            estimatedDeliveryTime: '',

            // Formulario de compra de boletos
            ticketForm: {
                origin: '',
                destination: '',
                date: '',
                passengers: 1
            },
            ticketStep: 'search',
            availableRoutes: [],
            selectedRoute: {},
            seats: [],
            selectedSeats: [],

            // Pago
            paymentVisible: false,
            paymentType: '',
            paymentMethods: [{
                    id: 'card',
                    name: 'Tarjeta'
                },
                {
                    id: 'paypal',
                    name: 'PayPal'
                },
                {
                    id: 'transfer',
                    name: 'Transferencia'
                },
                {
                    id: 'cash',
                    name: 'Efectivo'
                }
            ],
            paymentForm: {
                method: 'card',
                cardNumber: '',
                expiry: '',
                cvv: '',
                cardName: '',
                paypalEmail: '',
                reference: '',
                terms: false
            },

            // Métodos
            login() {
                // Simulación de inicio de sesión
                console.log('Iniciando sesión con:', this.loginForm);
                this.currentScreen = 'dashboard';
            },

            register() {
                // Simulación de registro
                console.log('Registrando usuario:', this.registerForm);
                this.showRegister = false;
                alert('Registro exitoso. Por favor inicia sesión.');
            },

            logout() {
                // Simulación de cierre de sesión
                this.currentScreen = 'login';
            },

            calculateShipping() {
                // Simulación de cálculo de envío
                const baseRate = 100;
                const weightRate = this.packageForm.weight * 10;
                const volumeRate = (this.packageForm.length * this.packageForm.width * this.packageForm.height) / 1000 * 5;

                this.shippingCost = baseRate + weightRate + volumeRate;
                this.estimatedDeliveryTime = '1-2 días hábiles';
                this.showShippingSummary = true;
            },

            getPackageTypeName(type) {
                const types = {
                    'document': 'Documento',
                    'small': 'Paquete Pequeño',
                    'medium': 'Paquete Mediano',
                    'large': 'Paquete Grande',
                    'special': 'Carga Especial'
                };

                return types[type] || type;
            },

            async searchRoutes() {
                // Simulación de búsqueda de rutas



                /* this.availableRoutes = [{
                        time: '08:00 AM',
                        duration: '5h 30m',
                        type: 'Directo',
                        seats: 45,
                        price: 850,
                        class: 'Ejecutivo'
                    },
                    {
                        time: '12:30 PM',
                        duration: '5h 45m',
                        type: 'Directo',
                        seats: 32,
                        price: 780,
                        class: 'Estándar'
                    },
                    {
                        time: '16:00 PM',
                        duration: '6h 00m',
                        type: 'Con escala',
                        seats: 18,
                        price: 650,
                        class: 'Económico'
                    }
                ]; */

                // fetch to /boletos/buscar GET  send ticketForm search params

                const searchParams = new URLSearchParams(this.ticketForm)

                const response = await fetch('/rutas/buscar?' + searchParams.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                });

                const availableRoutes = (await response.json()) ?? [];

                this.availableRoutes = availableRoutes.map(route => ({
                    time: route.horario,
                    duration: route.duracion,
                    type: 'Directo',
                    seats: route.asientos_disponibles,
                    price: route.precio,
                    class: route.clase
                }));

                this.ticketStep = 'results';
            },

            selectRoute(route) {
                this.selectedRoute = route;
                this.generateSeats();
                this.ticketStep = 'seats';
            },

            generateSeats() {
                this.seats = [];
                this.selectedSeats = [];

                // Generar 40 asientos con estados aleatorios
                for (let i = 1; i <= 40; i++) {
                    const random = Math.random();
                    let status = 'available';

                    // 30% de probabilidad de que el asiento esté ocupado
                    if (random < 0.3) {
                        status = 'occupied';
                    }

                    this.seats.push({
                        id: i,
                        status: status
                    });
                }
            },
            selectSeat(seat) {
                if (seat.status === 'occupied') return;

                if (seat.status === 'selected') {
                    seat.status = 'available';
                    this.selectedSeats = this.selectedSeats.filter(id => id !== seat.id);
                } else if (this.selectedSeats.length < this.ticketForm.passengers) {
                    seat.status = 'selected';
                    this.selectedSeats.push(seat.id);
                }
            },

            formatDate(dateString) {
                if (!dateString) return '';

                const date = new Date(dateString);
                return date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            },

            proceedToPayment(type) {
                this.paymentType = type;

                if (type === 'tickets') {
                    this.ticketStep = 'payment';
                } else {
                    this.paymentVisible = true;
                }
            },

            goBackFromPayment() {
                if (this.paymentType === 'tickets') {
                    this.ticketStep = 'seats';
                } else {
                    this.paymentVisible = false;
                }
            },

            get canCompletePayment() {
                if (!this.paymentForm.terms) return false;

                if (this.paymentForm.method === 'card') {
                    return this.paymentForm.cardNumber &&
                        this.paymentForm.expiry &&
                        this.paymentForm.cvv &&
                        this.paymentForm.cardName;
                }

                if (this.paymentForm.method === 'paypal') {
                    return this.paymentForm.paypalEmail;
                }

                if (this.paymentForm.method === 'transfer') {
                    return this.paymentForm.reference;
                }

                return true; // Para efectivo
            },

            completePayment() {
                // Simulación de procesamiento de pago
                setTimeout(() => {
                    if (this.paymentType === 'tickets') {
                        this.ticketStep = 'confirmation';
                    } else {
                        this.paymentVisible = false;
                        this.showShippingSummary = false;

                        // Reiniciar formulario
                        this.packageForm = {
                            type: 'small',
                            weight: 1,
                            length: 20,
                            width: 15,
                            height: 10,
                            value: 100,
                            description: '',
                            origin: '',
                            destination: '',
                            recipientName: '',
                            recipientPhone: '',
                            recipientEmail: ''
                        };

                        // Mostrar mensaje de éxito
                        alert('¡Pago completado con éxito! Tu envío ha sido registrado.');

                        // Volver al dashboard
                        this.activeTab = 'dashboard';
                    }
                }, 1500);
            },

            downloadTicket() {
                alert('Boleto descargado correctamente.');
            }
        };
    }
</script>
@endsection
