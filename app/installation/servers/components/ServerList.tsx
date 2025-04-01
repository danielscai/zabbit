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
    status: 'running' | 'stopped' | 'error';
    createdAt: string;
}

interface ServerListProps {
    onNewServer: () => void;
}

export default function ServerList({ onNewServer }: ServerListProps) {
    const router = useRouter();
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServers();
    }, []);

    const fetchServers = async () => {
        try {
            const response = await fetch('/api/zabbix/instances');
            if (!response.ok) {
                throw new Error('获取服务器列表失败');
            }
            const data = await response.json();
            setServers(data);
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
                                servers.map((server) => (
                                    <tr
                                        key={server.id}
                                        onClick={() => handleRowClick(server.id)}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
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
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                server.status === 'running'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                    : server.status === 'stopped'
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                            }`}>
                                                {server.status === 'running' ? '运行中' : server.status === 'stopped' ? '已停止' : '错误'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {new Date(server.createdAt).toLocaleString('zh-CN')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 