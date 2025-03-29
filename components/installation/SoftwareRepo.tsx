'use client';

import { useState } from 'react';

interface PackageVersion {
    version: string;
    type: 'agent' | 'server' | 'proxy';
    platform: 'deb' | 'rpm';
    releaseDate: string;
    size: string;
}

const SoftwareRepo = () => {
    const [packages, setPackages] = useState<PackageVersion[]>([
        {
            version: '6.0.0',
            type: 'agent',
            platform: 'deb',
            releaseDate: '2024-03-01',
            size: '15MB',
        },
        // ... 更多包版本
    ]);

    return (
        <div className="space-y-8" data-oid="g.-9w0g">
            {/* 软件源使用说明 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="am-nac9">
                <h2 className="text-xl font-semibold mb-4" data-oid="r3ea290">
                    软件源配置说明
                </h2>

                {/* DEB源配置 */}
                <div className="mb-6" data-oid="r_:z:64">
                    <h3 className="text-lg font-medium mb-2" data-oid="sm1kbyh">
                        DEB源配置方法
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded" data-oid="74v8ii3">
                        <pre className="text-sm" data-oid="rd4835:">
                            wget
                            https://repo.zabbix.com/zabbix/6.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.0-1+ubuntu20.04_all.deb
                            sudo dpkg -i zabbix-release_6.0-1+ubuntu20.04_all.deb sudo apt update
                        </pre>
                    </div>
                </div>

                {/* RPM源配置 */}
                <div data-oid="4h:9oo3">
                    <h3 className="text-lg font-medium mb-2" data-oid="-3-t0w8">
                        RPM源配置方法
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded" data-oid="i.o_:wn">
                        <pre className="text-sm" data-oid="fcz4e5t">
                            rpm -Uvh
                            https://repo.zabbix.com/zabbix/6.0/rhel/8/x86_64/zabbix-release-6.0-1.el8.noarch.rpm
                            dnf clean all
                        </pre>
                    </div>
                </div>
            </section>

            {/* 本平台软件源 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="05upq.9">
                <h2 className="text-xl font-semibold mb-4" data-oid="dr4um0k">
                    本平台软件源
                </h2>
                <div className="space-y-4" data-oid="gyodngo">
                    <div data-oid="qd3:zwz">
                        <h3 className="text-lg font-medium mb-2" data-oid="evr5low">
                            DEB源地址
                        </h3>
                        <code
                            className="bg-gray-50 dark:bg-gray-900 p-2 rounded block"
                            data-oid="5::bh9d"
                        >
                            deb http://repo.example.com/ubuntu focal main
                        </code>
                    </div>
                    <div data-oid="06oj.zf">
                        <h3 className="text-lg font-medium mb-2" data-oid=":pc0:1k">
                            RPM源地址
                        </h3>
                        <code
                            className="bg-gray-50 dark:bg-gray-900 p-2 rounded block"
                            data-oid="awhfc9x"
                        >
                            baseurl=http://repo.example.com/rhel/$releasever/
                        </code>
                    </div>
                </div>
            </section>

            {/* 软件包管理 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid=":t_ho1i">
                <div className="flex justify-between items-center mb-4" data-oid=".4.t214">
                    <h2 className="text-xl font-semibold" data-oid="ht_g4ui">
                        软件包版本管理
                    </h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" data-oid="-9.0ec3">
                        上传新版本
                    </button>
                </div>
                <div className="overflow-x-auto" data-oid="c1yle02">
                    <table className="min-w-full divide-y divide-gray-200" data-oid="wd7u..2">
                        <thead data-oid="dplqwai">
                            <tr data-oid="sbguti2">
                                <th className="px-6 py-3 text-left" data-oid="rp3j_h0">
                                    版本
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="w5k57x.">
                                    类型
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="lto8egg">
                                    平台
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="e-x6r5-">
                                    发布日期
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="hau0ups">
                                    大小
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="rn29n5t">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200" data-oid="jpf7zjx">
                            {packages.map((pkg, index) => (
                                <tr key={index} data-oid="2c4-c9g">
                                    <td className="px-6 py-4" data-oid="08yqpg4">
                                        {pkg.version}
                                    </td>
                                    <td className="px-6 py-4" data-oid="kynt.fi">
                                        {pkg.type}
                                    </td>
                                    <td className="px-6 py-4" data-oid="jtmj6c-">
                                        {pkg.platform}
                                    </td>
                                    <td className="px-6 py-4" data-oid="7a7qrx5">
                                        {pkg.releaseDate}
                                    </td>
                                    <td className="px-6 py-4" data-oid="t.1f1u9">
                                        {pkg.size}
                                    </td>
                                    <td className="px-6 py-4" data-oid="z72rp5a">
                                        <div className="space-x-2" data-oid="xqjixq8">
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                data-oid="pyxe-39"
                                            >
                                                下载
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                data-oid="4x.v287"
                                            >
                                                删除
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

export default SoftwareRepo;
