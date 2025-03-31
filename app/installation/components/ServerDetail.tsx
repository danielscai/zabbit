'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// 注册Chart.js组件
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ServerDetailProps {
    serverId: string;
    onBack: () => void;
}

interface MetricData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

const TABS = [
    { id: 'overview', name: '概览' },
    { id: 'database-backup', name: '数据库备份' },
    { id: 'config-backup', name: '配置备份' },
];

export default function ServerDetail({ serverId, onBack }: ServerDetailProps) {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [serverInfo, setServerInfo] = useState({
        id: serverId,
        name: '生产环境 Zabbix',
        organization: '技术部',
        region: '上海',
        mode: 'cluster',
        status: 'running',
        version: '6.4.0',
        uptime: '99.99%',
        lastBackup: '2024-03-29 12:00:00',
        lastConfigBackup: '2024-03-29 00:00:00'
    });

    const [metrics, setMetrics] = useState<MetricData>({
        labels: Array.from({ length: 24 }, (_, i) => `${23-i}:00`).reverse(),
        datasets: [
            {
                label: 'CPU使用率',
                data: Array.from({ length: 24 }, () => Math.random() * 100),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: '内存使用率',
                data: Array.from({ length: 24 }, () => Math.random() * 100),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: '资源使用率趋势（24小时）',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: '使用率 (%)'
                }
            }
        }
    };

    useEffect(() => {
        // 这里可以添加实际的数据获取逻辑
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [serverId]);

    const handleDatabaseBackup = () => {
        // 实现数据库备份逻辑
        console.log('开始数据库备份...');
    };

    const handleConfigBackup = () => {
        // 实现配置备份逻辑
        console.log('开始配置备份...');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    const renderOverviewTab = () => (
        <div className="space-y-6">
            {/* 基本信息卡片 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        基本信息
                    </h3>
                </div>
                <div className="px-6 py-4">
                    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">名称</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{serverInfo.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">组织</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{serverInfo.organization}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">地区</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{serverInfo.region}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">部署模式</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                {serverInfo.mode === 'single' ? '单机部署' : 
                                 serverInfo.mode === 'cluster' ? '集群部署' : '分布式部署'}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">版本</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{serverInfo.version}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">运行状态</dt>
                            <dd className="mt-1">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    serverInfo.status === 'running'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                        : serverInfo.status === 'stopped'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                }`}>
                                    {serverInfo.status === 'running' ? '运行中' : 
                                     serverInfo.status === 'stopped' ? '已停止' : '错误'}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* 资源使用率图表 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        资源使用率
                    </h3>
                </div>
                <div className="p-6">
                    <Line options={chartOptions} data={metrics} />
                </div>
            </div>
        </div>
    );

    const renderDatabaseBackupTab = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">数据库备份设置</h3>
                        <button
                            onClick={handleDatabaseBackup}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            立即备份
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                自动备份
                            </label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                                <option>每天</option>
                                <option>每周</option>
                                <option>每月</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                保留时间
                            </label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                                <option>7天</option>
                                <option>30天</option>
                                <option>90天</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">备份历史</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">backup_20240329_120000.sql</span>
                                    <span className="text-gray-500 dark:text-gray-400">2024-03-29 12:00:00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">backup_20240328_120000.sql</span>
                                    <span className="text-gray-500 dark:text-gray-400">2024-03-28 12:00:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderConfigBackupTab = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">配置备份设置</h3>
                        <button
                            onClick={handleConfigBackup}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            立即备份
                        </button>
                    </div>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                自动备份
                            </label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                                <option>每天</option>
                                <option>每周</option>
                                <option>每月</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                保留时间
                            </label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                                <option>7天</option>
                                <option>30天</option>
                                <option>90天</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">备份历史</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">config_20240329_000000.tar.gz</span>
                                    <span className="text-gray-500 dark:text-gray-400">2024-03-29 00:00:00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">config_20240328_000000.tar.gz</span>
                                    <span className="text-gray-500 dark:text-gray-400">2024-03-28 00:00:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* 顶部导航栏 */}
            <div className="bg-white dark:bg-gray-800 shadow">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={onBack}
                                className="mr-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {serverInfo.name}
                            </h2>
                        </div>
                    </div>
                    <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                        ${activeTab === tab.id
                                            ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                        }
                                    `}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'database-backup' && renderDatabaseBackupTab()}
            {activeTab === 'config-backup' && renderConfigBackupTab()}
        </div>
    );
} 