'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

export default function TemplatesPage() {
    // This would trigger the sidebar to collapse when navigating to this page
    useEffect(() => {
        // In a real implementation, you would use a global state management solution
        // to communicate between components
    }, []);
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="37p:64.">
            <Sidebar data-oid="ojf5lx1" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="d5-x4cy">
                <Header data-oid="swv0u1e" />

                <main className="flex-1 overflow-y-auto p-6" data-oid="kz3mn_u">
                    <div className="max-w-7xl mx-auto" data-oid="sk49i.-">
                        <h2
                            className="text-2xl font-semibold text-gray-800 dark:text-white mb-6"
                            data-oid="ixe2hnj"
                        >
                            模板管理
                        </h2>

                        <div
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                            data-oid="in4bggp"
                        >
                            <p className="text-gray-700 dark:text-gray-300" data-oid="s6ot4lo">
                                在这里您可以管理监控模板，创建、编辑和删除模板。
                            </p>

                            {/* Template list would go here */}
                            <div
                                className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                                data-oid="0ugj1pe"
                            >
                                <p
                                    className="text-gray-500 dark:text-gray-400 text-center"
                                    data-oid="dsmey9p"
                                >
                                    模板列表将显示在这里
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
