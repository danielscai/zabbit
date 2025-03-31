'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import DatabaseBackupTab from '@/app/server/components/DatabaseBackupTab';
import ConfigBackupTab from '@/app/server/components/ConfigBackupTab';
import DataArchiveTab from '@/app/server/components/DataArchiveTab';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions
} from 'chart.js';

// 动态导入图表组件
const Line = dynamic(
    () => import('react-chartjs-2').then(mod => mod.Line),
    { ssr: false }
);

// 注册 Chart.js 组件
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface MetricData extends ChartData<'line'> {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        tension?: number;
        fill?: boolean;
        pointRadius?: number;
        borderWidth?: number;
    }[];
}

const TABS = [
    { id: 'overview', name: '概览', path: '' },
    { id: 'database-backup', name: '数据库备份', path: '/database-backup' },
    { id: 'config-backup', name: '配置备份', path: '/config-backup' },
    { id: 'data-archive', name: '数据归档', path: '/data-archive' },
];

interface ServerDetailProps {
    serverId: string;
    activeTab?: string;
}

export default function ServerDetail({ serverId, activeTab = 'overview' }: ServerDetailProps) {
    const router = useRouter();
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
                borderColor: 'rgba(94, 129, 244, 1)',
                backgroundColor: 'rgba(94, 129, 244, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                borderWidth: 3,
            },
            {
                label: '内存使用率',
                data: Array.from({ length: 24 }, () => Math.random() * 100),
                borderColor: 'rgba(255, 145, 156, 1)',
                backgroundColor: 'rgba(255, 145, 156, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                borderWidth: 3,
            },
        ],
    });

    const handleTabChange = (tabId: string) => {
        const tab = TABS.find(t => t.id === tabId);
        if (tab) {
            router.push(`/installation/servers/${serverId}${tab.path}`);
        }
    };

    const handleBack = () => {
        router.push('/installation/servers');
    };

    // 预加载数据
    useEffect(() => {
        const preloadData = async () => {
            try {
                // 这里可以添加实际的数据获取逻辑
                // const response = await fetch(`/api/servers/${serverId}`);
                // const data = await response.json();
                // setServerInfo(data);
            } catch (error) {
                console.error('Failed to load server data:', error);
            }
        };

        preloadData();
    }, [serverId]);

    return (
        <div className="flex-1 flex flex-col">
            {/* 固定在顶部的标题和标签页 */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800">
                {/* 顶部标题和返回按钮 */}
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center">
                        <button
                            onClick={handleBack}
                            className="mr-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {serverInfo.name}
                        </h1>
                    </div>
                </div>

                {/* 标签页导航 */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-6">
                        <nav className="flex space-x-8">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
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

            {/* 可滚动的内容区域 */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="space-y-6">
                        {activeTab === 'overview' && (
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
                                        <Line options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: 'top' as const,
                                                    labels: {
                                                        usePointStyle: true,
                                                        pointStyle: 'circle',
                                                        padding: 20,
                                                        font: {
                                                            size: 12,
                                                            family: "'Inter', sans-serif"
                                                        }
                                                    }
                                                },
                                                title: {
                                                    display: false
                                                },
                                                tooltip: {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    titleColor: '#1a1a1a',
                                                    bodyColor: '#1a1a1a',
                                                    borderColor: 'rgba(0, 0, 0, 0.1)',
                                                    borderWidth: 1,
                                                    padding: 12,
                                                    boxPadding: 6,
                                                    usePointStyle: true,
                                                    bodyFont: {
                                                        size: 12,
                                                        family: "'Inter', sans-serif"
                                                    }
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    max: 100,
                                                    grid: {
                                                        color: 'rgba(0, 0, 0, 0.05)',
                                                        border: {
                                                            display: false
                                                        }
                                                    },
                                                    ticks: {
                                                        padding: 10,
                                                        color: 'rgba(0, 0, 0, 0.6)',
                                                        font: {
                                                            size: 11
                                                        }
                                                    },
                                                    title: {
                                                        display: true,
                                                        text: '使用率 (%)',
                                                        padding: 10,
                                                        color: 'rgba(0, 0, 0, 0.6)',
                                                        font: {
                                                            size: 12,
                                                            weight: 500
                                                        }
                                                    }
                                                },
                                                x: {
                                                    grid: {
                                                        display: false,
                                                        border: {
                                                            display: false
                                                        }
                                                    },
                                                    ticks: {
                                                        padding: 10,
                                                        color: 'rgba(0, 0, 0, 0.6)',
                                                        font: {
                                                            size: 11
                                                        }
                                                    }
                                                }
                                            }
                                        } as ChartOptions<'line'>} data={metrics} 
                                        style={{ height: '400px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'database-backup' && (
                            <DatabaseBackupTab />
                        )}

                        {activeTab === 'config-backup' && (
                            <ConfigBackupTab />
                        )}

                        {activeTab === 'data-archive' && (
                            <DataArchiveTab />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 