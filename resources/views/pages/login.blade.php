    @extends('layout.defaults')

    @section('content')
    <div x-data="transportApp()" x-show="currentScreen === 'login'" class="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
        <!-- Fondo dinámico con líneas futuristas -->
        <div class="absolute inset-0 z-0">
            <div class="grid-background"></div>
        </div>

        <!-- Efectos de luz -->
        <div class="absolute top-1/4 -left-20 w-72 h-72 bg-[#037995] rounded-full filter blur-[100px] opacity-20 bg-pulse"></div>
        <div class="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#CE4B85] rounded-full filter blur-[100px] opacity-20 bg-pulse"></div>

        <!-- Contenido principal -->
        <div class="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center relative z-10">
            <!-- Logo -->
            <div class="mb-6 flex justify-center">
                <img src="/img/logo.png" alt="" class="size-36">
            </div>

            <!-- Título -->
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8">
                <span class="text-[#CE4B85]">Trans</span><span class="text-[#037995]">Tarija</span>
            </h1>

            <!-- Formulario de inicio de sesión -->
            <div class="w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-gray-700">
                <div x-show="!showRegister">
                    <h2 class="text-xl font-semibold text-white mb-6 text-center">Iniciar Sesión</h2>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                x-model="loginForm.email"
                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                placeholder="tu@email.com" />
                        </div>

                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Contraseña</label>
                            <input
                                type="password"
                                x-model="loginForm.password"
                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                placeholder="••••••••" />
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <input id="remember-me" type="checkbox" class="h-4 w-4 text-[#037995] focus:ring-[#037995] border-gray-600 rounded">
                                <label for="remember-me" class="ml-2 block text-sm text-gray-300">Recordarme</label>
                            </div>

                            <div class="text-sm">
                                <a href="#" class="text-[#037995] hover:text-[#037995] hover:underline">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>

                        <button
                            @click="login"
                            class="w-full py-3 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center">
                            <span class="mr-2">Iniciar Sesión</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                <polyline points="10 17 15 12 10 7"></polyline>
                                <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>
                        </button>
                    </div>

                    <div class="mt-6 text-center">
                        <p class="text-gray-400">
                            ¿No tienes una cuenta?
                            <button @click="showRegister = true" class="text-[#037995] hover:underline font-medium">
                                Registrarse
                            </button>
                        </p>
                    </div>
                </div>

                <!-- Formulario de registro -->
                <div x-show="showRegister">
                    <h2 class="text-xl font-semibold text-white mb-6 text-center">Crear Cuenta</h2>

                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Nombre</label>
                                <input
                                    type="text"
                                    x-model="registerForm.firstName"
                                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                    placeholder="Juan" />
                            </div>
                            <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Apellido</label>
                                <input
                                    type="text"
                                    x-model="registerForm.lastName"
                                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                    placeholder="Pérez" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                x-model="registerForm.email"
                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                placeholder="tu@email.com" />
                        </div>

                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Contraseña</label>
                            <input
                                type="password"
                                x-model="registerForm.password"
                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                placeholder="••••••••" />
                        </div>

                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Confirmar Contraseña</label>
                            <input
                                type="password"
                                x-model="registerForm.confirmPassword"
                                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#037995]"
                                placeholder="••••••••" />
                        </div>

                        <button
                            @click="register"
                            class="w-full py-3 px-4 bg-[#037995] text-white font-medium rounded-lg shadow-lg hover:bg-[#026980] transition-all duration-300 flex items-center justify-center">
                            <span class="mr-2">Registrarse</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                        </button>
                    </div>

                    <div class="mt-6 text-center">
                        <p class="text-gray-400">
                            ¿Ya tienes una cuenta?
                            <button @click="showRegister = false" class="text-[#037995] hover:underline font-medium">
                                Iniciar Sesión
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="py-4 text-center text-gray-500 text-sm relative z-10">
            &copy; <span x-text="new Date().getFullYear()"></span> Sistema de Gestión de Transporte. Todos los derechos reservados.
        </footer>
    </div>


    @endsection

    @section('scripts')
    <script>
        function transportApp() {
            return {
                currentScreen: 'login',
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

                login() {
                    console.log('Iniciando sesión con:', this.loginForm);
                    this.currentScreen = 'dashboard';
                    window.location.href = '/'
                },

                register() {
                    console.log('Registrando usuario:', this.registerForm);
                    this.showRegister = false;
                    alert('Registro exitoso. Por favor inicia sesión.');
                }
            };
        }
    </script>
    @endsection
