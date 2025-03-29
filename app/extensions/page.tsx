'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import ExtensionCard from '@/components/ExtensionCard';
import ExtensionDetailModal from '@/components/ExtensionDetailModal';

interface Extension {
    id: string;
    title: string;
    description: string;
    icon: string;
    usedTimes: number;
    indicators: Array<{
        name: string;
        description: string;
    }>;
}

interface ExtensionsData {
    [key: string]: Extension[];
}

const TABS = [
    { id: 'all', name: '全部扩展' },
    { id: 'installed', name: '已安装' },
];

const MOCK_EXTENSIONS: ExtensionsData = {
    all: [
        {
            id: 'trading-calendar',
            title: '交易日历',
            description: '智能交易日历管理，支持节假日、工作日自动调整',
            icon: '/images/trading-calendar.png',
            usedTimes: 12345,
            indicators: [
                { name: 'CalendarId', description: '日历ID' },
                { name: 'Region', description: '地区' },
            ],
        },
        {
            id: 'auto-inspection',
            title: '自动巡检',
            description: '智能系统巡检，自动生成巡检报告',
            icon: '/images/auto-inspection.png',
            usedTimes: 8562,
            indicators: [
                { name: 'TaskId', description: '任务ID' },
                { name: 'Schedule', description: '巡检计划' },
            ],
        },
        {
            id: 'quick-config',
            title: '快速配置',
            description: '一键配置监控项，快速部署监控方案',
            icon: '/images/quick-config.png',
            usedTimes: 15678,
            indicators: [
                { name: 'TemplateId', description: '模板ID' },
                { name: 'Target', description: '目标系统' },
            ],
        },
        {
            id: 'alert-aggregation',
            title: '报警聚合',
            description: '智能报警聚合分析，减少误报和重复报警',
            icon: '/images/alert-aggregation.png',
            usedTimes: 23456,
            indicators: [
                { name: 'GroupId', description: '聚合组ID' },
                { name: 'Rules', description: '聚合规则' },
            ],
        },
        {
            id: 'ai-integration',
            title: 'AI 集成',
            description: '智能运维分析，预测性维护建议',
            icon: '/images/ai-integration.png',
            usedTimes: 7890,
            indicators: [
                { name: 'ModelId', description: '模型ID' },
                { name: 'AnalysisType', description: '分析类型' },
            ],
        },
    ],

    installed: [
        // 已安装的扩展列表
    ],
};

export default function ExtensionsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="5r_4:gr">
            <Sidebar data-oid="pdww_jo" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="7pg1_a-">
                <Header
                    title="扩展商店"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="u6a1qqb"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid="xgd0trv">
                    <div className="max-w-7xl mx-auto" data-oid="lotg6vn">
                        <div
                            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            data-oid="mii2161"
                        >
                            {MOCK_EXTENSIONS[activeTab].map((extension: Extension) => (
                                <ExtensionCard
                                    key={extension.id}
                                    {...extension}
                                    onClick={() => setSelectedExtension(extension)}
                                    data-oid="g_-7juw"
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <ExtensionDetailModal
                isOpen={!!selectedExtension}
                onClose={() => setSelectedExtension(null)}
                extension={selectedExtension}
                data-oid="xjazb.h"
            />
        </div>
    );
}
