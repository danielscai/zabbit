interface TemplateDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: {
        title: string;
        description: string;
        icon: string;
        indicators: Array<{
            name: string;
            description: string;
        }>;
    };
}

export default function TemplateDetailModal({
    isOpen,
    onClose,
    template,
}: TemplateDetailModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" data-oid="iamc7qr">
            <div className="flex items-center justify-center min-h-screen p-4" data-oid="y7i-:gt">
                <div
                    className="fixed inset-0 bg-black opacity-30"
                    onClick={onClose}
                    data-oid="v3tlfdr"
                ></div>
                <div
                    className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl"
                    data-oid="05t5tnl"
                >
                    <div
                        className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700"
                        data-oid="3yz9v_i"
                    >
                        <div className="flex items-center space-x-3" data-oid="_yf5g4a">
                            <img
                                src={template.icon}
                                alt={template.title}
                                className="w-10 h-10"
                                data-oid=".90h4o4"
                            />

                            <h3
                                className="text-xl font-semibold text-gray-900 dark:text-white"
                                data-oid="swizjki"
                            >
                                {template.title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                            data-oid="hvhldj2"
                        >
                            <span className="sr-only" data-oid="k6i:duu">
                                关闭
                            </span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                data-oid="4514bk."
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                    data-oid="s1.ms83"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6" data-oid="nde:ysl">
                        <div className="mb-6" data-oid="4z:9pwf">
                            <h4 className="text-lg font-medium mb-2" data-oid="ovm1bv8">
                                配置说明
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300" data-oid="ys72p86">
                                {template.description}
                            </p>
                        </div>

                        <div data-oid="zk29r-y">
                            <h4 className="text-lg font-medium mb-2" data-oid="e2jswz8">
                                监控指标
                            </h4>
                            <div className="space-y-2" data-oid="9pn2or8">
                                {template.indicators.map((indicator, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded"
                                        data-oid="-:67xbl"
                                    >
                                        <h5 className="font-medium" data-oid="tepq8s.">
                                            {indicator.name}
                                        </h5>
                                        <p
                                            className="text-sm text-gray-600 dark:text-gray-300"
                                            data-oid="sy8-qt7"
                                        >
                                            {indicator.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
