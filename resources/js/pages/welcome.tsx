import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistema de Transporte">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Barra de navegación */}
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center">
                                <div className="flex flex-shrink-0 items-center">
                                    <img src="/img/logo.png" className="h-10 w-full" />
                                    <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">TransTarija</span>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    <a href="#" className="border-b-2 border-blue-500 px-3 pt-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Inicio
                                    </a>
                                    <a
                                        href="#"
                                        className="border-b-2 border-transparent px-3 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Servicios
                                    </a>
                                    <a
                                        href="#"
                                        className="border-b-2 border-transparent px-3 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Rutas
                                    </a>
                                    <a
                                        href="#"
                                        className="border-b-2 border-transparent px-3 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Contacto
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {auth.user ? (
                                    <div className="flex items-center">
                                        <span className="mr-4 text-sm text-gray-700 dark:text-gray-300">Bienvenido, {auth.user.name}</span>
                                        <Link
                                            href={route('dashboard')}
                                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            Panel
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="mr-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            Registrarse
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Banner principal */}
                <div className="">
                    <div className="mx-auto max-w-7xl px-4 py-52 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                                <span className="block">Transporte confiable y seguro</span>
                                <span className="block text-blue-200">para todos tus envíos y viajes</span>
                            </h1>
                            <p className="mx-auto mt-3 max-w-md text-base text-blue-100 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                                Ofrecemos servicios de transporte de pasajeros y encomiendas en las principales rutas del país.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Servicios principales */}
                <div className="bg-white py-12 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Nuestros Servicios</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300">
                                Elija entre nuestras opciones de transporte y envíos
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* Tarjeta para Comprar Boletos */}
                            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-lg dark:bg-gray-700">
                                <div className="p-6">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mt-5 text-center text-xl font-medium text-gray-900 dark:text-white">Compra de Boletos</h3>
                                    <p className="mt-2 text-center text-base text-gray-500 dark:text-gray-300">
                                        Adquiere tus boletos de viaje de forma rápida y segura.
                                    </p>
                                    <div className="mt-6 text-center">
                                        <a
                                            href="#"
                                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            Comprar Ahora
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta para Reservar Boletos */}
                            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-lg dark:bg-gray-700">
                                <div className="p-6">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mt-5 text-center text-xl font-medium text-gray-900 dark:text-white">Reserva de Boletos</h3>
                                    <p className="mt-2 text-center text-base text-gray-500 dark:text-gray-300">
                                        Reserva con anticipación para asegurar tu lugar en la fecha deseada.
                                    </p>
                                    <div className="mt-6 text-center">
                                        <a
                                            href="#"
                                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            Reservar Ahora
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta para Enviar Encomiendas */}
                            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-lg dark:bg-gray-700">
                                <div className="p-6">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mt-5 text-center text-xl font-medium text-gray-900 dark:text-white">Envío de Encomiendas</h3>
                                    <p className="mt-2 text-center text-base text-gray-500 dark:text-gray-300">
                                        Envía paquetes y documentos a cualquier destino de nuestra red.
                                    </p>
                                    <div className="mt-6 text-center">
                                        <a
                                            href="#"
                                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            Enviar Encomienda
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información adicional */}
                <div className="bg-white py-12 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">Ventajas</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                ¿Por qué elegirnos?
                            </p>
                        </div>

                        <div className="mt-10">
                            <dl className="space-y-10 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-8 md:gap-y-10">
                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Puntualidad garantizada</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Nuestros servicios salen y llegan a tiempo, valoramos tu tiempo y planificación.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Precios competitivos</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Ofrecemos las mejores tarifas del mercado sin comprometer la calidad del servicio.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Seguridad total</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Todos nuestros vehículos cuentan con sistemas de seguimiento GPS y conductores capacitados.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Comodidad</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Vehículos modernos con asientos cómodos, aire acondicionado y servicios adicionales para tu viaje.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Empresa</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Sobre Nosotros
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Testimonios
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Contacto
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Trabaja con nosotros
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Servicios</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Horarios
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Rutas
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Tarifas
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-300 hover:text-white">
                                            Promociones
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Contacto</h3>
                                <ul className="mt-4 space-y-4">
                                    <li className="flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 h-6 w-6 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span className="text-gray-300">+1 (123) 456-7890</span>
                                    </li>
                                    <li className="flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 h-6 w-6 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="text-gray-300">info@transporteexpress.com</span>
                                    </li>
                                    <li className="flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 h-6 w-6 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-gray-300">Av. Principal 123, Ciudad</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-700 pt-8">
                            <p className="text-center text-base text-gray-400">&copy; 2025 TransTarija. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
