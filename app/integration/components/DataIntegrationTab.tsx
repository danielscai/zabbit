import { useState } from 'react';

interface DataSource {
    id: string;
    name: string;
    type: 'mysql' | 'postgresql' | 'mongodb' | 'redis';
    host: string;
    port: number;
    database: string;
    username: string;
    status: 'active' | 'inactive';
}

interface SyncRule {
    id: string;
    name: string;
    sourceId: string;
    targetTable: string;
    schedule: string;
    lastSync: string;
    status: 'active' | 'paused';
}

export default function DataIntegrationTab() {
    const [dataSources, setDataSources] = useState<DataSource[]>([
        {
            id: '1',
            name: '生产环境 MySQL',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'production',
            username: 'admin',
            status: 'active',
        },
        {
            id: '2',
            name: '测试环境 PostgreSQL',
            type: 'postgresql',
            host: 'localhost',
            port: 5432,
            database: 'testing',
            username: 'test_user',
            status: 'active',
        },
    ]);

    const [syncRules, setSyncRules] = useState<SyncRule[]>([
        {
            id: '1',
            name: '每日同步主机信息',
            sourceId: '1',
            targetTable: 'hosts',
            schedule: '0 0 * * *',
            lastSync: '2024-03-28 00:00:00',
            status: 'active',
        },
        {
            id: '2',
            name: '每小时同步监控数据',
            sourceId: '2',
            targetTable: 'metrics',
            schedule: '0 * * * *',
            lastSync: '2024-03-28 10:00:00',
            status: 'active',
        },
    ]);

    const handleAddDataSource = () => {
        // 实现添加数据源的逻辑
    };

    const handleAddSyncRule = () => {
        // 实现添加同步规则的逻辑
    };

    return (
        <div>
            {/* 数据源管理 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            数据源管理
                        </h3>
                        <button
                            onClick={handleAddDataSource}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            添加数据源
                        </button>
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
                                        类型
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        主机
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        数据库
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
                                {dataSources.map((source) => (
                                    <tr key={source.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {source.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {source.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {source.host}:{source.port}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {source.database}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    source.status === 'active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                }`}
                                            >
                                                {source.status === 'active' ? '正常' : '停用'}
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

            {/* 同步规则管理 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            同步规则管理
                        </h3>
                        <button
                            onClick={handleAddSyncRule}
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
                                        数据源
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        目标表
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        调度
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        上次同步
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
                                {syncRules.map((rule) => (
                                    <tr key={rule.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {rule.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {dataSources.find((s) => s.id === rule.sourceId)?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {rule.targetTable}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {rule.schedule}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {rule.lastSync}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    rule.status === 'active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                }`}
                                            >
                                                {rule.status === 'active' ? '运行中' : '已暂停'}
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