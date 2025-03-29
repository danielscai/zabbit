import { useState } from 'react';

interface DataArchiveSettings {
    esUrl: string;
    archiveAge: string;
    archiveSchedule: string;
}

interface ArchiveRecord {
    id: string;
    startTime: string;
    endTime: string;
    dataSize: string;
    status: 'success' | 'failed' | 'in-progress';
}

export default function DataArchiveTab() {
    const [dataArchiveEnabled, setDataArchiveEnabled] = useState(false);
    const [dataArchiveSettings, setDataArchiveSettings] = useState<DataArchiveSettings>({
        esUrl: '',
        archiveAge: '90',
        archiveSchedule: 'daily',
    });

    const [archiveRecords, setArchiveRecords] = useState<ArchiveRecord[]>([
        {
            id: 'ARCH-20250329-001',
            startTime: '2025-03-29 01:00:00',
            endTime: '2025-03-29 03:45:22',
            dataSize: '2.3 GB',
            status: 'success',
        },
        {
            id: 'ARCH-20250322-001',
            startTime: '2025-03-22 01:00:00',
            endTime: '2025-03-22 03:12:15',
            dataSize: '1.8 GB',
            status: 'success',
        },
    ]);

    return (
        <div className="mt-6" data-oid="05h5gj2">
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="ed5xhd0"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="c.nrfb_"
                >
                    <div className="flex justify-between items-center" data-oid="kgdp5tq">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="xnseybr"
                        >
                            数据归档
                        </h3>
                        <div className="flex items-center space-x-2" data-oid="s47ub7r">
                            <label
                                htmlFor="data-archive-switch"
                                className="text-sm text-gray-700 dark:text-gray-300"
                                data-oid="fgq3v5s"
                            >
                                启用数据归档
                            </label>
                            <div
                                className="relative inline-block w-10 mr-2 align-middle select-none"
                                data-oid="el:1s1u"
                            >
                                <input
                                    type="checkbox"
                                    id="data-archive-switch"
                                    checked={dataArchiveEnabled}
                                    onChange={() => setDataArchiveEnabled(!dataArchiveEnabled)}
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                    data-oid="6g1ai07"
                                />

                                <label
                                    htmlFor="data-archive-switch"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${dataArchiveEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    data-oid="22zir1i"
                                ></label>
                            </div>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" data-oid="v83rz16">
                        将 Zabbix 的历史数据归档到 Elasticsearch 中，以便进行长期存储和分析。
                    </p>
                </div>
                <div className="px-6 py-4" data-oid="50klqw:">
                    {dataArchiveEnabled ? (
                        <>
                            <div className="mb-6 space-y-4" data-oid="robac7j">
                                <h3
                                    className="text-lg font-medium text-gray-900 dark:text-white"
                                    data-oid="ye20uyq"
                                >
                                    归档设置
                                </h3>
                                <div className="grid grid-cols-2 gap-4" data-oid="duv:4ms">
                                    <div className="space-y-2" data-oid="xw-3w8:">
                                        <label
                                            htmlFor="es-url"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            data-oid="6eh_9a_"
                                        >
                                            Elasticsearch URL
                                        </label>
                                        <input
                                            id="es-url"
                                            value={dataArchiveSettings.esUrl}
                                            onChange={(e) =>
                                                setDataArchiveSettings({
                                                    ...dataArchiveSettings,
                                                    esUrl: e.target.value,
                                                })
                                            }
                                            placeholder="http://elasticsearch:9200"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                                            data-oid="j-i-se9"
                                        />
                                    </div>
                                    <div className="space-y-2" data-oid="vw4ehiv">
                                        <label
                                            htmlFor="archive-age"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            data-oid="nbo2x3."
                                        >
                                            归档数据年龄
                                        </label>
                                        <select
                                            id="archive-age"
                                            value={dataArchiveSettings.archiveAge}
                                            onChange={(e) =>
                                                setDataArchiveSettings({
                                                    ...dataArchiveSettings,
                                                    archiveAge: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                            data-oid="v8a4xy0"
                                        >
                                            <option value="30" data-oid="6:oqwc0">
                                                30天以上
                                            </option>
                                            <option value="90" data-oid="zm9mr..">
                                                90天以上
                                            </option>
                                            <option value="180" data-oid="e4h90m8">
                                                180天以上
                                            </option>
                                            <option value="365" data-oid="o__5ccm">
                                                365天以上
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2" data-oid="y_pi_61">
                                    <label
                                        htmlFor="archive-schedule"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        data-oid="6tb36cm"
                                    >
                                        归档计划
                                    </label>
                                    <select
                                        id="archive-schedule"
                                        value={dataArchiveSettings.archiveSchedule}
                                        onChange={(e) =>
                                            setDataArchiveSettings({
                                                ...dataArchiveSettings,
                                                archiveSchedule: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                        data-oid="o74schk"
                                    >
                                        <option value="daily" data-oid="gm3ygbq">
                                            每天
                                        </option>
                                        <option value="weekly" data-oid="uqsg_jw">
                                            每周
                                        </option>
                                        <option value="monthly" data-oid="pn8z7pw">
                                            每月
                                        </option>
                                    </select>
                                </div>
                                <div className="flex justify-end" data-oid="o9.pxsk">
                                    <button
                                        className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        data-oid=".i41uv."
                                    >
                                        保存设置
                                    </button>
                                </div>
                            </div>

                            <div
                                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-6"
                                data-oid="lm1ph7x"
                            >
                                <h3
                                    className="text-lg font-medium text-gray-900 dark:text-white mb-2"
                                    data-oid=":-ld:ff"
                                >
                                    归档方案说明
                                </h3>
                                <p
                                    className="text-sm text-gray-600 dark:text-gray-400"
                                    data-oid="4bh.jkg"
                                >
                                    数据归档功能使用 Filebeat 将 Zabbix 历史数据导出并收集到
                                    Elasticsearch 中。 这样可以减轻 Zabbix
                                    数据库的负担，同时保留历史数据以供查询和分析。
                                    归档后的数据可以通过 Kibana 进行可视化和分析。
                                </p>
                            </div>

                            <h3
                                className="text-lg font-medium text-gray-900 dark:text-white mb-4"
                                data-oid="f:-h7uh"
                            >
                                归档任务状态
                            </h3>
                            <table
                                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                data-oid="2cj7v6o"
                            >
                                <thead className="bg-gray-50 dark:bg-gray-700" data-oid="0rl2841">
                                    <tr data-oid="6odvspi">
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="abamcqb"
                                        >
                                            任务 ID
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="vj2f8n_"
                                        >
                                            开始时间
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="zyir6i2"
                                        >
                                            结束时间
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="-li0bcg"
                                        >
                                            归档数据量
                                        </th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            data-oid="1x.lrci"
                                        >
                                            状态
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                                    data-oid="ed5s7g-"
                                >
                                    {archiveRecords.map((record) => (
                                        <tr key={record.id} data-oid="qsmu34s">
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                                data-oid="z08bl-3"
                                            >
                                                {record.id}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="4ror_2l"
                                            >
                                                {record.startTime}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="a227j1p"
                                            >
                                                {record.endTime}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="nx_8m.6"
                                            >
                                                {record.dataSize}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                data-oid="p-1l7zs"
                                            >
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                                    data-oid="b6423u5"
                                                >
                                                    成功
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 flex justify-end" data-oid="xbtz8ui">
                                <button
                                    className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    data-oid="56ap3u2"
                                >
                                    立即执行归档
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8" data-oid="98fdror">
                            <p className="text-gray-500 dark:text-gray-400 mb-4" data-oid="hh3ykqa">
                                数据归档功能当前已禁用。启用此功能可以将历史数据从 Zabbix 归档到
                                Elasticsearch 中， 减轻 Zabbix
                                数据库负担并提高系统性能。归档后的数据仍可通过 Kibana
                                进行查询和分析。
                            </p>
                            <button
                                onClick={() => setDataArchiveEnabled(true)}
                                className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                data-oid="31.48po"
                            >
                                启用数据归档
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
