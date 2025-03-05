import { AppSidebarHeaderClient } from '@/components/app-sidebar-header-client';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayoutClient({ children }: PropsWithChildren) {
    return (
        <>
            <AppSidebarHeaderClient />
            {children}
        </>
    );
}
