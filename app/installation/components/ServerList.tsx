'use client';

import { useState } from 'react';
import ServerDetail from './ServerDetail';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    const [servers] = useState<Server[]>([
        {
            id: '1',
            name: '生产环境 Zabbix',
            organization: '技术部',
            region: '上海',
            mode: 'cluster',
            status: 'running',
            createdAt: '2024-03-29 15:30:00',
        },
        {
            id: '2',
            name: '测试环境 Zabbix',
            organization: '研发部',
            region: '北京',
            mode: 'single',
            status: 'stopped',
            createdAt: '2024-03-29 14:20:00',
        },
    ]);

    const [selectedServerId, setSelectedServerId] = useState<string | null>(null);

    const handleSelectServer = (serverId: string) => {
        setSelectedServerId(serverId);
        router.push(`/installation/servers/${serverId}/management`);
    };

    if (selectedServerId) {
        return <ServerDetail 
            serverId={selectedServerId} 
            onBack={() => setSelectedServerId(null)} 
        />;
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
                <div className="px-6 py-4">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    名称
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    组织
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    地区
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    部署模式
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    状态
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    创建时间
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {servers.map((server) => (
                                <tr key={server.id}>
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
                                        {server.mode === 'single' ? '单机部署' : 
                                         server.mode === 'cluster' ? '集群部署' : '分布式部署'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                server.status === 'running'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                    : server.status === 'stopped'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                            }`}
                                        >
                                            {server.status === 'running'
                                                ? '运行中'
                                                : server.status === 'stopped'
                                                ? '已停止'
                                                : '错误'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {server.createdAt}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => handleSelectServer(server.id)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                管理
                                            </button>
                                            <Link 
                                                href={`/installation/servers/${server.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                查看
                                            </Link>
                                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                删除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 