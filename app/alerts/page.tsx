'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import AlertSummaryTab from './components/AlertSummaryTab';
import AlertCenterTab from './components/AlertCenterTab';
import AlertNoiseReductionTab from './components/AlertNoiseReductionTab';
import AlertChannelTab from './components/AlertChannelTab';
import AlertProcessingTab from './components/AlertProcessingTab';
import AlertRootCauseTab from './components/AlertRootCauseTab';

const TABS = [
    { id: 'alert-summary', name: '告警汇总' },
    { id: 'alert-center', name: '告警中心' },
    { id: 'alert-noise-reduction', name: '告警降噪' },
    { id: 'alert-channel', name: '告警通道管理' },
    { id: 'alert-processing', name: '告警处理能力' },
    { id: 'alert-root-cause', name: '告警归因分析' },
];

export default function AlertManagementPage() {
    const [activeTab, setActiveTab] = useState('alert-summary');

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="alert-management-page">
            <Sidebar data-oid="alert-sidebar" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="alert-content">
                <Header
                    title="告警管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="alert-header"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid="alert-main">
                    <div className="max-w-7xl mx-auto" data-oid="alert-container">
                        {activeTab === 'alert-summary' && (
                            <AlertSummaryTab data-oid="summary-tab" />
                        )}
                        {activeTab === 'alert-center' && <AlertCenterTab data-oid="center-tab" />}
                        {activeTab === 'alert-noise-reduction' && (
                            <AlertNoiseReductionTab data-oid="noise-reduction-tab" />
                        )}
                        {activeTab === 'alert-channel' && (
                            <AlertChannelTab data-oid="channel-tab" />
                        )}
                        {activeTab === 'alert-processing' && (
                            <AlertProcessingTab data-oid="processing-tab" />
                        )}
                        {activeTab === 'alert-root-cause' && (
                            <AlertRootCauseTab data-oid="root-cause-tab" />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
