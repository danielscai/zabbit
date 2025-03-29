'use client';

import { useState } from 'react';

interface UserGroup {
    id: string;
    name: string;
    description: string;
    userCount: number;
    lastSync: string;
}

interface User {
    id: string;
    username: string;
    email: string;
    groupId: string;
    role: 'admin' | 'user' | 'viewer';
    lastLogin: string;
}

export default function UserManagementTab() {
    const [activeSection, setActiveSection] = useState<'groups' | 'users'>('groups');
    const [userGroups, setUserGroups] = useState<UserGroup[]>([
        {
            id: '1',
            name: '管理员组',
            description: '系统管理员组',
            userCount: 3,
            lastSync: '2024-03-28 10:00:00',
        },
        {
            id: '2',
            name: '运维组',
            description: '运维人员组',
            userCount: 5,
            lastSync: '2024-03-28 10:00:00',
        },
    ]);

    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
            groupId: '1',
            role: 'admin',
            lastLogin: '2024-03-28 10:00:00',
        },
        {
            id: '2',
            username: 'ops1',
            email: 'ops1@example.com',
            groupId: '2',
            role: 'user',
            lastLogin: '2024-03-28 09:30:00',
        },
    ]);

    const handleSync = () => {
        // 实现同步逻辑
    };

    return (
        <div>
            {/* 切换按钮 */}
            <div className="mb-6">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveSection('groups')}
                            className={`${
                                activeSection === 'groups'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            用户组管理
                        </button>
                        <button
                            onClick={() => setActiveSection('users')}
                            className={`${
                                activeSection === 'users'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            用户管理
                        </button>
                    </nav>
                </div>
            </div>

            {/* 用户组管理 */}
            {activeSection === 'groups' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                用户组列表
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSync}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    同步用户组
                                </button>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                    添加用户组
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
                                            用户数量
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
                                    {userGroups.map((group) => (
                                        <tr key={group.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {group.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {group.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {group.userCount}
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

            {/* 用户管理 */}
            {activeSection === 'users' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                用户列表
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSync}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    同步用户
                                </button>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                    添加用户
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
                                            用户名
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            邮箱
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            所属组
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            角色
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            最后登录
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {user.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {userGroups.find((g) => g.id === user.groupId)?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        user.role === 'admin'
                                                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                                                            : user.role === 'user'
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                                                    }`}
                                                >
                                                    {user.role === 'admin' ? '管理员' : user.role === 'user' ? '用户' : '访客'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {user.lastLogin}
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