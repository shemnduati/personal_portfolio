import React from 'react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Toaster } from 'sonner';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            {children}
            <Toaster position="top-right" />
        </AppSidebarLayout>
    );
}
