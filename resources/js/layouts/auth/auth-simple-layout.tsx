import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    className?: string;
}

export default function AuthSimpleLayout({ children, title, description, className }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div
            className={cn([
                'bg-background relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden p-6 md:p-10',
                className,
            ])}
        >
            <div className="absolute inset-0 z-0">
                <div className="grid-background"></div>
            </div>

            <div className="bg-pulse absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-[#037995] opacity-20 blur-[100px] filter"></div>
            <div className="bg-pulse absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-[#CE4B85] opacity-20 blur-[100px] filter"></div>

            <div className="z-10 w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex size-32 items-center justify-center rounded-md">
                                <AppLogoIcon className="w-full" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <h1 className="mb-2 text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                            <span className="text-[#CE4B85]">Trans</span>
                            <span className="text-[#037995]">Tarija</span>
                        </h1>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
