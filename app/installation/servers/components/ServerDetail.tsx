'use client';

interface ServerDetailProps {
    serverId: string;
}

export default function ServerDetail({ serverId }: ServerDetailProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    实例详情 #{serverId}
                </h2>
            </div>
            <div className="px-6 py-4">
                {/* 实例详情内容将在这里实现 */}
            </div>
        </div>
    );
} 