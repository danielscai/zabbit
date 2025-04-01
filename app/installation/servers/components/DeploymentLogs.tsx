import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface LogEntry {
    timestamp: string;
    message: string;
    level: 'info' | 'error' | 'warning';
    step: string;
    status: 'success' | 'running' | 'error' | 'pending';
}

const DeploymentLogs: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([
        {
            timestamp: '2024-03-20 10:30:15',
            message: '检查 Docker 环境',
            level: 'info',
            step: 'check-docker',
            status: 'success'
        },
        {
            timestamp: '2024-03-20 10:30:20',
            message: '检查 Docker Compose',
            level: 'info',
            step: 'check-compose',
            status: 'success'
        },
        {
            timestamp: '2024-03-20 10:30:25',
            message: '测试 Docker 镜像拉取',
            level: 'info',
            step: 'pull-images',
            status: 'success'
        },
        {
            timestamp: '2024-03-20 10:30:30',
            message: '部署 Zabbix 服务',
            level: 'info',
            step: 'deploy-services',
            status: 'running'
        }
    ]);

    const getIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircleOutlined className="text-green-500" />;
            case 'running':
                return <SyncOutlined spin className="text-blue-500" />;
            case 'error':
                return <CloseCircleOutlined className="text-red-500" />;
            default:
                return <SyncOutlined className="text-gray-400" />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">部署进度</h2>
            <Timeline
                items={logs.map(log => ({
                    dot: getIcon(log.status),
                    children: (
                        <div key={log.step} className="mb-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{log.message}</span>
                                <span className="text-sm text-gray-500">{log.timestamp}</span>
                            </div>
                            {log.status === 'running' && (
                                <div className="mt-2">
                                    <div className="h-1 w-full bg-gray-200 rounded">
                                        <div className="h-1 bg-blue-500 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }))}
            />
        </div>
    );
};

export default DeploymentLogs; 