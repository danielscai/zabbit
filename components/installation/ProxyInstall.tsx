'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProxyNode {
    id: string;
    name: string;
    status: string;
    version: string;
    lastSeen: string;
}

const ProxyInstall = () => {
    const [proxyNodes, setProxyNodes] = useState<ProxyNode[]>([
        {
            id: '1',
            name: 'proxy-beijing',
            status: 'active',
            version: '6.0.0',
            lastSeen: '2024-03-20 10:00:00',
        },
        // ... 更多proxy节点
    ]);

    return (
        <div className="space-y-8" data-oid="7zrbsfa">
            {/* Proxy模式介绍 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="85lnoff">
                <h2 className="text-xl font-semibold mb-4" data-oid="b98tmlu">
                    Proxy模式介绍
                </h2>
                <div className="flex space-x-6" data-oid="cr8nocj">
                    <div className="flex-1" data-oid="iz9v53m">
                        <p className="text-gray-600 dark:text-gray-300" data-oid="h3k73_3">
                            Zabbix proxy可以代表server收集监控数据，适合分布式监控场景...
                        </p>
                    </div>
                    <div className="w-1/2" data-oid="we37lrd">
                        <Image
                            src="/images/proxy-architecture.svg"
                            alt="Proxy架构图"
                            width={400}
                            height={300}
                            data-oid="k4eo:y6"
                        />
                    </div>
                </div>
            </section>

            {/* Proxy列表 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="4.ci8t:">
                <div className="flex justify-between items-center mb-4" data-oid="j8:t9gb">
                    <h2 className="text-xl font-semibold" data-oid="g-vu5r_">
                        已安装的Proxy列表
                    </h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" data-oid="q4jcf1v">
                        添加新Proxy
                    </button>
                </div>
                <div className="overflow-x-auto" data-oid="0hlglpr">
                    <table className="min-w-full divide-y divide-gray-200" data-oid="o1ie6mv">
                        <thead data-oid="a-__1u6">
                            <tr data-oid="4sgtmet">
                                <th className="px-6 py-3 text-left" data-oid="x.yzrj3">
                                    名称
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="9:2e2ft">
                                    状态
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="wa1wsie">
                                    版本
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="ls5ce3y">
                                    最后在线时间
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="n:f8vqm">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200" data-oid="em2mfzs">
                            {proxyNodes.map((node) => (
                                <tr key={node.id} data-oid="gl3yauy">
                                    <td className="px-6 py-4" data-oid="a:3zz3o">
                                        {node.name}
                                    </td>
                                    <td className="px-6 py-4" data-oid="0b6sc74">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                node.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="x1ze1x4"
                                        >
                                            {node.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid=".7jch4-">
                                        {node.version}
                                    </td>
                                    <td className="px-6 py-4" data-oid="y0xh6.z">
                                        {node.lastSeen}
                                    </td>
                                    <td className="px-6 py-4" data-oid="hn-divm">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            data-oid="0a4676c"
                                        >
                                            管理
                                        </button>
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

export default ProxyInstall;
