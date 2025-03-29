import { useState } from 'react';

interface CMDBField {
    id: string;
    name: string;
    type: string;
    description: string;
    isRequired: boolean;
}

interface ZabbixField {
    id: string;
    name: string;
    type: string;
    description: string;
}

interface FieldMapping {
    cmdbFieldId: string;
    zabbixFieldId: string;
}

export default function CMDBIntegrationTab() {
    const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
    const [syncFrequency, setSyncFrequency] = useState('daily');
    const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);

    // 示例 CMDB 字段数据
    const [cmdbFields, setCmdbFields] = useState<CMDBField[]>([
        {
            id: '1',
            name: '项目名称',
            type: 'string',
            description: '项目所属名称',
            isRequired: true,
        },
        {
            id: '2',
            name: '主机组',
            type: 'string',
            description: '主机所属分组',
            isRequired: true,
        },
        {
            id: '3',
            name: '主机用途',
            type: 'string',
            description: '主机的业务用途',
            isRequired: false,
        },
        {
            id: '4',
            name: '负责人',
            type: 'string',
            description: '主机负责人',
            isRequired: true,
        },
        {
            id: '5',
            name: '环境',
            type: 'string',
            description: '主机所属环境',
            isRequired: true,
        },
    ]);

    // 示例 Zabbix 字段数据
    const [zabbixFields, setZabbixFields] = useState<ZabbixField[]>([
        {
            id: '1',
            name: 'hostname',
            type: 'string',
            description: '主机名',
        },
        {
            id: '2',
            name: 'groups',
            type: 'array',
            description: '主机组',
        },
        {
            id: '3',
            name: 'description',
            type: 'string',
            description: '主机描述',
        },
        {
            id: '4',
            name: 'tags',
            type: 'array',
            description: '主机标签',
        },
    ]);

    const handleAddMapping = () => {
        // 实现添加字段映射的逻辑
    };

    const handleRemoveMapping = (mappingId: string) => {
        // 实现删除字段映射的逻辑
    };

    return (
        <div>
            {/* 自动同步设置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            自动同步设置
                        </h3>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="cmdb-auto-sync-switch" className="text-sm text-gray-700 dark:text-gray-300">
                                自动同步
                            </label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                <input
                                    type="checkbox"
                                    id="cmdb-auto-sync-switch"
                                    checked={autoSyncEnabled}
                                    onChange={() => setAutoSyncEnabled(!autoSyncEnabled)}
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                />
                                <label
                                    htmlFor="cmdb-auto-sync-switch"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                                        autoSyncEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                ></label>
                            </div>
                        </div>
                    </div>
                </div>

                {autoSyncEnabled && (
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <label htmlFor="sync-frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                同步频率
                            </label>
                            <select
                                id="sync-frequency"
                                value={syncFrequency}
                                onChange={(e) => setSyncFrequency(e.target.value)}
                                className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                            >
                                <option value="hourly">每小时</option>
                                <option value="daily">每天</option>
                                <option value="weekly">每周</option>
                            </select>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                保存设置
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 字段映射设置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            字段映射设置
                        </h3>
                        <button
                            onClick={handleAddMapping}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            添加映射
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        CMDB 字段
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Zabbix 字段
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {fieldMappings.map((mapping) => (
                                    <tr key={mapping.cmdbFieldId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {cmdbFields.find((f) => f.id === mapping.cmdbFieldId)?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {zabbixFields.find((f) => f.id === mapping.zabbixFieldId)?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleRemoveMapping(mapping.cmdbFieldId)}
                                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                            >
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