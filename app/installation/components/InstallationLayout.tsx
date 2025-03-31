'use client';

import { useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

const TABS = [
    { id: 'server', name: 'Zabbix实例' },
    { id: 'proxy', name: 'Proxy安装' },
    { id: 'agent', name: 'Agent安装' },
    { id: 'repo', name: '软件源' },
];

interface InstallationLayoutProps {
    children: ReactNode;
}

export default function InstallationLayout({ children }: InstallationLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    
    // 根据当前路径设置活动标签
    const currentTab = pathname.includes('/servers') ? 'server'
        : pathname.includes('/proxies') ? 'proxy'
        : pathname.includes('/agents') ? 'agent'
        : pathname.includes('/repositories') ? 'repo'
        : 'server';

    const [activeTab, setActiveTab] = useState(currentTab);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        switch (tabId) {
            case 'server':
                router.push('/installation/servers');
                break;
            case 'proxy':
                router.push('/installation/proxies');
                break;
            case 'agent':
                router.push('/installation/agents');
                break;
            case 'repo':
                router.push('/installation/repositories');
                break;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title="安装管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 