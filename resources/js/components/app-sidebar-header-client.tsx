import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

const links = [
    {
        name: 'Inicio',
        href: '/dashboard',
        current: false,
    },
    {
        name: 'Envío de Paquetes',
        href: '/shipings',
        current: false,
    },
    {
        name: 'Compra de Boletos',
        href: '/tickets',
        current: false,
    },
    {
        name: 'Reserva de Boletos',
        href: '/reservations',
        current: false,
    },
];

export function AppSidebarHeaderClient() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {
        url,
        props: { auth },
    } = usePage<SharedData>();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <>
            <nav className="border-b border-gray-700 bg-gray-800 shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo y nombre del sistema */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img src="/img/logo.png" alt="" className="h-14 w-14" />
                            </div>
                            <div className="ml-4 text-xl font-bold text-white">
                                <span className="text-[#037995]">Trans</span>
                                <span className="text-[#CE4B85]">Port</span>
                            </div>
                        </div>

                        {/* Enlaces de navegación */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn([
                                            'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                                            url.includes(link.href) ? 'bg-[#037995] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        ])}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Perfil de usuario */}
                        <div className="flex items-center">
                            <div className="relative ml-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                                        <span className="sr-only">Abrir menú de usuario</span>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#037995] font-semibold text-white">
                                            {auth.user.name[0]}
                                        </div>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="flex flex-col">
                                            <span className="font-bold uppercase">Mi cuenta</span>
                                            <span className="text-xs">{auth.user.email}</span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
                                        <DropdownMenuItem>Mis Reservas</DropdownMenuItem>
                                        <DropdownMenuItem>Mis Envíos</DropdownMenuItem>
                                        <DropdownMenuItem>Configuración</DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link className="block w-full" method="post" href={route('logout')} as="button">
                                                <LogOut className="mr-2" />
                                                Cerrar Sesión
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Botón de menú móvil */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                            >
                                <span className="sr-only">Abrir menú principal</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú móvil */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {['dashboard', 'shipping', 'tickets', 'history'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`block w-full rounded-md px-3 py-2 text-left text-base font-medium ${
                                        activeTab === tab ? 'bg-[#037995] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {tab === 'dashboard' && 'Inicio'}
                                    {tab === 'shipping' && 'Envío de Paquetes'}
                                    {tab === 'tickets' && 'Compra de Boletos'}
                                    {tab === 'history' && 'Mis Viajes'}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
