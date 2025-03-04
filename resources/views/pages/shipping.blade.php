@extends('layout.layoutDashboard')

@section('content')
<div x-data="transportApp()">
    <main class="flex-grow">
        <!-- Envío de Paquetes -->
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-2xl font-semibold text-white mb-6">Envío de Paquetes</h1>

                <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Formulario de envío -->
                            <div>
                                <h2 class="text-lg font-medium text-white mb-4">Detalles del Paquete</h2>

                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Tipo de Paquete</label>
                                        <select
                                            x-model="packageForm.type"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]">
                                            <option value="document">Documento</option>
                                            <option value="small">Paquete Pequeño</option>
                                            <option value="medium">Paquete Mediano</option>
                                            <option value="large">Paquete Grande</option>
                                            <option value="special">Carga Especial</option>
                                        </select>
                                    </div>

                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-300 mb-1">Peso (kg)</label>
                                            <input
                                                type="number"
                                                x-model="packageForm.weight"
                                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                placeholder="0.5"
                                                step="0.1"
                                                min="0.1" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-300 mb-1">Valor Declarado ($)</label>
                                            <input
                                                type="number"
                                                x-model="packageForm.value"
                                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                placeholder="100"
                                                step="1"
                                                min="0" />
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Dimensiones</label>
                                        <div class="grid grid-cols-3 gap-2">
                                            <div>
                                                <input
                                                    type="number"
                                                    x-model="packageForm.length"
                                                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                    placeholder="Largo (cm)"
                                                    min="1" />
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    x-model="packageForm.width"
                                                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                    placeholder="Ancho (cm)"
                                                    min="1" />
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    x-model="packageForm.height"
                                                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                                    placeholder="Alto (cm)"
                                                    min="1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Descripción del Contenido</label>
                                        <textarea
                                            x-model="packageForm.description"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                            placeholder="Describa el contenido del paquete"
                                            rows="2"></textarea>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Origen</label>
                                        <select
                                            x-model="packageForm.origin"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]">
                                            <option value="">Seleccionar ciudad</option>
                                            <option>Ciudad de México</option>
                                            <option>Guadalajara</option>
                                            <option>Monterrey</option>
                                            <option>Puebla</option>
                                            <option>Tijuana</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Destino</label>
                                        <select
                                            x-model="packageForm.destination"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]">
                                            <option value="">Seleccionar ciudad</option>
                                            <option>Ciudad de México</option>
                                            <option>Guadalajara</option>
                                            <option>Monterrey</option>
                                            <option>Puebla</option>
                                            <option>Tijuana</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-300 mb-1">Datos del Destinatario</label>
                                        <input
                                            type="text"
                                            x-model="packageForm.recipientName"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995] mb-2"
                                            placeholder="Nombre completo" />
                                        <input
                                            type="text"
                                            x-model="packageForm.recipientPhone"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995] mb-2"
                                            placeholder="Teléfono" />
                                        <input
                                            type="email"
                                            x-model="packageForm.recipientEmail"
                                            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                            placeholder="Correo electrónico" />
                                    </div>

                                    <button
                                        @click="calculateShipping"
                                        class="w-full py-3 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center">
                                        <span class="mr-2">Calcular Envío</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Resumen y QR -->
                            <div x-show="showShippingSummary" class="bg-gray-700 rounded-xl p-6">
                                <h2 class="text-lg font-medium text-white mb-4">Resumen del Envío</h2>

                                <div class="space-y-4">
                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Tipo de Paquete:</span>
                                        <span class="text-white font-medium" x-text="getPackageTypeName(packageForm.type)"></span>
                                    </div>

                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Peso:</span>
                                        <span class="text-white font-medium" x-text="packageForm.weight + ' kg'"></span>
                                    </div>

                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Dimensiones:</span>
                                        <span class="text-white font-medium" x-text="packageForm.length + '×' + packageForm.width + '×' + packageForm.height + ' cm'"></span>
                                    </div>

                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Origen:</span>
                                        <span class="text-white font-medium" x-text="packageForm.origin"></span>
                                    </div>

                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Destino:</span>
                                        <span class="text-white font-medium" x-text="packageForm.destination"></span>
                                    </div>

                                    <div class="flex justify-between">
                                        <span class="text-gray-300">Destinatario:</span>
                                        <span class="text-white font-medium" x-text="packageForm.recipientName"></span>
                                    </div>

                                    <div class="border-t border-gray-600 my-4 pt-4">
                                        <div class="flex justify-between text-lg">
                                            <span class="text-gray-300">Costo de Envío:</span>
                                            <span class="text-white font-bold" x-text="'$' + shippingCost.toFixed(2)"></span>
                                        </div>

                                        <div class="flex justify-between text-sm mt-2">
                                            <span class="text-gray-300">Tiempo estimado:</span>
                                            <span class="text-white" x-text="estimatedDeliveryTime"></span>
                                        </div>
                                    </div>

                                    <!-- QR de seguimiento -->
                                    <div class="mt-6 flex flex-col items-center">
                                        <h3 class="text-md font-medium text-white mb-2">Código de Seguimiento</h3>
                                        <div class="bg-white p-2 rounded-lg mb-2">
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TRACK12345678" alt="QR Code" class="w-32 h-32" />
                                        </div>
                                        <p class="text-sm text-gray-300">TRACK12345678</p>
                                        <p class="text-xs text-gray-400 mt-1">Escanea para seguimiento en tiempo real</p>
                                    </div>

                                    <!-- Estado del envío -->
                                    <div class="mt-4">
                                        <h3 class="text-md font-medium text-white mb-2">Estado del Envío</h3>
                                        <div class="relative">
                                            <div class="absolute inset-0 flex items-center">
                                                <div class="h-0.5 w-full bg-gray-600"></div>
                                            </div>
                                            <div class="relative flex justify-between">
                                                <div>
                                                    <div class="h-4 w-4 rounded-full bg-[#037995] flex items-center justify-center"></div>
                                                    <div class="text-xs text-gray-400 mt-1">Registrado</div>
                                                </div>
                                                <div>
                                                    <div class="h-4 w-4 rounded-full bg-gray-600 flex items-center justify-center"></div>
                                                    <div class="text-xs text-gray-400 mt-1">En proceso</div>
                                                </div>
                                                <div>
                                                    <div class="h-4 w-4 rounded-full bg-gray-600 flex items-center justify-center"></div>
                                                    <div class="text-xs text-gray-400 mt-1">En tránsito</div>
                                                </div>
                                                <div>
                                                    <div class="h-4 w-4 rounded-full bg-gray-600 flex items-center justify-center"></div>
                                                    <div class="text-xs text-gray-400 mt-1">Entregado</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        @click="proceedToPayment('shipping')"
                                        class="w-full py-3 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center mt-6">
                                        <span class="mr-2">Proceder al Pago</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                            <line x1="1" y1="10" x2="23" y2="10"></line>
                                        </svg>
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
            activeTab: 'shipping',
            mobileMenuOpen: false,
            profileDropdown: false,

            // Formularios de login y registro
            showRegister: false,
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },

            // Actividades recientes
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

            searchRoutes() {
                // Simulación de búsqueda de rutas
                this.availableRoutes = [{
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
                ];

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
