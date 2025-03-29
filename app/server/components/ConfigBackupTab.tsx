import { useState } from 'react';

interface ConfigBackupSettings {
    frequency: string;
    retentionPeriod: string;
}

interface ConfigBackupRecord {
    id: string;
    filename: string;
    size: string;
    createdAt: string;
    status: 'success' | 'failed' | 'in-progress';
}

export default function ConfigBackupTab() {
    const [configBackupEnabled, setConfigBackupEnabled] = useState(false);
    const [configBackupSettings, setConfigBackupSettings] = useState<ConfigBackupSettings>({
        frequency: 'weekly',
        retentionPeriod: '30',
    });

    const [configBackupRecords, setConfigBackupRecords] = useState<ConfigBackupRecord[]>([
        {
            id: '1',
            filename: 'zabbix_config_20250329.tar.gz',
            size: '5.2 MB',
            createdAt: '2025-03-29 00:15:00',
            status: 'success',
        },
        {
            id: '2',
            filename: 'zabbix_config_20250322.tar.gz',
            size: '5.1 MB',
            createdAt: '2025-03-22 00:15:00',
            status: 'success',
        },
    ]);

    return (
        <div className="mt-6" data-oid="i-0yhyb">
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="tdo9_9h"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="_wfoa84"
                >
                    <div className="flex justify-between items-center" data-oid="0g2-qk6">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="1tpq71j"
                        >
                            配置备份
                        </h3>
                        <div className="flex items-center space-x-2" data-oid="g43pd07">
                            <label
                                htmlFor="config-backup-switch"
                                className="text-sm text-gray-700 dark:text-gray-300"
                                data-oid="cyu8xiz"
                            >
                                启用配置备份
                            </label>
                            <div
                                className="relative inline-block w-10 mr-2 align-middle select-none"
                                data-oid="v5-qe7o"
                            >
                                <input
                                    type="checkbox"
                                    id="config-backup-switch"
                                    checked={configBackupEnabled}
                                    onChange={() => setConfigBackupEnabled(!configBackupEnabled)}
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                    data-oid="lyy:sog"
                                />

                                <label
                                    htmlFor="config-backup-switch"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${configBackupEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    data-oid="tdu_qau"
                                ></label>
                            </div>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" data-oid="fzjfgwt">
                        管理 Zabbix 配置文件的备份
                    </p>
                </div>
                <div className="px-6 py-4" data-oid="i-pj8::">
                    {configBackupEnabled ? (
                        <>
                            <div className="mb-6 space-y-4" data-oid="gp15v1f">
                                <h3
                                    className="text-lg font-medium text-gray-900 dark:text-white"
                                    data-oid="ucy03w4"
                                >
                                    备份策略设置
                                </h3>
                                <div className="grid grid-cols-2 gap-4" data-oid=":3bvz3h">
                                    <div className="space-y-2" data-oid="32n0pu_">
                                        <label
                                            htmlFor="config-backup-frequency"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            data-oid="1n8l_o:"
                                        >
                                            备份频率
                                        </label>
                                        <select
                                            id="config-backup-frequency"
                                            value={configBackupSettings.frequency}
                                            onChange={(e) =>
                                                setConfigBackupSettings({
                                                    ...configBackupSettings,
                                                    frequency: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                            data-oid="tb42xtb"
                                        >
                                            <option value="daily" data-oid="-yac6a.">
                                                每天
                                            </option>
                                            <option value="weekly" data-oid="fs-m06o">
                                                每周
                                            </option>
                                            <option value="monthly" data-oid="2isee_i">
                                                每月
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2" data-oid="grtfi4h">
                                        <label
                                            htmlFor="retention-period"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            data-oid="q0ffmfi"
                                        >
                                            保留期限
                                        </label>
                                        <select
                                            id="retention-period"
                                            value={configBackupSettings.retentionPeriod}
                                            onChange={(e) =>
                                                setConfigBackupSettings({
                                                    ...configBackupSettings,
                                                    retentionPeriod: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                            data-oid="4fo7.hp"
                                        >
                                            <option value="7" data-oid="ktc:7wo">
                                                7天
                                            </option>
                                            <option value="30" data-oid="qwy.mh-">
                                                30天
                                            </option>
                                            <option value="90" data-oid="2d.4ceb">
                                                90天
                                            </option>
                                            <option value="365" data-oid="ckm8q4z">
                                                365天
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end" data-oid="9g-4fih">
                                    <button
                                        className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        data-oid="-s-cvp7"
                                    >
                                        保存设置
                                    </button>
                                </div>
                            </div>

                            <h3
                                className="text-lg font-medium text-gray-900 dark:text-white mb-4"
                                data-oid="_fa3t8m"
                            >
                                配置备份历史
                            </h3>
                            <table
                                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                data-oid=":_n_owi"
                            >
                                <thead className="bg-gray-50 dark:bg-gray-700" data-oid="frxegnn">
                                    <tr data-oid="8km436l">
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="8w2n9uw"
                                        >
                                            文件名
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid=":ow13w1"
                                        >
                                            大小
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="kb8ul_p"
                                        >
                                            创建时间
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="nx9l93y"
                                        >
                                            状态
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="h8uv2uj"
                                        >
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                                    data-oid="00zrj4w"
                                >
                                    {configBackupRecords.map((record) => (
                                        <tr key={record.id} data-oid="rle.b_m">
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                                data-oid="2fg61f:"
                                            >
                                                {record.filename}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="czs-4b8"
                                            >
                                                {record.size}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="h3kd8g0"
                                            >
                                                {record.createdAt}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="sgll_9k"
                                            >
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                                    data-oid="flqpzrb"
                                                >
                                                    成功
                                                </span>
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                data-oid="fjzmm_u"
                                            >
                                                <div className="flex space-x-2" data-oid="gna2y-4">
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        data-oid="hg9tuzn"
                                                    >
                                                        下载
                                                    </button>
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        data-oid="wbn89n4"
                                                    >
                                                        恢复
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        data-oid="3ig44hf"
                                                    >
                                                        删除
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 flex justify-end" data-oid="y-pif_q">
                                <button
                                    className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    data-oid="yw6e0_7"
                                >
                                    立即备份
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8" data-oid="d2bizc0">
                            <p className="text-gray-500 dark:text-gray-400 mb-4" data-oid="h56-yep">
                                配置备份功能当前已禁用。启用此功能可以定期备份 Zabbix
                                的配置文件，以便在需要时快速恢复。
                            </p>
                            <button
                                onClick={() => setConfigBackupEnabled(true)}
                                className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                data-oid="-k3lghl"
                            >
                                启用配置备份
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
