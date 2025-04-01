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
    
    // 分页状态
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchServers();
        // 设置3秒刷新一次
        const intervalId = setInterval(fetchServers, 3000);
        return () => clearInterval(intervalId);
    }, [currentPage, pageSize]);

    // 处理新创建实例的高亮效果
    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];
        
        servers.forEach(server => {
            if (recentlyCreated.has(server.id)) {
                const timeout = setTimeout(() => {
                    setRecentlyCreated(prev => {
                        const next = new Set(prev);
                        next.delete(server.id);
                        return next;
                    });
                }, 30000); // 30秒后移除高亮
                timeouts.push(timeout);
            }
        });

        return () => timeouts.forEach(clearTimeout);
    }, [servers, recentlyCreated]);

    const fetchServers = async () => {
        try {
            const response = await fetch(`/api/zabbix/instances?page=${currentPage}&pageSize=${pageSize}`);
            if (!response.ok) {
                throw new Error('获取服务器列表失败');
            }
            const { data, pagination } = await response.json();
            
            // 验证返回的数据格式
            if (!Array.isArray(data)) {
                console.error('API返回数据格式错误:', data);
                setServers([]);
                setTotalPages(1);
                setTotal(0);
                return;
            }
            
            setServers(data);
            setTotalPages(pagination.totalPages);
            setTotal(pagination.total);

            // 更新最近创建的实例集合
            const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
            const newRecentlyCreated = new Set(
                data
                    .filter((server: Server) => new Date(server.createdAt) > thirtySecondsAgo)
                    .map((server: Server) => server.id)
            ) as Set<string>;
            setRecentlyCreated(newRecentlyCreated);
        } catch (error) {
            console.error('获取服务器列表失败:', error);
            toast.error('获取服务器列表失败');
            setServers([]);
            setTotalPages(1);
            setTotal(0);
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
                    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                };
            case 'error':
                return {
                    text: '错误',
                    className: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 animate-pulse'
                };
            case 'installing':
                return {
                    text: '安装中',
                    className: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                };
            default:
                return {
                    text: '未知',
                    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
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

                    {/* 分页控件 */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                上一页
                            </button>
                            <button
                                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                下一页
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    显示第 <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> 到{' '}
                                    <span className="font-medium">
                                        {Math.min(currentPage * pageSize, total)}
                                    </span>{' '}
                                    条，共{' '}
                                    <span className="font-medium">{total}</span> 条
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">首页</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        上一页
                                    </button>
                                    {/* 页码按钮 */}
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const pageNum = i + 1;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    currentPage === pageNum
                                                        ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        下一页
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">末页</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 