@extends('layout.layoutDashboard')

@section('content')
<div x-data="transportApp()">
    <main class="flex-grow">
        <!-- Dashboard Home -->
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-2xl font-semibold text-white mb-6">Bienvenido, Juan</h1>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Tarjeta de Envío de Paquetes -->
                    <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-[#037995] transition-all duration-300 transform hover:-translate-y-1">
                        <div class="p-6">
                            <div class="flex items-center mb-4">
                                <div class="h-12 w-12 rounded-full bg-[#037995] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                </div>
                                <h2 class="ml-4 text-xl font-semibold text-white">Envío de Paquetes</h2>
                            </div>

                            <p class="text-gray-300 mb-6">Envía paquetes a cualquier destino de manera rápida y segura. Seguimiento en tiempo real y notificaciones de estado.</p>

                            <button
                                @click="activeTab = 'shipping'"
                                class="w-full py-3 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center">
                                <span class="mr-2">Enviar un Paquete</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Tarjeta de Compra de Boletos -->
                    <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-[#037995] transition-all duration-300 transform hover:-translate-y-1">
                        <div class="p-6">
                            <div class="flex items-center mb-4">
                                <div class="h-12 w-12 rounded-full bg-[#037995] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
                                        <rect x="2" y="6" width="20" height="6" rx="2"></rect>
                                    </svg>
                                </div>
                                <h2 class="ml-4 text-xl font-semibold text-white">Compra de Boletos</h2>
                            </div>

                            <p class="text-gray-300 mb-6">Reserva tus boletos para viajar a cualquier destino. Selección de asientos, pago en línea y confirmación inmediata.</p>

                            <button
                                @click="activeTab = 'tickets'"
                                class="w-full py-3 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center">
                                <span class="mr-2">Comprar Boletos</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Actividad reciente -->
                <div class="mt-8">
                    <h2 class="text-lg font-medium text-white mb-4">Actividad Reciente</h2>
                    <div class="bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-700">
                        <ul class="divide-y divide-gray-700">
                            <template x-for="(activity, index) in recentActivities" :key="index">
                                <li class="px-6 py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-[#037995] bg-opacity-20 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#037995]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                            </svg>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-white truncate" x-text="activity.title"></p>
                                            <p class="text-sm text-gray-400 truncate" x-text="activity.description"></p>
                                        </div>
                                        <div>
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="activity.statusClass" x-text="activity.status"></span>
                                        </div>
                                    </div>
                                </li>
                            </template>
                        </ul>
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
            activeTab: 'dashboard',
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
