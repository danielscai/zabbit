'use client';

import { useState } from 'react';

interface AgentNode {
    id: string;
    hostname: string;
    ip: string;
    version: string;
    status: string;
    hasUpdate: boolean;
}

const AgentInstall = () => {
    const [agentNodes, setAgentNodes] = useState<AgentNode[]>([
        {
            id: '1',
            hostname: 'web-server-01',
            ip: '192.168.1.100',
            version: '6.0.0',
            status: 'active',
            hasUpdate: true,
        },
        // ... 更多节点
    ]);

    return (
        <div className="space-y-8" data-oid=".e320t0">
            {/* 批量部署 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="9pc8d.k">
                <h2 className="text-xl font-semibold mb-4" data-oid="grf4fsf">
                    批量部署
                </h2>
                <div className="space-y-4" data-oid="u2_qkhn">
                    <div className="flex space-x-4" data-oid="uatlf3w">
                        <div className="flex-1" data-oid="e99askn">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="ug:5g3x"
                            >
                                上传主机列表
                            </label>
                            <input
                                type="file"
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                                data-oid="qj.887y"
                            />
                        </div>
                        <div className="flex-1" data-oid="y:6zt56">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="6xtf1j4"
                            >
                                选择Agent版本
                            </label>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                data-oid="ca9jgft"
                            >
                                <option data-oid=":s5u7:n">6.0.0</option>
                                <option data-oid="jpo21hy">5.0.0</option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" data-oid="v-.ofp9">
                        开始批量部署
                    </button>
                </div>
            </section>

            {/* 一键部署 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="i14y38j">
                <h2 className="text-xl font-semibold mb-4" data-oid="kdrbtud">
                    一键部署
                </h2>
                <div className="space-y-4" data-oid="542e0oc">
                    <div className="grid grid-cols-2 gap-4" data-oid="kk_d-vl">
                        <div data-oid="c8czpq3">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="2c1g4:3"
                            >
                                主机地址
                            </label>
                            <input
                                type="text"
                                placeholder="输入IP地址或主机名"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                data-oid="h.8ntea"
                            />
                        </div>
                        <div data-oid="06s.4v9">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="e_jkp7n"
                            >
                                SSH端口
                            </label>
                            <input
                                type="number"
                                defaultValue={22}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                data-oid="fqcl.0c"
                            />
                        </div>
                        <div data-oid="wjr.me3">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="gud6ifc"
                            >
                                用户名
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                data-oid="xq.w0y0"
                            />
                        </div>
                        <div data-oid="alod-od">
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="_qb0jr4"
                            >
                                密码
                            </label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                data-oid="o:k7ki0"
                            />
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" data-oid="x334x7:">
                        开始部署
                    </button>
                </div>
            </section>

            {/* Agent列表 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="v0cl3od">
                <h2 className="text-xl font-semibold mb-4" data-oid="-nbi05s">
                    已安装Agent列表
                </h2>
                <div className="overflow-x-auto" data-oid="0dq7e17">
                    <table className="min-w-full divide-y divide-gray-200" data-oid="2p39:i4">
                        <thead data-oid="w0yl4.w">
                            <tr data-oid="mbfax-6">
                                <th className="px-6 py-3 text-left" data-oid="-39srgo">
                                    主机名
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="wyi:ela">
                                    IP地址
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="eb27fn9">
                                    版本
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="kp:v49a">
                                    状态
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="lpg0xf7">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200" data-oid="o_j9gij">
                            {agentNodes.map((node) => (
                                <tr key={node.id} data-oid="jc6w01w">
                                    <td className="px-6 py-4" data-oid="la.tq.m">
                                        {node.hostname}
                                    </td>
                                    <td className="px-6 py-4" data-oid="w-boo-o">
                                        {node.ip}
                                    </td>
                                    <td className="px-6 py-4" data-oid="s_m1anw">
                                        <span className="flex items-center" data-oid="y6ys34d">
                                            {node.version}
                                            {node.hasUpdate && (
                                                <span
                                                    className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                                                    data-oid="uk9v_00"
                                                >
                                                    可更新
                                                </span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid="845zxrm">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                node.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="rt-7ucp"
                                        >
                                            {node.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid="l4om7pj">
                                        <div className="space-x-2" data-oid="m1ami_k">
                                            {node.hasUpdate && (
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    data-oid="yy689f8"
                                                >
                                                    升级
                                                </button>
                                            )}
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                data-oid="_x1bcew"
                                            >
                                                卸载
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AgentInstall;
