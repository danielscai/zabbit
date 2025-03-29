import { useState } from 'react';

interface AlertRule {
    id: string;
    name: string;
    description: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    conditions: string[];
    actions: string[];
    status: 'active' | 'inactive';
}

interface NotificationChannel {
    id: string;
    name: string;
    type: 'email' | 'webhook' | 'slack' | 'dingtalk';
    config: Record<string, string>;
    status: 'active' | 'inactive';
}

export default function AlertIntegrationTab() {
    const [alertRules, setAlertRules] = useState<AlertRule[]>([
        {
            id: '1',
            name: 'CPU 使用率过高',
            description: '当 CPU 使用率超过 80% 时触发报警',
            severity: 'warning',
            conditions: ['CPU > 80%', '持续时间 > 5分钟'],
            actions: ['发送邮件通知', '创建工单'],
            status: 'active',
        },
        {
            id: '2',
            name: '内存不足',
            description: '当可用内存低于 1GB 时触发报警',
            severity: 'error',
            conditions: ['可用内存 < 1GB', '持续时间 > 10分钟'],
            actions: ['发送邮件通知', '发送钉钉通知'],
            status: 'active',
        },
    ]);

    const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
        {
            id: '1',
            name: '运维团队邮件',
            type: 'email',
            config: {
                recipients: 'ops@example.com',
                subject: '[监控报警]',
            },
            status: 'active',
        },
        {
            id: '2',
            name: '钉钉机器人',
            type: 'dingtalk',
            config: {
                webhook: 'https://oapi.dingtalk.com/robot/send?access_token=xxx',
            },
            status: 'active',
        },
    ]);

    const handleAddAlertRule = () => {
        // 实现添加报警规则的逻辑
    };

    const handleAddNotificationChannel = () => {
        // 实现添加通知渠道的逻辑
    };

    return (
        <div>
            {/* 报警规则管理 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            报警规则管理
                        </h3>
                        <button
                            onClick={handleAddAlertRule}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            添加规则
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        规则名称
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        描述
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        严重程度
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        触发条件
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        执行动作
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        状态
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {alertRules.map((rule) => (
                                    <tr key={rule.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {rule.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {rule.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    rule.severity === 'critical'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                        : rule.severity === 'error'
                                                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
                                                          : rule.severity === 'warning'
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                                }`}
                                            >
                                                {rule.severity === 'critical'
                                                    ? '严重'
                                                    : rule.severity === 'error'
                                                      ? '错误'
                                                      : rule.severity === 'warning'
                                                        ? '警告'
                                                        : '信息'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {rule.conditions.join(', ')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {rule.actions.join(', ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    rule.status === 'active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                }`}
                                            >
                                                {rule.status === 'active' ? '启用' : '停用'}
                                            </span>
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

            {/* 通知渠道管理 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            通知渠道管理
                        </h3>
                        <button
                            onClick={handleAddNotificationChannel}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            添加渠道
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        渠道名称
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        类型
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        配置信息
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        状态
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {notificationChannels.map((channel) => (
                                    <tr key={channel.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {channel.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {channel.type === 'email'
                                                ? '邮件'
                                                : channel.type === 'webhook'
                                                  ? 'Webhook'
                                                  : channel.type === 'slack'
                                                    ? 'Slack'
                                                    : '钉钉'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {Object.entries(channel.config)
                                                .map(([key, value]) => `${key}: ${value}`)
                                                .join(', ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    channel.status === 'active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                }`}
                                            >
                                                {channel.status === 'active' ? '正常' : '停用'}
                                            </span>
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
        </div>
    );
} 