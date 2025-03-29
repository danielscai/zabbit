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
        <div className="fixed inset-0 z-50 overflow-y-auto" data-oid="rzq:2:9">
            <div className="flex items-center justify-center min-h-screen p-4" data-oid="4c119-f">
                <div
                    className="fixed inset-0 bg-black opacity-30"
                    onClick={onClose}
                    data-oid=".030xcv"
                ></div>
                <div
                    className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl"
                    data-oid="vakli-z"
                >
                    <div
                        className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700"
                        data-oid="e_m0_rw"
                    >
                        <div className="flex items-center space-x-3" data-oid="w_e7qc-">
                            <img
                                src={template.icon}
                                alt={template.title}
                                className="w-10 h-10"
                                data-oid="k:8yq8n"
                            />

                            <h3
                                className="text-xl font-semibold text-gray-900 dark:text-white"
                                data-oid="rvn1s:6"
                            >
                                {template.title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                            data-oid="2d2d:hn"
                        >
                            <span className="sr-only" data-oid=".qmddw_">
                                关闭
                            </span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                data-oid="3pqfoiz"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                    data-oid=".6_62:e"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6" data-oid="6qm2.9p">
                        <div className="mb-6" data-oid=":d48i7n">
                            <h4 className="text-lg font-medium mb-2" data-oid="jey-9ky">
                                配置说明
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300" data-oid="083amg0">
                                {template.description}
                            </p>
                        </div>

                        <div data-oid="i_picr_">
                            <h4 className="text-lg font-medium mb-2" data-oid="latsi61">
                                监控指标
                            </h4>
                            <div className="space-y-2" data-oid="lafzjox">
                                {template.indicators.map((indicator, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded"
                                        data-oid="8-_u7ur"
                                    >
                                        <h5 className="font-medium" data-oid="_eq-1tj">
                                            {indicator.name}
                                        </h5>
                                        <p
                                            className="text-sm text-gray-600 dark:text-gray-300"
                                            data-oid="6crvcr5"
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
