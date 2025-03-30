'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import ServerInstall from './components/ServerInstall';
import ProxyInstall from './components/ProxyInstall';
import AgentInstall from './components/AgentInstall';
import SoftwareRepo from './components/SoftwareRepo';

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
                return <ServerInstall data-oid=":7dg.7v" />;
            case 'proxy':
                return <ProxyInstall data-oid="x2einm." />;
            case 'agent':
                return <AgentInstall data-oid="b3m53kr" />;
            case 'repo':
                return <SoftwareRepo data-oid="rg3kt-9" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="hxd1b12">
            <Sidebar data-oid="63ly8:s" />
            <div className="flex-1 flex flex-col overflow-hidden" data-oid="n1xf_9l">
                <Header
                    title="安装管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="adlwc1u"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid="m2yvcih">
                    <div className="max-w-7xl mx-auto" data-oid="3p5zjpg">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}
