'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import ExtensionCard from '@/components/ExtensionCard';
import ExtensionDetailModal from '@/components/ExtensionDetailModal';
import { Calendar, Bot, Zap, BarChart3, Brain } from 'lucide-react';

interface Extension {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
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
            icon: <Calendar className="w-6 h-6 text-purple-500" data-oid="orsgq53" />,
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
            icon: <Bot className="w-6 h-6 text-purple-500" data-oid="6tln:ig" />,
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
            icon: <Zap className="w-6 h-6 text-purple-500" data-oid="2sf0002" />,
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
            icon: <BarChart3 className="w-6 h-6 text-purple-500" data-oid="dksi:e2" />,
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
            icon: <Brain className="w-6 h-6 text-purple-500" data-oid="9jd_eim" />,
            usedTimes: 7890,
            indicators: [
                { name: 'ModelId', description: '模型ID' },
                { name: 'AnalysisType', description: '分析类型' },
            ],
        },
    ],

    installed: [],
};

export default function ExtensionsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null);
    const [installedExtensions, setInstalledExtensions] = useState<string[]>(['trading-calendar']);

    useState(() => {
        const defaultInstalled = MOCK_EXTENSIONS.all.find((ext) => ext.id === 'trading-calendar');
        if (defaultInstalled) {
            MOCK_EXTENSIONS.installed.push(defaultInstalled);
        }
    });

    const handleInstall = (id: string) => {
        setInstalledExtensions((prev) => [...prev, id]);
        const extension = MOCK_EXTENSIONS.all.find((ext) => ext.id === id);
        if (extension) {
            MOCK_EXTENSIONS.installed.push(extension);
        }
    };

    const handleUninstall = (id: string) => {
        setInstalledExtensions((prev) => prev.filter((extId) => extId !== id));
        MOCK_EXTENSIONS.installed = MOCK_EXTENSIONS.installed.filter((ext) => ext.id !== id);
    };

    const getExtensions = () => {
        if (activeTab === 'installed') {
            return MOCK_EXTENSIONS.installed;
        }
        return MOCK_EXTENSIONS.all;
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="s43r5y3">
            <Sidebar data-oid="s:gvzm1" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="fbp9tk4">
                <Header
                    title="扩展商店"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="w-qwmes"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid="kqmm_so">
                    <div className="max-w-7xl mx-auto" data-oid="hjo6xt_">
                        <div
                            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            data-oid="3x--rww"
                        >
                            {getExtensions().map((extension: Extension) => (
                                <ExtensionCard
                                    key={extension.id}
                                    {...extension}
                                    onClick={() => setSelectedExtension(extension)}
                                    isInstalled={installedExtensions.includes(extension.id)}
                                    onInstall={handleInstall}
                                    onUninstall={handleUninstall}
                                    data-oid="._uydas"
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
                data-oid="6wh7hxz"
            />
        </div>
    );
}
