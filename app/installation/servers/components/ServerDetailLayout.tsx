'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar';

interface ServerDetailLayoutProps {
    children: ReactNode;
}

export default function ServerDetailLayout({ children }: ServerDetailLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
} 