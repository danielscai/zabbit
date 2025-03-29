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

const SUB_TABS = {
    host: [
        { id: 'groups', name: '主机组管理' },
        { id: 'hosts', name: '主机管理' },
    ],
    user: [
        { id: 'groups', name: '用户组管理' },
        { id: 'users', name: '用户管理' },
    ],
};

export default function MonitorPage() {
    const [activeTab, setActiveTab] = useState('host');
    const [activeSubTab, setActiveSubTab] = useState('groups');

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setActiveSubTab('groups'); // 重置子 Tab
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title="监控管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'host' && (
                            <>
                                <div className="mb-6">
                                    <div className="border-b border-gray-200 dark:border-gray-700">
                                        <nav className="-mb-px flex space-x-8">
                                            {SUB_TABS.host.map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveSubTab(tab.id)}
                                                    className={`${
                                                        activeSubTab === tab.id
                                                            ? 'border-purple-500 text-purple-600'
                                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                                >
                                                    {tab.name}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                                <HostManagementTab activeSection={activeSubTab as 'groups' | 'hosts'} />
                            </>
                        )}
                        {activeTab === 'user' && (
                            <>
                                <div className="mb-6">
                                    <div className="border-b border-gray-200 dark:border-gray-700">
                                        <nav className="-mb-px flex space-x-8">
                                            {SUB_TABS.user.map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveSubTab(tab.id)}
                                                    className={`${
                                                        activeSubTab === tab.id
                                                            ? 'border-purple-500 text-purple-600'
                                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                                >
                                                    {tab.name}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                                <UserManagementTab activeSection={activeSubTab as 'groups' | 'users'} />
                            </>
                        )}
                        {activeTab === 'batch' && <BatchConfigTab />}
                    </div>
                </main>
            </div>
        </div>
    );
} 