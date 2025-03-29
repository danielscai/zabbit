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

const generateProxyNodes = () => {
    const cities = ['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安', '南京', '重庆'];
    return Array.from({ length: 20 }, (_, i) => ({
        id: (i + 1).toString(),
        name: `proxy-${cities[i % cities.length]}${Math.floor(i / cities.length) + 1}`,
        status: Math.random() > 0.2 ? 'active' : 'inactive',
        version: '6.0.0',
        lastSeen: new Date(Date.now() - Math.random() * 86400000)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
    }));
};

const ProxyInstall = () => {
    const [proxyNodes, setProxyNodes] = useState<ProxyNode[]>(generateProxyNodes());

    return (
        <div className="space-y-8" data-oid="hq_fxfr">
            {/* Proxy模式介绍 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-8" data-oid="99xpnq0">
                <div className="flex space-x-8 items-stretch" data-oid="23r-nen">
                    <div className="flex-1" data-oid="i71_z:4">
                        <h2 className="text-2xl font-semibold mb-6" data-oid=":uvo_zt">
                            Proxy模式介绍
                        </h2>
                        <div
                            className="text-gray-600 dark:text-gray-300 space-y-3"
                            data-oid="lfzibrq"
                        >
                            <p className="flex items-start" data-oid="3lka14f">
                                <span
                                    className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3"
                                    data-oid="x47vc_h"
                                >
                                    1
                                </span>
                                <span data-oid="o4zmzld">
                                    Zabbix
                                    Proxy作为Server的数据收集代理，特别适合分布式监控场景，可有效减轻中心服务器负载。
                                </span>
                            </p>
                            <p className="flex items-start" data-oid="av.3voj">
                                <span
                                    className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3"
                                    data-oid=".lm7mqj"
                                >
                                    2
                                </span>
                                <span data-oid="cag0vt8">
                                    每个Proxy节点都配备独立数据库，小规模部署可选用SQLite，大规模场景推荐使用MySQL或PostgreSQL。
                                </span>
                            </p>
                            <p className="flex items-start" data-oid="pyj_o.0">
                                <span
                                    className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3"
                                    data-oid="qch4d7i"
                                >
                                    3
                                </span>
                                <span data-oid="tq56enf">
                                    单个Proxy可高效处理数百至数千台主机的监控，建议根据网络环境选择主动或被动模式，并定期监控性能指标。
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2" data-oid="2occt:2">
                        <Image
                            src="/images/proxy-architecture.svg"
                            alt="Proxy架构图"
                            width={400}
                            height={400}
                            className="max-w-full h-auto"
                            data-oid="xlu86o:"
                        />
                    </div>
                </div>
            </section>

            {/* Proxy列表 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="5ym026k">
                <div className="flex justify-between items-center mb-4" data-oid=":_5dwy0">
                    <h2 className="text-xl font-semibold" data-oid="evfgp1o">
                        已安装的Proxy列表
                    </h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" data-oid="yl_s3ey">
                        添加新Proxy
                    </button>
                </div>
                <div className="overflow-x-auto" data-oid="7ifzlbw">
                    <table className="min-w-full divide-y divide-gray-200" data-oid="qxnh14f">
                        <thead data-oid="5u1e58-">
                            <tr data-oid="160odzq">
                                <th className="px-6 py-3 text-left" data-oid="aauypo1">
                                    名称
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="iyh-e-r">
                                    状态
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="wcijpkp">
                                    版本
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="s9_qed9">
                                    最后在线时间
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="2-ryzfk">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200" data-oid="__boqgf">
                            {proxyNodes.map((node) => (
                                <tr key={node.id} data-oid="ge8-yd-">
                                    <td className="px-6 py-4" data-oid="rja25v-">
                                        {node.name}
                                    </td>
                                    <td className="px-6 py-4" data-oid="8vj-ceu">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                node.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="uu1n6qw"
                                        >
                                            {node.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-oid="7x0gi9y">
                                        {node.version}
                                    </td>
                                    <td className="px-6 py-4" data-oid="kemqid.">
                                        {node.lastSeen}
                                    </td>
                                    <td className="px-6 py-4" data-oid="2735tkd">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            data-oid="sdkje-n"
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
