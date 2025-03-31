'use client';

import { useRouter } from 'next/navigation';
import ServerDetail from '../../components/ServerDetail';
import Sidebar from '@/components/sidebar';

interface ServerPageProps {
    params: {
        serverId: string;
    };
}

export default function ServerPage({ params }: ServerPageProps) {
    const router = useRouter();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                实例详情
                            </h1>
                            <button
                                onClick={() => router.back()}
                                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center"
                            >
                                <span className="mr-2">←</span> 返回实例列表
                            </button>
                        </div>
                        <ServerDetail 
                            serverId={params.serverId} 
                            onBack={() => router.back()} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 