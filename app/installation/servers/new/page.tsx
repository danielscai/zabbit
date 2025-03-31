'use client';

import { useRouter } from 'next/navigation';
import InstallationLayout from '../../components/InstallationLayout';

export default function NewServerPage() {
    const router = useRouter();

    return (
        <InstallationLayout>
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center"
                >
                    <span className="mr-2">←</span> 返回实例列表
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        创建新的 Zabbix 实例
                    </h2>
                </div>
                <div className="px-6 py-4">
                    {/* 创建表单将在这里实现 */}
                </div>
            </div>
        </InstallationLayout>
    );
} 