'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

export default function Page() {
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="n2m3vpo">
            <Sidebar data-oid="i71w0m:" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="6oi5q41">
                <Header title="Zabbit 管理平台" data-oid="gxwvi7j" />

                <main className="flex-1 overflow-y-auto p-6" data-oid="5c7leht">
                    <div className="max-w-7xl mx-auto" data-oid="nvws.v.">
                        <h2
                            className="text-2xl font-semibold text-gray-800 dark:text-white mb-6"
                            data-oid="-gpvh.."
                        >
                            欢迎使用 Zabbit 管理平台
                        </h2>

                        <div
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                            data-oid="qmy3ni_"
                        >
                            <p className="text-gray-700 dark:text-gray-300" data-oid="q64x:v-">
                                Zabbit 是一个现代化的 Zabbix
                                管理平台，提供直观的界面和强大的功能，帮助您更高效地管理监控系统。
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mt-4" data-oid="phsyh:n">
                                请从左侧菜单选择功能开始使用。
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
