'use client';

import { useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

interface AgentNode {
    id: string;
    hostname: string;
    ip: string;
    version: string;
    status: string;
    hasUpdate: boolean;
    os: string;
}

const AgentInstall = () => {
    const [installScript] = useState('curl -sSL https://install.example.com/agent | sudo bash');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [agentNodes, setAgentNodes] = useState<AgentNode[]>([
        {
            id: '1',
            hostname: 'web-server-01',
            ip: '192.168.1.100',
            version: '6.2.1',
            status: 'active',
            hasUpdate: true,
            os: 'Ubuntu 22.04',
        },
        {
            id: '2',
            hostname: 'db-server-prod',
            ip: '192.168.1.101',
            version: '6.0.0',
            status: 'active',
            hasUpdate: true,
            os: 'CentOS 7',
        },
        {
            id: '3',
            hostname: 'cache-01',
            ip: '192.168.1.102',
            version: '6.2.1',
            status: 'inactive',
            hasUpdate: false,
            os: 'Debian 11',
        },
        {
            id: '4',
            hostname: 'app-server-01',
            ip: '192.168.1.103',
            version: '6.1.0',
            status: 'active',
            hasUpdate: true,
            os: 'Ubuntu 20.04',
        },
        {
            id: '5',
            hostname: 'monitoring-01',
            ip: '192.168.1.104',
            version: '6.2.1',
            status: 'active',
            hasUpdate: false,
            os: 'CentOS 8',
        },
        {
            id: '6',
            hostname: 'load-balancer-01',
            ip: '192.168.1.105',
            version: '5.9.0',
            status: 'active',
            hasUpdate: true,
            os: 'Ubuntu 22.04',
        },
        {
            id: '7',
            hostname: 'storage-server-01',
            ip: '192.168.1.106',
            version: '6.2.0',
            status: 'inactive',
            hasUpdate: true,
            os: 'Debian 10',
        },
        {
            id: '8',
            hostname: 'backup-server-01',
            ip: '192.168.1.107',
            version: '6.2.1',
            status: 'active',
            hasUpdate: false,
            os: 'CentOS 7',
        },
        {
            id: '9',
            hostname: 'dev-server-01',
            ip: '192.168.1.108',
            version: '6.0.1',
            status: 'active',
            hasUpdate: true,
            os: 'Ubuntu 20.04',
        },
        {
            id: '10',
            hostname: 'test-server-01',
            ip: '192.168.1.109',
            version: '6.1.1',
            status: 'active',
            hasUpdate: true,
            os: 'Debian 11',
        },
        {
            id: '11',
            hostname: 'prod-app-02',
            ip: '192.168.1.110',
            version: '6.2.1',
            status: 'active',
            hasUpdate: false,
            os: 'Ubuntu 22.04',
        },
        {
            id: '49',
            hostname: 'staging-db-05',
            ip: '192.168.1.148',
            version: '6.1.0',
            status: 'active',
            hasUpdate: true,
            os: 'CentOS 8',
        },
        {
            id: '50',
            hostname: 'monitoring-backup',
            ip: '192.168.1.149',
            version: '6.2.1',
            status: 'active',
            hasUpdate: false,
            os: 'Ubuntu 22.04',
        },
    ]);

    const totalPages = Math.ceil(agentNodes.length / itemsPerPage);
    const currentItems = agentNodes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // 可以添加一个提示复制成功的消息
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    return (
        <div className="space-y-8" data-oid=".qtm3_3">
            <div className="grid grid-cols-2 gap-8" data-oid="rd-z_-:">
                {/* 自动部署 */}
                <section
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                    data-oid="erj::j_"
                >
                    <h2 className="text-xl font-semibold mb-4" data-oid="ijwl_ns">
                        自动部署
                    </h2>
                    <div className="space-y-4" data-oid="fylm:4z">
                        <div className="grid grid-cols-2 gap-4" data-oid="ygled95">
                            <div data-oid="hu7o7nl">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    data-oid="csfunpz"
                                >
                                    主机地址
                                </label>
                                <input
                                    type="text"
                                    placeholder="输入IP地址或主机名"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    data-oid="1qe9_bx"
                                />
                            </div>
                            <div data-oid="89brohl">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    data-oid="hcyfvzg"
                                >
                                    SSH凭据
                                </label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    data-oid="9nsjaha"
                                >
                                    <option data-oid="nx77dmo">选择SSH凭据</option>
                                    <option data-oid="10g9kou">新建SSH凭据</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            data-oid=":476b9h"
                        >
                            开始自动部署
                        </button>
                    </div>
                </section>

                {/* 手动部署 */}
                <section
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                    data-oid="mj6a292"
                >
                    <h2 className="text-xl font-semibold mb-4" data-oid="v4fil0y">
                        手动部署
                    </h2>
                    <div className="space-y-4" data-oid="lwa-u4q">
                        <div className="relative" data-oid="zk_bccw">
                            <input
                                type="text"
                                value={installScript}
                                readOnly
                                className="w-full p-3 pr-10 bg-gray-50 border rounded-md"
                                data-oid="hkybeng"
                            />

                            <button
                                onClick={() => copyToClipboard(installScript)}
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                data-oid="e_yyx4t"
                            >
                                <ClipboardIcon
                                    className="h-5 w-5 text-gray-500 hover:text-blue-500"
                                    data-oid="gv7ca12"
                                />
                            </button>
                        </div>
                        <div className="text-sm text-gray-600" data-oid="k6kg-4e">
                            复制上述命令并在目标服务器终端中执行即可完成安装
                        </div>
                    </div>
                </section>
            </div>

            {/* Agent列表 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="f0rlgsq">
                <h2 className="text-xl font-semibold mb-4" data-oid="t2h7.tt">
                    已安装Agent列表
                </h2>
                <div className="overflow-x-auto" data-oid="ja9h7g.">
                    <table className="min-w-full divide-y divide-gray-200" data-oid="c5ca0dy">
                        <thead data-oid="o22p._z">
                            <tr data-oid="417oigg">
                                <th className="px-6 py-3 text-left" data-oid="4kt:u5p">
                                    主机名
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="a6q_36a">
                                    IP地址
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="qp-w:4z">
                                    版本
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="j8nuevw">
                                    状态
                                </th>
                                <th className="px-6 py-3 text-left" data-oid=":0vjvy4">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200" data-oid="g0t-vjh">
                            {currentItems.map((node) => (
                                <tr key={node.id} data-oid="e0qwvxa">
                                    <td className="px-6 py-4" data-oid="4fzr.ag">
                                        {node.hostname}
                                    </td>
                                    <td className="px-6 py-4" data-oid="o9l2t4c">
                                        {node.ip}
                                    </td>
                                    <td className="px-6 py-4" data-oid="b_sczr-">
                                        <span className="flex items-center" data-oid="bv_bepj">
                                            {node.version}
                                            {node.hasUpdate && (
                                                <span
                                                    className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                                                    data-oid="bhr4u8b"
                                                >
                                                    可更新
                                                </span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid="6389o.b">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                node.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="ockz6zy"
                                        >
                                            {node.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid="-c0u.es">
                                        <div className="space-x-2" data-oid="7jvq_2c">
                                            {node.hasUpdate && (
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    data-oid="3:qim3-"
                                                >
                                                    升级
                                                </button>
                                            )}
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                data-oid="tvkt-5s"
                                            >
                                                卸载
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 分页控件 */}
                    <div className="mt-4 flex justify-center space-x-2" data-oid="_xi9gqg">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === i + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                data-oid="a.jywmx"
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AgentInstall;
