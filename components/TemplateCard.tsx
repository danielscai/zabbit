import Image from 'next/image';

interface TemplateCardProps {
    title: string;
    description: string;
    icon: string;
    usedTimes: number;
    onClick: () => void;
}

export default function TemplateCard({
    title,
    description,
    icon,
    usedTimes,
    onClick,
}: TemplateCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            data-oid="9j6wfj2"
        >
            <div className="flex items-start space-x-4" data-oid="if9xiv3">
                <Image src={icon} alt={title} width={48} height={48} className="w-12 h-12 rounded" data-oid="5ccfdqr" />
                <div className="flex-1" data-oid="zt81.va">
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="v9r:o::"
                    >
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" data-oid="x-n9mm1">
                        {description}
                    </p>
                    <p className="mt-2 text-xs text-gray-400" data-oid="_u3ffzp">
                        使用 {usedTimes} 次
                    </p>
                </div>
            </div>
        </div>
    );
}
