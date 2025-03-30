'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ProTag from '@/components/ProTag';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ProxyConfig, defaultProxyConfig } from '@/config/proxy';

const ServerInstall = () => {
    const [isDeploying, setIsDeploying] = useState(false);
    const [proxyConfig, setProxyConfig] = useState<ProxyConfig>(defaultProxyConfig);
    const [showProxyConfig, setShowProxyConfig] = useState(false);

    const handleDeploy = async () => {
        try {
            setIsDeploying(true);
            const response = await fetch('/api/deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mode: 'single',
                    proxyConfig,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '部署失败');
            }

            const data = await response.json();
            toast.success('部署成功！');
            // 可以在这里添加重定向到监控页面的逻辑
        } catch (error: any) {
            toast.error('部署失败：' + error.message);
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-6" data-oid="8zioxq5">
            {/* 单机模式 */}
            <section
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col"
                data-oid="i.6nivx"
            >
                <div className="flex-1" data-oid="lo9.-zz">
                    <h2 className="text-xl font-semibold mb-4" data-oid="l827du0">
                        单机模式
                    </h2>
                    <div className="flex flex-col" data-oid="sectpoe">
                        <div className="mb-4" data-oid="bar9uok">
                            <p className="text-gray-600 dark:text-gray-300" data-oid="2gg.pz9">
                                单机模式适合小型环境使用，所有组件部署在同一台服务器上...
                            </p>
                        </div>
                        <div className="w-full mb-4" data-oid="bfxvv8s">
                            <Image
                                src="/images/single-node.svg"
                                alt="单机部署架构图"
                                width={400}
                                height={300}
                                className="w-full"
                                data-oid="v_4j6by"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <button
                        onClick={() => setShowProxyConfig(!showProxyConfig)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        {showProxyConfig ? '隐藏代理配置' : '显示代理配置'}
                    </button>
                    
                    {showProxyConfig && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    HTTP 代理
                                </label>
                                <input
                                    type="text"
                                    value={proxyConfig.httpProxy}
                                    onChange={(e) => setProxyConfig({ ...proxyConfig, httpProxy: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    HTTPS 代理
                                </label>
                                <input
                                    type="text"
                                    value={proxyConfig.httpsProxy}
                                    onChange={(e) => setProxyConfig({ ...proxyConfig, httpsProxy: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    ALL 代理
                                </label>
                                <input
                                    type="text"
                                    value={proxyConfig.allProxy}
                                    onChange={(e) => setProxyConfig({ ...proxyConfig, allProxy: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>
                    )}
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        className={`w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg ${
                            isDeploying ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        data-oid="2y6_d3d"
                    >
                        {isDeploying ? '部署中...' : '开始部署'}
                    </motion.button>
                </div>
            </section>

            {/* 集群模式 */}
            <section
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col"
                data-oid="a7.xm8l"
            >
                <div className="flex-1" data-oid="vpp72ih">
                    <div className="flex items-center justify-between mb-4" data-oid="tif-x98">
                        <h2 className="text-xl font-semibold" data-oid="7x09ft1">
                            集群模式
                        </h2>
                        <ProTag variant="right" data-oid="g0b25uc" />
                    </div>
                    <div className="mb-4" data-oid="lb_zrj3">
                        <p className="text-gray-600 dark:text-gray-300" data-oid="omwmnbx">
                            集群模式提供高可用性，支持水平扩展...
                        </p>
                    </div>
                    <div className="w-full mb-4" data-oid="n1ekfhl">
                        <Image
                            src="/images/cluster-mode.svg"
                            alt="集群部署架构图"
                            width={400}
                            height={300}
                            className="w-full"
                            data-oid="7dp.i3p"
                        />
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg"
                    data-oid="d9srfz2"
                >
                    开始部署
                </motion.button>
            </section>

            {/* 分布式集群 */}
            <section
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col"
                data-oid="9b-xbta"
            >
                <div className="flex-1" data-oid="5qam.-a">
                    <div className="flex items-center justify-between mb-4" data-oid="9zifdrk">
                        <h2 className="text-xl font-semibold" data-oid="kc5suoq">
                            分布式集群
                        </h2>
                        <ProTag variant="right" data-oid="9t3k_xn" />
                    </div>
                    <div className="mb-4" data-oid="bak1l_4">
                        <p className="text-gray-600 dark:text-gray-300" data-oid="inmkc_2">
                            分布式集群架构，支持跨区域部署和负载均衡...
                        </p>
                    </div>
                    <div className="w-full mb-4" data-oid="9p:a36y">
                        <Image
                            src="/images/distributed-cluster-mode.svg"
                            alt="分布式集群架构图"
                            width={400}
                            height={300}
                            className="w-full"
                            data-oid="w1xnmoa"
                        />
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg"
                    data-oid="_ud0xle"
                >
                    开始部署
                </motion.button>
            </section>
        </div>
    );
};

export default ServerInstall;
