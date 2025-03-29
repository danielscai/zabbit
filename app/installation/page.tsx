'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import ServerInstall from '@/components/installation/ServerInstall';
import ProxyInstall from '@/components/installation/ProxyInstall';
import AgentInstall from '@/components/installation/AgentInstall';
import SoftwareRepo from '@/components/installation/SoftwareRepo';

const TABS = [
    { id: 'server', name: 'Server安装' },
    { id: 'proxy', name: 'Proxy安装' },
    { id: 'agent', name: 'Agent安装' },
    { id: 'repo', name: '软件源' },
];

export default function InstallationPage() {
    const [activeTab, setActiveTab] = useState('server');

    const renderContent = () => {
        switch (activeTab) {
            case 'server':
                return <ServerInstall data-oid="o2fp_33" />;
            case 'proxy':
                return <ProxyInstall data-oid="hz48o_r" />;
            case 'agent':
                return <AgentInstall data-oid="9obyypt" />;
            case 'repo':
                return <SoftwareRepo data-oid="-z103cr" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="revt:1l">
            <Sidebar data-oid="0xnyzu3" />
            <div className="flex-1 flex flex-col overflow-hidden" data-oid="oq61orx">
                <Header
                    title="安装管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="1ug:mz_"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid=".gzvr:l">
                    <div className="max-w-7xl mx-auto" data-oid="w:ksodp">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}
