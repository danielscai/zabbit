'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import HostManagementTab from './components/HostManagementTab';
import UserManagementTab from './components/UserManagementTab';
import BatchConfigTab from './components/BatchConfigTab';

const TABS = [
    { id: 'host', name: '主机管理' },
    { id: 'user', name: '用户管理' },
    { id: 'batch', name: '批量配置' },
];

export default function MonitorPage() {
    const [activeTab, setActiveTab] = useState('host');

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title="监控管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'host' && <HostManagementTab />}
                        {activeTab === 'user' && <UserManagementTab />}
                        {activeTab === 'batch' && <BatchConfigTab />}
                    </div>
                </main>
            </div>
        </div>
    );
} 