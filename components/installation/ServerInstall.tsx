'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ServerInstall = () => {
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
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg mt-auto"
                    data-oid="2y6_d3d"
                >
                    开始部署
                </motion.button>
            </section>

            {/* 集群模式 */}
            <section
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col"
                data-oid="a7.xm8l"
            >
                <div className="flex-1" data-oid="vpp72ih">
                    <div
                        className="absolute -top-2 -right-2 bg-[#2C1810] text-[#FFD700] px-3 py-1 rounded-full text-sm font-semibold shadow-lg border border-[#463229] transform rotate-12"
                        data-oid="dz93xti"
                    >
                        PRO
                    </div>
                    <h2 className="text-xl font-semibold mb-4" data-oid="7x09ft1">
                        集群模式
                    </h2>
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
                    <div
                        className="absolute -top-2 -right-2 bg-[#2C1810] text-[#FFD700] px-3 py-1 rounded-full text-sm font-semibold shadow-lg border border-[#463229] transform rotate-12"
                        data-oid="od2jhcm"
                    >
                        PRO
                    </div>
                    <h2 className="text-xl font-semibold mb-4" data-oid="kc5suoq">
                        分布式集群
                    </h2>
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
