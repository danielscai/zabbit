'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData
} from 'chart.js';
import { toast } from 'react-hot-toast';
import DatabaseBackupTab from '@/app/server/components/DatabaseBackupTab';
import ConfigBackupTab from '@/app/server/components/ConfigBackupTab';
import DataArchiveTab from '@/app/server/components/DataArchiveTab';
import { Form, Button, Table, Modal, Input, message, Tabs, Card, Alert, List, Timeline, Collapse } from 'antd';
import { PlusOutlined, DownOutlined, RightOutlined, HistoryOutlined } from '@ant-design/icons';
import { Line as AntLine } from '@ant-design/plots';
import DeploymentLogs from './DeploymentLogs';
import Link from 'next/link';

// 注册 Chart.js 组件
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
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

interface Region {
    id: string;
    name: string;
    createdAt: string;
}

interface HealthMetric {
    time: string;
    value: number;
    category: string;
}

interface AlertChannel {
    name: string;
    channel: string;
    description: string;
}

interface MonitoringEvent {
    time: string;
    event: string;
    status: string;
    channel: string;
}

interface ServerDetailProps {
    serverId: string;
    activeTab?: string;
    children?: React.ReactNode;
}

interface ServerInfo {
    id: string;
    name: string;
    organization: string;
    region: string;
    mode: string;
    status: string;
    version: string;
    uptime: string;
    lastBackup: string;
    lastConfigBackup: string;
    createdAt: string;
    metrics: {
        id: string;
        metricType: string;
        value: number;
        timestamp: string;
    }[];
}

const TABS = [
    { id: 'overview', name: '概览', path: '' },
    { id: 'management', name: '管理', path: '/management' },
    { id: 'self-monitoring', name: '自监控', path: '/self-monitoring' },
    { id: 'database-backup', name: '数据库备份', path: '/database-backup' },
    { id: 'config-backup', name: '配置备份', path: '/config-backup' },
    { id: 'data-archive', name: '数据归档', path: '/data-archive' },
    { id: 'delete', name: '删除', path: '/delete', className: 'text-red-500 hover:text-red-700' }
];

export default function ServerDetail({ serverId, activeTab = 'overview', children }: ServerDetailProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showDeployLogs, setShowDeployLogs] = useState(true);
    const [isDeployLogsModalOpen, setIsDeployLogsModalOpen] = useState(false);
    const [serverInfo, setServerInfo] = useState<ServerInfo>({
        id: serverId,
        name: '实例名称',
        organization: '组织',
        region: '区域',
        mode: 'single',
        status: 'running',
        version: '1.0.0',
        uptime: '24h',
        lastBackup: '2024-03-20',
        lastConfigBackup: '2024-03-20',
        createdAt: '',
        metrics: []
    });
    const [metrics, setMetrics] = useState<MetricData>({
        labels: [],
        datasets: []
    });

    // 检查是否需要显示部署日志
    const shouldShowDeployLogs = serverInfo.status === 'installing' || serverInfo.status === 'error';

    useEffect(() => {
        fetchServerDetails();
    }, [serverId]);

    useEffect(() => {
        // 如果状态是 installing 或 error，自动展开部署日志
        if (shouldShowDeployLogs) {
            setShowDeployLogs(true);
        }
    }, [serverInfo.status]);

    const fetchServerDetails = async () => {
        try {
            const response = await fetch(`/api/zabbix/instances/${serverId}`);
            if (!response.ok) {
                throw new Error('获取服务器详情失败');
            }
            const data = await response.json();
            setServerInfo(data);

            // 处理监控指标数据
            if (data.metrics && data.metrics.length > 0) {
                const timestamps = Array.from(new Set(data.metrics.map((m: any) => 
                    new Date(m.timestamp).toLocaleTimeString('zh-CN')
                )) as Set<string>).sort();

                const cpuData = data.metrics
                    .filter((m: any) => m.metricType === 'cpu')
                    .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                    .map((m: any) => m.value);

                const memoryData = data.metrics
                    .filter((m: any) => m.metricType === 'memory')
                    .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                    .map((m: any) => m.value);

                setMetrics({
                    labels: timestamps,
                    datasets: [
                        {
                            label: 'CPU使用率',
                            data: cpuData,
                            borderColor: 'rgba(94, 129, 244, 1)',
                            backgroundColor: 'rgba(94, 129, 244, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,
                            borderWidth: 3,
                        },
                        {
                            label: '内存使用率',
                            data: memoryData,
                            borderColor: 'rgba(255, 145, 156, 1)',
                            backgroundColor: 'rgba(255, 145, 156, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,
                            borderWidth: 3,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error('获取服务器详情失败:', error);
            toast.error('获取服务器详情失败');
        }
    };

    const handleTabChange = (tabId: string) => {
        const tab = TABS.find(t => t.id === tabId);
        if (tab) {
            router.push(`/installation/servers/${serverId}${tab.path}`);
        }
    };

    const handleBack = () => {
        router.push('/installation/servers');
    };

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

    return (
        <div className="flex flex-col h-full">
            {/* 固定头部 */}
            <div className="flex-none">
                <div className="p-6">
                    {/* 顶部标题栏 */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/installation/servers')}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {serverInfo.name}
                            </h1>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                serverInfo.status === 'running' ? 'bg-green-100 text-green-800' :
                                serverInfo.status === 'stopped' ? 'bg-gray-100 text-gray-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {serverInfo.status === 'running' ? '运行中' : serverInfo.status === 'stopped' ? '已停止' : '错误'}
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <Link
                                        key={tab.id}
                                        href={`/installation/servers/${serverId}${tab.path}`}
                                        className={`
                                            ${isActive
                                                ? 'border-purple-500 text-purple-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }
                                            ${tab.className || ''}
                                            whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                                        `}
                                    >
                                        {tab.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* 可滚动内容区域 */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    {/* 内容区域 */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* 顶部4个概览卡片 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">状态</h4>
                                    <p className={`mt-2 text-lg font-semibold ${
                                        serverInfo.status === 'running' ? 'text-green-600' :
                                        serverInfo.status === 'stopped' ? 'text-gray-600' :
                                        'text-red-600'
                                    }`}>
                                        {serverInfo.status === 'running' ? '运行中' : 
                                         serverInfo.status === 'stopped' ? '已停止' : '错误'}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">版本</h4>
                                    <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {serverInfo.version}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">运行时间</h4>
                                    <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {serverInfo.uptime}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">最后备份</h4>
                                    <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {new Date(serverInfo.lastBackup).toLocaleString('zh-CN')}
                                    </p>
                                </div>
                            </div>

                            {/* 主要内容区域：左侧信息 + 右侧图表和日志 */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* 左侧：基本信息 */}
                                <div className="lg:col-span-1 space-y-6">
                                    {/* 基本信息卡片 */}
                                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                                        <div className="px-6 py-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-b border-gray-100">
                                            <h4 className="text-base font-semibold text-gray-900 dark:text-white">基本信息</h4>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="col-span-2">
                                                    <div className="flex items-center space-x-3 mb-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm text-gray-500">组织</div>
                                                            <div className="text-base font-medium text-gray-900 dark:text-white">
                                                                {serverInfo.organization}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex flex-col">
                                                        <div className="text-sm text-gray-500 mb-1">区域</div>
                                                        <div className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                            </svg>
                                                            {serverInfo.region}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex flex-col">
                                                        <div className="text-sm text-gray-500 mb-1">部署模式</div>
                                                        <div className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                                            </svg>
                                                            {serverInfo.mode === 'single' ? '单机' : serverInfo.mode === 'cluster' ? '集群' : '分布式'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-2">
                                                    <div className="flex flex-col">
                                                        <div className="text-sm text-gray-500 mb-1">部署时间</div>
                                                        <div className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                            </svg>
                                                            {new Date(serverInfo.createdAt).toLocaleString('zh-CN')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {!shouldShowDeployLogs && (
                                            <div className="px-6 pb-6">
                                                <Button 
                                                    type="default"
                                                    icon={<HistoryOutlined />}
                                                    onClick={() => setIsDeployLogsModalOpen(true)}
                                                    className="w-full h-10 flex items-center justify-center bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:text-purple-700 transition-colors"
                                                >
                                                    查看部署记录
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* 备份信息卡片 */}
                                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                                        <div className="px-6 py-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-b border-gray-100">
                                            <h4 className="text-base font-semibold text-gray-900 dark:text-white">备份信息</h4>
                                        </div>
                                        <div className="p-6">
                                            <dl className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <dt className="flex items-center text-sm text-gray-500">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zm0 0h16"/>
                                                        </svg>
                                                        数据库备份
                                                    </dt>
                                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {new Date(serverInfo.lastBackup).toLocaleString('zh-CN')}
                                                    </dd>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <dt className="flex items-center text-sm text-gray-500">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        </svg>
                                                        配置备份
                                                    </dt>
                                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {new Date(serverInfo.lastConfigBackup).toLocaleString('zh-CN')}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </div>

                                {/* 右侧：监控图表和部署日志 */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* 监控图表 */}
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ height: '300px' }}>
                                        <Line options={{
                                            ...chartOptions,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                ...chartOptions.plugins,
                                                title: {
                                                    ...chartOptions.plugins.title,
                                                    text: '资源使用率'
                                                }
                                            }
                                        }} data={metrics} />
                                    </div>

                                    {/* 部署状态提示 */}
                                    {shouldShowDeployLogs && (
                                        <Alert
                                            message={
                                                <div className="flex items-center justify-between">
                                                    <span>
                                                        {serverInfo.status === 'installing' ? '正在部署中...' : '部署出现错误'}
                                                    </span>
                                                    <Button 
                                                        type="link" 
                                                        onClick={() => setShowDeployLogs(!showDeployLogs)}
                                                        icon={showDeployLogs ? <DownOutlined /> : <RightOutlined />}
                                                    >
                                                        {showDeployLogs ? '收起日志' : '展开日志'}
                                                    </Button>
                                                </div>
                                            }
                                            type={serverInfo.status === 'installing' ? 'info' : 'error'}
                                            showIcon
                                        />
                                    )}

                                    {/* 部署日志（可折叠） */}
                                    {shouldShowDeployLogs && showDeployLogs && (
                                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                                            <DeploymentLogs 
                                                instanceId={serverId} 
                                                refreshInterval={10000}
                                                autoRefresh={serverInfo.status === 'installing'} 
                                            />
                                        </div>
                                    )}
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

                    {activeTab === 'self-monitoring' && (
                        <SelfMonitoringTab serverId={serverId} />
                    )}

                    {activeTab === 'delete' && children}
                </div>
            </div>

            {/* 部署日志历史弹窗 */}
            <Modal
                title="部署记录"
                open={isDeployLogsModalOpen}
                onCancel={() => setIsDeployLogsModalOpen(false)}
                width={800}
                footer={null}
                className="deployment-logs-modal"
            >
                <div className="py-2">
                    <Alert
                        message="部署记录包含了服务器的完整部署历史，可用于追踪部署过程和排查问题。"
                        type="info"
                        showIcon
                        className="mb-4"
                    />
                    <DeploymentLogs 
                        instanceId={serverId} 
                        refreshInterval={0}
                        autoRefresh={false}
                    />
                </div>
            </Modal>
        </div>
    );
}

interface ManagementTabProps {
    serverId: string;
}

function ManagementTab({ serverId }: ManagementTabProps) {
    const [regions, setRegions] = useState<Region[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        {
            title: '区域名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        }
    ];

    const handleAddRegion = async (values: { name: string }) => {
        try {
            // TODO: 调用API创建新区域
            const newRegion = {
                id: Date.now().toString(),
                name: values.name,
                createdAt: new Date().toLocaleString()
            };
            setRegions([...regions, newRegion]);
            message.success('区域创建成功');
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            message.error('创建失败');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            区域管理
                        </h3>
                        <Button 
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsModalOpen(true)}
                        >
                            添加区域
                        </Button>
                    </div>
                </div>
                <div className="p-6">
                    <Table 
                        columns={columns}
                        dataSource={regions}
                        rowKey="id"
                    />
                </div>
            </div>

            <Modal
                title="添加新区域"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleAddRegion}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="区域名称"
                        rules={[{ required: true, message: '请输入区域名称' }]}
                    >
                        <Input placeholder="例如：上海、北京" />
                    </Form.Item>
                    <Form.Item className="text-right">
                        <Button type="default" className="mr-2" onClick={() => setIsModalOpen(false)}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

interface SelfMonitoringTabProps {
    serverId: string;
}

function SelfMonitoringTab({ serverId }: SelfMonitoringTabProps) {
    const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
        { time: '00:00', value: 95, category: '系统健康度' },
        { time: '04:00', value: 92, category: '系统健康度' },
        { time: '08:00', value: 88, category: '系统健康度' },
        { time: '12:00', value: 95, category: '系统健康度' },
        { time: '16:00', value: 90, category: '系统健康度' },
        { time: '20:00', value: 93, category: '系统健康度' },
    ]);

    const alertChannels: AlertChannel[] = [
        { name: '紧急告警', channel: 'Telegram群组', description: '服务器宕机、数据库不可用等紧急情况' },
        { name: '重要告警', channel: '企业微信', description: '性能告警、磁盘空间不足等重要问题' },
        { name: '普通告警', channel: '邮件', description: '日常监控指标异常' },
    ];

    const recentEvents: MonitoringEvent[] = [
        { time: '2024-03-31 15:00', event: 'CPU使用率超过90%', status: '已通知', channel: 'Telegram' },
        { time: '2024-03-31 14:30', event: '磁盘使用率达到警戒值', status: '已处理', channel: '企业微信' },
        { time: '2024-03-31 13:45', event: '数据库连接数异常', status: '处理中', channel: '邮件' },
    ];

    const config = {
        data: healthMetrics,
        xField: 'time',
        yField: 'value',
        seriesField: 'category',
        smooth: true,
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '健康度 (%)',
            },
        },
        tooltip: {
            title: '时间',
            formatter: (datum: HealthMetric) => {
                return { name: datum.category, value: datum.value + '%' };
            },
        },
        animation: {
            appear: {
                animation: 'path-in',
                duration: 1000,
            },
        },
    };

    return (
        <div className="space-y-6">
            {/* 健康度图表 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        系统健康度
                    </h3>
                </div>
                <div className="p-6" style={{ height: '300px' }}>
                    <AntLine {...config} />
                </div>
            </div>

            {/* 告警通道配置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        告警通道配置
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {alertChannels.map((channel, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white">{channel.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{channel.channel}</p>
                                <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 最近事件 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        最近事件
                    </h3>
                </div>
                <div className="p-6">
                    <List
                        dataSource={recentEvents}
                        renderItem={(event) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={event.event}
                                    description={
                                        <div className="text-sm text-gray-500">
                                            通知渠道: {event.channel} | 状态: {event.status} | 时间: {event.time}
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
} 