'use client';

import { useState } from 'react';

interface HostGroup {
    id: string;
    name: string;
    description: string;
    hostCount: number;
    lastSync: string;
}

interface Host {
    id: string;
    name: string;
    ip: string;
    groupId: string;
    status: 'online' | 'offline';
    lastCheck: string;
}

interface HostManagementTabProps {
    activeSection: 'groups' | 'hosts';
}

export default function HostManagementTab({ activeSection }: HostManagementTabProps) {
    const [hostGroups, setHostGroups] = useState<HostGroup[]>([
        {
            id: '1',
            name: '生产环境服务器',
            description: '所有生产环境服务器',
            hostCount: 10,
            lastSync: '2024-03-28 10:00:00',
        },
        {
            id: '2',
            name: '测试环境服务器',
            description: '所有测试环境服务器',
            hostCount: 5,
            lastSync: '2024-03-28 10:00:00',
        },
    ]);

    const [hosts, setHosts] = useState<Host[]>([
        {
            id: '1',
            name: 'prod-server-01',
            ip: '192.168.1.101',
            groupId: '1',
            status: 'online',
            lastCheck: '2024-03-28 10:00:00',
        },
        {
            id: '2',
            name: 'prod-server-02',
            ip: '192.168.1.102',
            groupId: '1',
            status: 'online',
            lastCheck: '2024-03-28 10:00:00',
        },
    ]);

    const handleSync = () => {
        // 实现同步逻辑
    };

    return (
        <div>
            {/* 主机组管理 */}
            {activeSection === 'groups' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                主机组列表
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSync}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    同步主机组
                                </button>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                    添加主机组
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            名称
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            描述
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            主机数量
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            最后同步时间
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {hostGroups.map((group) => (
                                        <tr key={group.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {group.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {group.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {group.hostCount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {group.lastSync}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400 mr-3">
                                                    编辑
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                                                    删除
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 主机管理 */}
            {activeSection === 'hosts' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                主机列表
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSync}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    同步主机
                                </button>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                    添加主机
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            主机名
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            IP地址
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            所属组
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            状态
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            最后检查时间
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {hosts.map((host) => (
                                        <tr key={host.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {host.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {host.ip}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {hostGroups.find((g) => g.id === host.groupId)?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        host.status === 'online'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                    }`}
                                                >
                                                    {host.status === 'online' ? '在线' : '离线'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {host.lastCheck}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400 mr-3">
                                                    编辑
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                                                    删除
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 