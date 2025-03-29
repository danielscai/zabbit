import { useEffect, useState } from 'react';

interface InstallProgressProps {
    isInstalling: boolean;
    onComplete: () => void;
}

export default function InstallProgress({ isInstalling, onComplete }: InstallProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isInstalling) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        onComplete();
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);

            return () => clearInterval(interval);
        }
    }, [isInstalling, onComplete]);

    if (!isInstalling) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            data-oid="dw43j:u"
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96" data-oid="d7:u0n5">
                <div className="text-center mb-4" data-oid="tkj-g-o">
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="_det-o1"
                    >
                        正在安装扩展
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1" data-oid="f6ke1zm">
                        请稍候...
                    </p>
                </div>
                <div className="relative pt-1" data-oid="ope_gla">
                    <div className="flex mb-2 items-center justify-between" data-oid=":y1gu0w">
                        <div data-oid="bwf81:q">
                            <span
                                className="text-xs font-semibold inline-block text-purple-600"
                                data-oid="6sz1c84"
                            >
                                {progress}%
                            </span>
                        </div>
                    </div>
                    <div
                        className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200 dark:bg-purple-900/20"
                        data-oid="wd:dalj"
                    >
                        <div
                            style={{ width: `${progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500 ease-in-out"
                            data-oid="rl-jns1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
