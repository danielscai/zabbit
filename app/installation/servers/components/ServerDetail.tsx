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
    Tooltip as ChartTooltip,
    Legend as ChartLegend,
    ChartData,
    ChartOptions
} from 'chart.js';
import { Form, Button, Table, Modal, Input, message, Tabs, Card, Alert, List, Timeline } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Line as AntLine } from '@ant-design/plots';

// 动态导入图表组件
const ChartLine = dynamic(
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
    ChartTooltip,
    ChartLegend
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

const TABS = [
    { id: 'overview', name: '概览', path: '' },
    { id: 'database-backup', name: '数据库备份', path: '/database-backup' },
    { id: 'config-backup', name: '配置备份', path: '/config-backup' },
    { id: 'data-archive', name: '数据归档', path: '/data-archive' },
    { id: 'management', name: '管理', path: '/management' },
    { id: 'self-monitoring', name: '自监控', path: '/self-monitoring' },
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
                                        <AntLine options={{
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

                        {activeTab === 'management' && (
                            <ManagementTab serverId={serverId} />
                        )}

                        {activeTab === 'self-monitoring' && (
                            <SelfMonitoringTab serverId={serverId} />
                        )}
                    </div>
                </div>
            </div>
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