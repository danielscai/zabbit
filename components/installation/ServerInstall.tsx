'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ServerInstall = () => {
    return (
        <div className="grid grid-cols-3 gap-6" data-oid="h2lwfx0">
            {/* 单机模式 */}
            <section
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col"
                data-oid="5c3gr1z"
            >
                <div className="flex-1" data-oid="7.inomv">
                    <h2 className="text-xl font-semibold mb-4" data-oid="3s7c..l">
                        单机模式
                    </h2>
                    <div className="flex flex-col" data-oid="78fu2os">
                        <div className="mb-4" data-oid="d11:0s6">
                            <p className="text-gray-600 dark:text-gray-300" data-oid="7tij5zu">
                                单机模式适合小型环境使用，所有组件部署在同一台服务器上...
                            </p>
                        </div>
                        <div className="w-full mb-4" data-oid="jv8wx2i">
                            <Image
                                src="/images/single-node.svg"
                                alt="单机部署架构图"
                                width={400}
                                height={300}
                                className="w-full"
                                data-oid="pcct9xd"
                            />
                        </div>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg mt-auto"
                    data-oid="i.4dk0g"
                >
                    开始部署
                </motion.button>
            </section>

            {/* 集群模式 */}
            <section
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col"
                data-oid="r47r05b"
            >
                <div className="flex-1" data-oid="_jfalk2">
                    <div
                        className="absolute -top-2 -right-2 bg-[#2C1810] text-[#FFD700] px-3 py-1 rounded-full text-sm font-semibold shadow-lg border border-[#463229] transform rotate-12"
                        data-oid=":r7ahvl"
                    >
                        PRO
                    </div>
                    <h2 className="text-xl font-semibold mb-4" data-oid="0c7mfp:">
                        集群模式
                    </h2>
                    <div className="mb-4" data-oid="-ajw1ex">
                        <p className="text-gray-600 dark:text-gray-300" data-oid="tw6edwp">
                            集群模式提供高可用性，支持水平扩展...
                        </p>
                    </div>
                    <div className="w-full mb-4" data-oid="avs_p4n">
                        <Image
                            src="/images/cluster-mode.svg"
                            alt="集群部署架构图"
                            width={400}
                            height={300}
                            className="w-full"
                            data-oid="8en.qd8"
                        />
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg"
                    data-oid="faef7wm"
                >
                    开始部署
                </motion.button>
            </section>

            {/* 分布式集群 */}
            <section
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col"
                data-oid=".wb-..d"
            >
                <div className="flex-1" data-oid="zblz52u">
                    <div
                        className="absolute -top-2 -right-2 bg-[#2C1810] text-[#FFD700] px-3 py-1 rounded-full text-sm font-semibold shadow-lg border border-[#463229] transform rotate-12"
                        data-oid="0c5me.."
                    >
                        PRO
                    </div>
                    <h2 className="text-xl font-semibold mb-4" data-oid="yw0u7.0">
                        分布式集群
                    </h2>
                    <div className="mb-4" data-oid="x8btv_0">
                        <p className="text-gray-600 dark:text-gray-300" data-oid="9ka6j5d">
                            分布式集群架构，支持跨区域部署和负载均衡...
                        </p>
                    </div>
                    <div className="w-full mb-4" data-oid="qcr337f">
                        <Image
                            src="/images/distributed-cluster-mode.svg"
                            alt="分布式集群架构图"
                            width={400}
                            height={300}
                            className="w-full"
                            data-oid="xk4q5p-"
                        />
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg"
                    data-oid="6n.1-8u"
                >
                    开始部署
                </motion.button>
            </section>
        </div>
    );
};

export default ServerInstall;
