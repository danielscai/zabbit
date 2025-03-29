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
        // ... 添加更多模拟数据 ...
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
        <div className="space-y-8" data-oid="p65.c:d">
            <div className="grid grid-cols-2 gap-8" data-oid="ujyo_ql">
                {/* 自动部署 */}
                <section
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                    data-oid="vb7cd1f"
                >
                    <h2 className="text-xl font-semibold mb-4" data-oid="erqem-x">
                        自动部署
                    </h2>
                    <div className="space-y-4" data-oid="0:zd6lx">
                        <div className="grid grid-cols-2 gap-4" data-oid="cs8n0bv">
                            <div data-oid="h7giw_y">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    data-oid="qoy9m.h"
                                >
                                    主机地址
                                </label>
                                <input
                                    type="text"
                                    placeholder="输入IP地址或主机名"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    data-oid="wm9mhem"
                                />
                            </div>
                            <div data-oid="asy855w">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    data-oid=".3vkdw2"
                                >
                                    SSH凭据
                                </label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    data-oid="wvlrg-8"
                                >
                                    <option data-oid=".t6x0di">选择SSH凭据</option>
                                    <option data-oid="k-qzkgb">新建SSH凭据</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            data-oid="g.:64bh"
                        >
                            开始自动部署
                        </button>
                    </div>
                </section>

                {/* 手动部署 */}
                <section
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                    data-oid="_foql8b"
                >
                    <h2 className="text-xl font-semibold mb-4" data-oid=".pakap:">
                        手动部署
                    </h2>
                    <div className="space-y-4" data-oid="mwuawli">
                        <div className="relative" data-oid="x8ogi__">
                            <input
                                type="text"
                                value={installScript}
                                readOnly
                                className="w-full p-3 pr-10 bg-gray-50 border rounded-md"
                                data-oid="q1x3dtl"
                            />

                            <button
                                onClick={() => copyToClipboard(installScript)}
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                data-oid="t_.shu:"
                            >
                                <ClipboardIcon
                                    className="h-5 w-5 text-gray-500 hover:text-blue-500"
                                    data-oid="f:-.k_n"
                                />
                            </button>
                        </div>
                        <div className="text-sm text-gray-600" data-oid="kb1g3vn">
                            复制上述命令并在目标服务器终端中执行即可完成安装
                        </div>
                    </div>
                </section>
            </div>

            {/* Agent列表 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="ha.1wc_">
                <h2 className="text-xl font-semibold mb-4" data-oid="u.ogb0g">
                    已安装Agent列表
                </h2>
                <div className="overflow-x-auto" data-oid="ib-tcd9">
                    <table className="min-w-full divide-y divide-gray-200" data-oid="kysv0pm">
                        <thead data-oid="z5y8c90">
                            <tr data-oid="3umz-a6">
                                <th className="px-6 py-3 text-left" data-oid="dva8v7o">
                                    主机名
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="lwc_5n8">
                                    IP地址
                                </th>
                                <th className="px-6 py-3 text-left" data-oid=".q86ohi">
                                    版本
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="f007dv9">
                                    状态
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="es-3bgu">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200" data-oid="w:spjmq">
                            {currentItems.map((node) => (
                                <tr key={node.id} data-oid="7s4v3oy">
                                    <td className="px-6 py-4" data-oid="jfm-8nb">
                                        {node.hostname}
                                    </td>
                                    <td className="px-6 py-4" data-oid="vwwq8lm">
                                        {node.ip}
                                    </td>
                                    <td className="px-6 py-4" data-oid="xo6ny:h">
                                        <span className="flex items-center" data-oid="uasphx3">
                                            {node.version}
                                            {node.hasUpdate && (
                                                <span
                                                    className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                                                    data-oid="8e-jq4z"
                                                >
                                                    可更新
                                                </span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid="gdu:cod">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                node.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="pk.7b84"
                                        >
                                            {node.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid="sm-3amj">
                                        <div className="space-x-2" data-oid=".qt6eqt">
                                            {node.hasUpdate && (
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    data-oid="amw-v0m"
                                                >
                                                    升级
                                                </button>
                                            )}
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                data-oid="2jhdvp2"
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
                    <div className="mt-4 flex justify-center space-x-2" data-oid="kyti4mc">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === i + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                data-oid="53e.6v."
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
