'use client';

import { useState } from 'react';

interface BatchConfig {
    id: string;
    name: string;
    type: 'process' | 'service' | 'metric';
    targetHosts: string[];
    config: {
        key: string;
        value: string;
    }[];
    status: 'pending' | 'running' | 'completed' | 'failed';
    createdAt: string;
}

export default function BatchConfigTab() {
    const [configs, setConfigs] = useState<BatchConfig[]>([
        {
            id: '1',
            name: '批量配置进程监控',
            type: 'process',
            targetHosts: ['prod-server-01', 'prod-server-02'],
            config: [
                { key: 'process_name', value: 'nginx' },
                { key: 'check_interval', value: '60' },
            ],
            status: 'completed',
            createdAt: '2024-03-28 10:00:00',
        },
        {
            id: '2',
            name: '批量配置服务监控',
            type: 'service',
            targetHosts: ['test-server-01', 'test-server-02'],
            config: [
                { key: 'service_name', value: 'mysql' },
                { key: 'check_interval', value: '300' },
            ],
            status: 'running',
            createdAt: '2024-03-28 09:30:00',
        },
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCreateConfig = () => {
        // 实现创建配置的逻辑
        setShowCreateForm(false);
    };

    return (
        <div>
            {/* 批量配置列表 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            批量配置列表
                        </h3>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            创建批量配置
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        配置名称
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        类型
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        目标主机
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        状态
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        创建时间
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {configs.map((config) => (
                                    <tr key={config.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {config.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {config.type === 'process' ? '进程监控' : config.type === 'service' ? '服务监控' : '指标监控'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {config.targetHosts.join(', ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    config.status === 'completed'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : config.status === 'running'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                                        : config.status === 'failed'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                }`}
                                            >
                                                {config.status === 'completed' ? '已完成' : config.status === 'running' ? '运行中' : config.status === 'failed' ? '失败' : '等待中'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {config.createdAt}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400 mr-3">
                                                查看详情
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

            {/* 创建配置表单 */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    创建批量配置
                                </h3>
                                <button
                                    onClick={() => setShowCreateForm(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">关闭</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            <form onSubmit={(e) => { e.preventDefault(); handleCreateConfig(); }}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="config-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            配置名称
                                        </label>
                                        <input
                                            type="text"
                                            id="config-name"
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="config-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            配置类型
                                        </label>
                                        <select
                                            id="config-type"
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="process">进程监控</option>
                                            <option value="service">服务监控</option>
                                            <option value="metric">指标监控</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="target-hosts" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            目标主机
                                        </label>
                                        <textarea
                                            id="target-hosts"
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                            placeholder="每行一个主机名"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="config-params" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            配置参数
                                        </label>
                                        <textarea
                                            id="config-params"
                                            rows={4}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                            placeholder="每行一个参数，格式：key=value"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateForm(false)}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                        取消
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                        创建
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 