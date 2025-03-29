import { ReactNode } from 'react';

interface ExtensionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    extension: {
        title: string;
        description: string;
        icon: ReactNode;
        indicators: Array<{
            name: string;
            description: string;
        }>;
    } | null;
}

export default function ExtensionDetailModal({
    isOpen,
    onClose,
    extension,
}: ExtensionDetailModalProps) {
    if (!isOpen || !extension) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" data-oid="fo7thgc">
            <div className="flex items-center justify-center min-h-screen p-4" data-oid="wei1v:u">
                <div
                    className="fixed inset-0 bg-black opacity-30"
                    onClick={onClose}
                    data-oid="ov:twzy"
                ></div>
                <div
                    className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl"
                    data-oid="4cz37mh"
                >
                    <div
                        className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700"
                        data-oid="llhnp0b"
                    >
                        <div className="flex items-center space-x-3" data-oid="1cvird8">
                            <div
                                className="w-10 h-10 rounded bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center"
                                data-oid="nce2wd3"
                            >
                                {extension.icon}
                            </div>

                            <h3
                                className="text-xl font-semibold text-gray-900 dark:text-white"
                                data-oid="bimxp-f"
                            >
                                {extension.title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                            data-oid="kxwh3bt"
                        >
                            <span className="sr-only" data-oid=":e:uy0.">
                                关闭
                            </span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                data-oid="jpmqj:x"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                    data-oid="v0-361l"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6" data-oid="xqo4uih">
                        <div className="mb-6" data-oid="d5at339">
                            <h4 className="text-lg font-medium mb-2" data-oid=".21iagc">
                                配置说明
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300" data-oid="nx_gfyi">
                                {extension.description}
                            </p>
                        </div>

                        <div data-oid="dpbzx.q">
                            <h4 className="text-lg font-medium mb-2" data-oid="6-..q9s">
                                监控指标
                            </h4>
                            <div className="space-y-2" data-oid="rktyt5p">
                                {extension.indicators.map((indicator, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded"
                                        data-oid="ppu5fyc"
                                    >
                                        <h5 className="font-medium" data-oid="v.v-w3s">
                                            {indicator.name}
                                        </h5>
                                        <p
                                            className="text-sm text-gray-600 dark:text-gray-300"
                                            data-oid="lyz1dmo"
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
