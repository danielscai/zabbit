'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import MultiServerTab from './components/MultiServerTab';
import DatabaseBackupTab from './components/DatabaseBackupTab';
import ConfigBackupTab from './components/ConfigBackupTab';
import DataArchiveTab from './components/DataArchiveTab';

const TABS = [
    { id: 'multi-server', name: '多Server管理' },
    { id: 'database-backup', name: '数据库备份' },
    { id: 'config-backup', name: '配置备份' },
    { id: 'data-archive', name: '数据归档' },
];

export default function ServerManagementPage() {
    const [activeTab, setActiveTab] = useState('multi-server');

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="3ap.uf-">
            <Sidebar data-oid="dvng2do" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="9i5dwld">
                <Header
                    title="Server 管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="watwc67"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid="h-aj6iw">
                    <div className="max-w-7xl mx-auto" data-oid="3hsw7u3">
                        {activeTab === 'multi-server' && <MultiServerTab data-oid="9hlz509" />}
                        {activeTab === 'database-backup' && (
                            <DatabaseBackupTab data-oid="kle89gj" />
                        )}
                        {activeTab === 'config-backup' && <ConfigBackupTab data-oid="-tvvj_6" />}
                        {activeTab === 'data-archive' && <DataArchiveTab data-oid="fgg1_jq" />}
                    </div>
                </main>
            </div>
        </div>
    );
}
