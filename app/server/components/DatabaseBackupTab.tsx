import { useState } from 'react';

interface BackupRecord {
    id: string;
    type: 'full' | 'incremental';
    size: string;
    createdAt: string;
    status: 'success' | 'failed' | 'in-progress';
}

export default function DatabaseBackupTab() {
    const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);
    const [fullBackupEnabled, setFullBackupEnabled] = useState(true);
    const [incrementalBackupEnabled, setIncrementalBackupEnabled] = useState(true);
    const [fullBackupSchedule, setFullBackupSchedule] = useState('weekly');
    const [incrementalBackupSchedule, setIncrementalBackupSchedule] = useState('daily');

    const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([
        {
            id: '1',
            type: 'full',
            size: '2.3 GB',
            createdAt: '2025-03-29 00:00:00',
            status: 'success',
        },
        {
            id: '2',
            type: 'incremental',
            size: '450 MB',
            createdAt: '2025-03-28 00:00:00',
            status: 'success',
        },
        {
            id: '3',
            type: 'incremental',
            size: '480 MB',
            createdAt: '2025-03-27 00:00:00',
            status: 'failed',
        },
    ]);

    return (
        <div className="mt-6" data-oid="uya5t60">
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="hu0qqn0"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="bncm1ir"
                >
                    <div className="flex justify-between items-center" data-oid="53vs6s9">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="irn1exu"
                        >
                            数据库备份
                        </h3>
                        <div className="flex items-center space-x-2" data-oid=":ys053r">
                            <label
                                htmlFor="auto-backup-switch"
                                className="text-sm text-gray-700 dark:text-gray-300"
                                data-oid="pne:-49"
                            >
                                自动备份
                            </label>
                            <div
                                className="relative inline-block w-10 mr-2 align-middle select-none"
                                data-oid="xp0h8.c"
                            >
                                <input
                                    type="checkbox"
                                    id="auto-backup-switch"
                                    checked={autoBackupEnabled}
                                    onChange={() => setAutoBackupEnabled(!autoBackupEnabled)}
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                    data-oid="97sgpyh"
                                />

                                <label
                                    htmlFor="auto-backup-switch"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${autoBackupEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    data-oid="5-f34sd"
                                ></label>
                            </div>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" data-oid="-:fjdw9">
                        管理 Zabbix 数据库的定期备份
                    </p>
                </div>
                <div className="px-6 py-4" data-oid="it8-g_2">
                    {autoBackupEnabled ? (
                        <>
                            <div className="mb-6 space-y-4" data-oid="n85j5cc">
                                <h3
                                    className="text-lg font-medium text-gray-900 dark:text-white"
                                    data-oid=":b:08qa"
                                >
                                    备份设置
                                </h3>
                                <div className="space-y-4" data-oid="3744hdz">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid=":dz.ler"
                                    >
                                        <div
                                            className="flex items-center space-x-2"
                                            data-oid="hq-31f5"
                                        >
                                            <input
                                                type="checkbox"
                                                id="full-backup-checkbox"
                                                checked={fullBackupEnabled}
                                                onChange={() =>
                                                    setFullBackupEnabled(!fullBackupEnabled)
                                                }
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                                data-oid="lumxm-n"
                                            />

                                            <label
                                                htmlFor="full-backup-checkbox"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                data-oid="uawpkb5"
                                            >
                                                完整备份
                                            </label>
                                        </div>
                                        {fullBackupEnabled && (
                                            <div className="w-1/3" data-oid="90n250n">
                                                <select
                                                    id="full-backup-schedule"
                                                    value={fullBackupSchedule}
                                                    onChange={(e) =>
                                                        setFullBackupSchedule(e.target.value)
                                                    }
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                                    data-oid="5w:6747"
                                                >
                                                    <option value="daily" data-oid="y9va2o4">
                                                        每天
                                                    </option>
                                                    <option value="weekly" data-oid="s-v22w6">
                                                        每周
                                                    </option>
                                                    <option value="monthly" data-oid="si4op94">
                                                        每月
                                                    </option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="7j:x7hv"
                                    >
                                        <div
                                            className="flex items-center space-x-2"
                                            data-oid="d.ntjj6"
                                        >
                                            <input
                                                type="checkbox"
                                                id="incremental-backup-checkbox"
                                                checked={incrementalBackupEnabled}
                                                onChange={() =>
                                                    setIncrementalBackupEnabled(
                                                        !incrementalBackupEnabled,
                                                    )
                                                }
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                                data-oid="3dko5pf"
                                            />

                                            <label
                                                htmlFor="incremental-backup-checkbox"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                data-oid="rk6sz5."
                                            >
                                                增量备份
                                            </label>
                                        </div>
                                        {incrementalBackupEnabled && (
                                            <div className="w-1/3" data-oid="dwt17-q">
                                                <select
                                                    id="incremental-backup-schedule"
                                                    value={incrementalBackupSchedule}
                                                    onChange={(e) =>
                                                        setIncrementalBackupSchedule(e.target.value)
                                                    }
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                                    data-oid="vzrus4x"
                                                >
                                                    <option value="daily" data-oid="f4x7q1_">
                                                        每天
                                                    </option>
                                                    <option value="weekly" data-oid="mf.f60u">
                                                        每周
                                                    </option>
                                                    <option value="monthly" data-oid="ldwqlvq">
                                                        每月
                                                    </option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end" data-oid="h_6t6n:">
                                    <button
                                        className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        data-oid="rk82-ge"
                                    >
                                        保存设置
                                    </button>
                                </div>
                            </div>

                            <h3
                                className="text-lg font-medium text-gray-900 dark:text-white mb-4"
                                data-oid="50eo097"
                            >
                                备份历史
                            </h3>
                            <table
                                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                data-oid="we0pl9d"
                            >
                                <thead className="bg-gray-50 dark:bg-gray-700" data-oid="5f.d293">
                                    <tr data-oid="2p76a30">
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="qqaac1q"
                                        >
                                            类型
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="kl9s5:o"
                                        >
                                            大小
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="q_uv3px"
                                        >
                                            创建时间
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="tmt_:9i"
                                        >
                                            状态
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="g.rq8sp"
                                        >
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                                    data-oid="vrbxvo2"
                                >
                                    {backupRecords.map((record) => (
                                        <tr key={record.id} data-oid="lqjj.2-">
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                                data-oid="ry1tqcl"
                                            >
                                                {record.type === 'full' ? '完整备份' : '增量备份'}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="stnfi-o"
                                            >
                                                {record.size}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="tamprpr"
                                            >
                                                {record.createdAt}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="sq-27:h"
                                            >
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : record.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}
                                                    data-oid="li_8rv1"
                                                >
                                                    {record.status === 'success'
                                                        ? '成功'
                                                        : record.status === 'in-progress'
                                                          ? '进行中'
                                                          : '失败'}
                                                </span>
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                                data-oid="9ckgct5"
                                            >
                                                <div className="flex space-x-2" data-oid="r4j8n8:">
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        data-oid="zn05x9d"
                                                    >
                                                        下载
                                                    </button>
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        data-oid="u3coa2e"
                                                    >
                                                        恢复
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        data-oid=".g9245s"
                                                    >
                                                        删除
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 flex justify-end" data-oid="mnrm0.z">
                                <button
                                    className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    data-oid="p:b3dv0"
                                >
                                    立即备份
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8" data-oid="bvksyr0">
                            <p className="text-gray-500 dark:text-gray-400 mb-4" data-oid="jacl1rv">
                                自动备份功能当前已禁用。启用此功能可以定期备份 Zabbix
                                数据库，以便在需要时快速恢复。
                            </p>
                            <button
                                onClick={() => setAutoBackupEnabled(true)}
                                className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                data-oid="8sy_hi8"
                            >
                                启用自动备份
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
