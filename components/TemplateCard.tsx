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
            data-oid="doq2mur"
        >
            <div className="flex items-start space-x-4" data-oid="0qp3f80">
                <img src={icon} alt={title} className="w-12 h-12 rounded" data-oid="1fq5u-t" />
                <div className="flex-1" data-oid="imwyt.3">
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="lvb4f05"
                    >
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" data-oid="zr4twvd">
                        {description}
                    </p>
                    <p className="mt-2 text-xs text-gray-400" data-oid="oyso:us">
                        使用 {usedTimes} 次
                    </p>
                </div>
            </div>
        </div>
    );
}
