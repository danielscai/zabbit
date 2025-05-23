'use client';

export default function ServerDetailSkeleton() {
    return (
        <div className="flex-1 flex flex-col">
            {/* 固定在顶部的骨架 */}
            <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
                {/* 标题骨架 */}
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mr-4 animate-pulse" />
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                </div>

                {/* 标签页骨架 */}
                <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex space-x-8 py-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 可滚动的内容区域骨架 */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="space-y-6">
                        {/* 基本信息卡片骨架 */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 图表骨架 */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                            <div className="p-6">
                                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 