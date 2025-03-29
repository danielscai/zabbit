import { ReactNode } from 'react';

interface ExtensionCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    usedTimes: number;
    onClick: () => void;
}

export default function ExtensionCard({
    title,
    description,
    icon,
    usedTimes,
    onClick,
}: ExtensionCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            data-oid="pif:vhs"
        >
            <div className="flex items-start space-x-4" data-oid="4.ty8bc">
                <div
                    className="w-12 h-12 rounded bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center"
                    data-oid="aefi8ig"
                >
                    {icon}
                </div>
                <div className="flex-1" data-oid="h44p8_j">
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="cizw1:b"
                    >
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" data-oid="k8w1t-:">
                        {description}
                    </p>
                    <p className="mt-2 text-xs text-gray-400" data-oid="h8lrgy:">
                        使用 {usedTimes} 次
                    </p>
                </div>
            </div>
        </div>
    );
}
