import AppLayoutTemplateClient from '@/layouts/app/app-sidebar-layout-client';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => <AppLayoutTemplateClient {...props}>{children}</AppLayoutTemplateClient>;
