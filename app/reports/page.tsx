'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import ZabbixInspectionTab from './components/ZabbixInspectionTab';
import ServerInspectionTab from './components/ServerInspectionTab';
import BusinessInspectionTab from './components/BusinessInspectionTab';

const TABS = [
    { id: 'zabbix-inspection', name: 'Zabbix平台巡检' },
    { id: 'server-inspection', name: '服务器巡检' },
    { id: 'business-inspection', name: '业务巡检' },
];

export default function InspectionReportPage() {
    const [activeTab, setActiveTab] = useState('zabbix-inspection');

    return (
        <div
            className="flex h-screen bg-gray-50 dark:bg-gray-900"
            data-oid="inspection-report-page"
        >
            <Sidebar data-oid="inspection-sidebar" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="inspection-content">
                <Header
                    title="巡检报告"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="inspection-header"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid="inspection-main">
                    <div className="max-w-7xl mx-auto" data-oid="inspection-container">
                        {activeTab === 'zabbix-inspection' && (
                            <ZabbixInspectionTab data-oid="zabbix-tab" />
                        )}
                        {activeTab === 'server-inspection' && (
                            <ServerInspectionTab data-oid="server-tab" />
                        )}
                        {activeTab === 'business-inspection' && (
                            <BusinessInspectionTab data-oid="business-tab" />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
