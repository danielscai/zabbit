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
        <div className="space-y-8" data-oid="n3k6-eb">
            {/* 软件源使用说明 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="n4ztio9">
                <h2 className="text-xl font-semibold mb-4" data-oid="e1ldl_o">
                    软件源配置说明
                </h2>

                {/* DEB源配置 */}
                <div className="mb-6" data-oid="zo:i4mz">
                    <h3 className="text-lg font-medium mb-2" data-oid="uwd.4w2">
                        DEB源配置方法
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded" data-oid="1_121c5">
                        <pre className="text-sm" data-oid="4pyvoxj">
                            wget
                            https://repo.zabbix.com/zabbix/6.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.0-1+ubuntu20.04_all.deb
                            sudo dpkg -i zabbix-release_6.0-1+ubuntu20.04_all.deb sudo apt update
                        </pre>
                    </div>
                </div>

                {/* RPM源配置 */}
                <div data-oid="5n16.dr">
                    <h3 className="text-lg font-medium mb-2" data-oid="bbe04xa">
                        RPM源配置方法
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded" data-oid="0xleg62">
                        <pre className="text-sm" data-oid="u6wabza">
                            rpm -Uvh
                            https://repo.zabbix.com/zabbix/6.0/rhel/8/x86_64/zabbix-release-6.0-1.el8.noarch.rpm
                            dnf clean all
                        </pre>
                    </div>
                </div>
            </section>

            {/* 本平台软件源 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="bx4j-r-">
                <h2 className="text-xl font-semibold mb-4" data-oid="vujmlu0">
                    本平台软件源
                </h2>
                <div className="space-y-4" data-oid="ojfxpz-">
                    <div data-oid="7e:y4gn">
                        <h3 className="text-lg font-medium mb-2" data-oid="4-by1sk">
                            DEB源地址
                        </h3>
                        <code
                            className="bg-gray-50 dark:bg-gray-900 p-2 rounded block"
                            data-oid="q3.i91p"
                        >
                            deb http://repo.example.com/ubuntu focal main
                        </code>
                    </div>
                    <div data-oid="6y3865i">
                        <h3 className="text-lg font-medium mb-2" data-oid="axtsq4k">
                            RPM源地址
                        </h3>
                        <code
                            className="bg-gray-50 dark:bg-gray-900 p-2 rounded block"
                            data-oid="k6:1fes"
                        >
                            baseurl=http://repo.example.com/rhel/$releasever/
                        </code>
                    </div>
                </div>
            </section>

            {/* 软件包管理 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="6c_i0v-">
                <div className="flex justify-between items-center mb-4" data-oid="t1-p5b.">
                    <h2 className="text-xl font-semibold" data-oid="blpwjxw">
                        软件包版本管理
                    </h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" data-oid="ek0nczq">
                        上传新版本
                    </button>
                </div>
                <div className="overflow-x-auto" data-oid="fxr3eau">
                    <table className="min-w-full divide-y divide-gray-200" data-oid="_de5dvb">
                        <thead data-oid="09mvnl8">
                            <tr data-oid="ytezlbm">
                                <th className="px-6 py-3 text-left" data-oid="iynh4fu">
                                    版本
                                </th>
                                <th className="px-6 py-3 text-left" data-oid=".yitd8:">
                                    类型
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="-_v5zpk">
                                    平台
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="njite7-">
                                    发布日期
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="g_g2eyx">
                                    大小
                                </th>
                                <th className="px-6 py-3 text-left" data-oid="j8-7wan">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200" data-oid="xgz_kuv">
                            {packages.map((pkg, index) => (
                                <tr key={index} data-oid="n8-ls5-">
                                    <td className="px-6 py-4" data-oid="-5hlef-">
                                        {pkg.version}
                                    </td>
                                    <td className="px-6 py-4" data-oid="pmg8u.p">
                                        {pkg.type}
                                    </td>
                                    <td className="px-6 py-4" data-oid="wcjyaai">
                                        {pkg.platform}
                                    </td>
                                    <td className="px-6 py-4" data-oid="ommqw3m">
                                        {pkg.releaseDate}
                                    </td>
                                    <td className="px-6 py-4" data-oid="h1xzy4w">
                                        {pkg.size}
                                    </td>
                                    <td className="px-6 py-4" data-oid="la378r_">
                                        <div className="space-x-2" data-oid=".bo8iel">
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                data-oid="it3cy57"
                                            >
                                                下载
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                data-oid="zjtuma_"
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
