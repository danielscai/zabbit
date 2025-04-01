import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface LogEntry {
    id: string;
    createdAt: string;
    step: string;
    status: 'success' | 'running' | 'error';
    logs: string[];
    errorMessage?: string;
}

interface DeploymentLogsProps {
    instanceId: string;
    refreshInterval?: number;
}

const DeploymentLogs: React.FC<DeploymentLogsProps> = ({ instanceId, refreshInterval = 5000 }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLogs = async () => {
        try {
            const response = await fetch(`/api/installation/logs?instanceId=${instanceId}`);
            if (!response.ok) {
                throw new Error('获取日志失败');
            }
            const data = await response.json();
            setLogs(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : '获取日志时发生错误');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, refreshInterval);
        return () => clearInterval(interval);
    }, [instanceId, refreshInterval]);

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

    if (loading) {
        return <div className="flex justify-center items-center p-4">
            <SyncOutlined spin className="text-blue-500 text-2xl" />
        </div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">部署日志</h2>
            {logs.length === 0 ? (
                <div className="text-gray-500 text-center p-4">暂无部署日志</div>
            ) : (
                <Timeline
                    items={logs.map(log => ({
                        dot: getIcon(log.status),
                        children: (
                            <div key={log.id} className="mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{log.step}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(log.createdAt).toLocaleString('zh-CN')}
                                    </span>
                                </div>
                                {log.logs.length > 0 && (
                                    <div className="mt-2 bg-gray-50 rounded p-2 text-sm">
                                        {log.logs.map((logLine, index) => (
                                            <div key={index} className="text-gray-600">{logLine}</div>
                                        ))}
                                    </div>
                                )}
                                {log.errorMessage && (
                                    <div className="mt-2 text-red-500 text-sm">{log.errorMessage}</div>
                                )}
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
            )}
        </div>
    );
};

export default DeploymentLogs; 