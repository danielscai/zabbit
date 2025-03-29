'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import CMDBIntegrationTab from './components/CMDBIntegrationTab';
import DataIntegrationTab from './components/DataIntegrationTab';
import AlertIntegrationTab from './components/AlertIntegrationTab';

const TABS = [
    { id: 'cmdb', name: 'CMDB集成' },
    { id: 'data', name: '数据集成' },
    { id: 'alert', name: '报警中心集成' },
];

export default function IntegrationPage() {
    const [activeTab, setActiveTab] = useState('cmdb');

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title="集成管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'cmdb' && <CMDBIntegrationTab />}
                        {activeTab === 'data' && <DataIntegrationTab />}
                        {activeTab === 'alert' && <AlertIntegrationTab />}
                    </div>
                </main>
            </div>
        </div>
    );
}
