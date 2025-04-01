'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Server {
    id: string;
    name: string;
    organization: string;
    region: string;
    mode: 'single' | 'cluster' | 'distributed';
    status: 'running' | 'stopped' | 'error' | 'installing';
    createdAt: string;
}

interface ServerListProps {
    onNewServer: () => void;
}

export default function ServerList({ onNewServer }: ServerListProps) {
    const router = useRouter();
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState(true);
    const [recentlyCreated, setRecentlyCreated] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchServers();
        // 设置定时刷新，每10秒刷新一次
        const intervalId = setInterval(fetchServers, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchServers = async () => {
        try {
            const response = await fetch('/api/zabbix/instances');
            if (!response.ok) {
                throw new Error('获取服务器列表失败');
            }
            const data = await response.json();
            setServers(data);

            // 更新最近创建的实例集合
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            const newRecentlyCreated = new Set(
                data.filter((server: Server) => 
                    new Date(server.createdAt) > fiveMinutesAgo
                ).map((server: Server) => server.id)
            ) as Set<string>;
            setRecentlyCreated(newRecentlyCreated);
        } catch (error) {
            console.error('获取服务器列表失败:', error);
            toast.error('获取服务器列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (serverId: string) => {
        router.push(`/installation/servers/${serverId}`);
    };

    const getStatusDisplay = (status: Server['status']) => {
        switch (status) {
            case 'running':
                return {
                    text: '运行中',
                    className: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                };
            case 'stopped':
                return {
                    text: '已停止',
                    className: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                };
            case 'installing':
                return {
                    text: '安装中',
                    className: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                };
            default:
                return {
                    text: '错误',
                    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                };
        }
    };

    if (loading) {
        return (
            <div className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Zabbix实例
                            </h3>
                        </div>
                        <button
                            onClick={onNewServer}
                            className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                        >
                            创建新Zabbix实例
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    名称
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    组织
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    区域
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    模式
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    状态
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    创建时间
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {servers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        暂无Zabbix实例
                                    </td>
                                </tr>
                            ) : (
                                servers.map((server) => {
                                    const isRecent = recentlyCreated.has(server.id);
                                    const status = getStatusDisplay(server.status);
                                    
                                    return (
                                        <tr
                                            key={server.id}
                                            onClick={() => handleRowClick(server.id)}
                                            className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
                                                isRecent ? 'bg-purple-50 dark:bg-purple-900/10' : ''
                                            }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {server.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {server.organization}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {server.region}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {server.mode === 'single' ? '单机' : server.mode === 'cluster' ? '集群' : '分布式'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className} ${
                                                    server.status === 'installing' ? 'flex items-center gap-1' : ''
                                                }`}>
                                                    {server.status === 'installing' && (
                                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                    )}
                                                    {status.text}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {new Date(server.createdAt).toLocaleString('zh-CN')}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 