'use client';

import { useState } from 'react';

// 添加新的导入
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

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
        {
            version: '6.0.0',
            type: 'agent',
            platform: 'rpm',
            releaseDate: '2024-03-01',
            size: '16MB',
        },
        {
            version: '6.0.0',
            type: 'server',
            platform: 'deb',
            releaseDate: '2024-03-01',
            size: '45MB',
        },
        {
            version: '6.0.0',
            type: 'server',
            platform: 'rpm',
            releaseDate: '2024-03-01',
            size: '48MB',
        },
        {
            version: '5.9.2',
            type: 'agent',
            platform: 'deb',
            releaseDate: '2024-02-15',
            size: '14MB',
        },
        {
            version: '5.9.2',
            type: 'proxy',
            platform: 'rpm',
            releaseDate: '2024-02-15',
            size: '25MB',
        },
        // ... 更多包版本
    ]);

    // 添加状态管理
    const [configType, setConfigType] = useState('manual'); // 'manual' | 'auto'
    const [platformType, setPlatformType] = useState('deb'); // 'deb' | 'rpm'

    return (
        <div className="space-y-8" data-oid="vlx7356">
            {/* 本平台软件源 */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" data-oid="dcz3hji">
                <h2 className="text-xl font-semibold mb-6" data-oid="v4ko8zu">
                    本平台软件源
                </h2>

                <div
                    className="grid grid-cols-1 md:grid-cols-5 gap-8 divide-x divide-gray-200"
                    data-oid="2bdfk0k"
                >
                    {/* 左侧：使用说明 (占3格) */}
                    <div className="md:col-span-3 space-y-6 pr-8" data-oid="l6:r:86">
                        <Tab.Group data-oid="u4_tulp">
                            {/* 配置方式选择 */}
                            <Tab.List
                                className="flex space-x-1 rounded-xl bg-gray-100 p-1"
                                data-oid="vk0c0tr"
                            >
                                <Tab
                                    className={({ selected }) =>
                                        clsx(
                                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                            'focus:outline-none',
                                            selected
                                                ? 'bg-white text-blue-600 shadow'
                                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800',
                                        )
                                    }
                                    data-oid="18kd2us"
                                >
                                    手动配置
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        clsx(
                                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                            'focus:outline-none',
                                            selected
                                                ? 'bg-white text-blue-600 shadow'
                                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800',
                                        )
                                    }
                                    data-oid="i04pkus"
                                >
                                    自动配置
                                </Tab>
                            </Tab.List>

                            <Tab.Panels className="mt-6" data-oid="x8:fv0z">
                                {/* 手动配置面板 */}
                                <Tab.Panel data-oid="rlrpoeu">
                                    <div className="flex" data-oid="63c63k:">
                                        {/* 左侧小型切换按钮 */}
                                        <div
                                            className="flex flex-col space-y-2 mr-4"
                                            data-oid="-8jz1qe"
                                        >
                                            <button
                                                onClick={() => setPlatformType('deb')}
                                                className={clsx(
                                                    'px-3 py-2 text-sm rounded-md font-medium',
                                                    'transition-colors duration-150',
                                                    platformType === 'deb'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100',
                                                )}
                                                data-oid="mgac:8e"
                                            >
                                                DEB
                                            </button>
                                            <button
                                                onClick={() => setPlatformType('rpm')}
                                                className={clsx(
                                                    'px-3 py-2 text-sm rounded-md font-medium',
                                                    'transition-colors duration-150',
                                                    platformType === 'rpm'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100',
                                                )}
                                                data-oid="2cn5-7j"
                                            >
                                                RPM
                                            </button>
                                        </div>

                                        {/* 右侧配置说明 */}
                                        <div
                                            className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg"
                                            data-oid="fekt2zi"
                                        >
                                            {platformType === 'deb' ? (
                                                <ol
                                                    className="list-decimal list-inside space-y-3"
                                                    data-oid="4fmitf9"
                                                >
                                                    <li data-oid="k8fd_kp">
                                                        编辑源配置文件：
                                                        <code
                                                            className="ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                                            data-oid="66qvres"
                                                        >
                                                            sudo nano
                                                            /etc/apt/sources.list.d/example.list
                                                        </code>
                                                    </li>
                                                    <li data-oid="g149wcm">
                                                        添加右侧所示的DEB源地址
                                                    </li>
                                                    <li data-oid="cpijsxb">
                                                        更新源：
                                                        <code
                                                            className="ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                                            data-oid="r6m8tcs"
                                                        >
                                                            sudo apt update
                                                        </code>
                                                    </li>
                                                </ol>
                                            ) : (
                                                <ol
                                                    className="list-decimal list-inside space-y-3"
                                                    data-oid="tscsw8l"
                                                >
                                                    <li data-oid="erpz.9n">
                                                        创建源配置文件：
                                                        <code
                                                            className="ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                                            data-oid="fvaa-ao"
                                                        >
                                                            sudo nano /etc/yum.repos.d/example.repo
                                                        </code>
                                                    </li>
                                                    <li data-oid="uib_i73">
                                                        添加右侧所示的RPM源地址
                                                    </li>
                                                    <li data-oid="h_b2:y8">
                                                        更新源：
                                                        <code
                                                            className="ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                                            data-oid="v7ekr0p"
                                                        >
                                                            sudo yum makecache
                                                        </code>
                                                    </li>
                                                </ol>
                                            )}
                                        </div>
                                    </div>
                                </Tab.Panel>

                                {/* 自动配置面板 */}
                                <Tab.Panel
                                    className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg"
                                    data-oid="bomih4y"
                                >
                                    <p className="mb-4" data-oid="ilsatcg">
                                        下载并运行自动配置脚本：
                                    </p>
                                    <pre
                                        className="bg-gray-100 dark:bg-gray-800 p-3 rounded"
                                        data-oid="9e_q9jq"
                                    >
                                        wget http://repo.example.com/setup.sh sudo bash setup.sh
                                    </pre>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>

                    {/* 右侧：源地址 */}
                    <div className="md:col-span-2 space-y-6 pl-8" data-oid="sfkka.p">
                        <div data-oid=".cv_4r8">
                            <h3 className="text-lg font-medium mb-4" data-oid="j8..ljh">
                                源地址
                            </h3>
                            <code
                                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg block text-sm"
                                data-oid="rgy1my4"
                            >
                                {platformType === 'deb'
                                    ? 'deb http://repo.example.com/ubuntu focal main'
                                    : 'baseurl=http://repo.example.com/rhel/$releasever/'}
                            </code>
                        </div>
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
