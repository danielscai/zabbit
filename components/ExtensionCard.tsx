import { ReactNode, useState } from 'react';
import { Download, Trash2, Check } from 'lucide-react';
import InstallProgress from './InstallProgress';
import ProTag from './ProTag';

interface ExtensionCardProps {
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    usedTimes: number;
    isPro?: boolean;
    onClick: () => void;
    isInstalled?: boolean;
    onInstall?: (id: string) => void;
    onUninstall?: (id: string) => void;
}

export default function ExtensionCard({
    id,
    title,
    description,
    icon,
    usedTimes,
    isPro = false,
    onClick,
    isInstalled = false,
    onInstall,
    onUninstall,
}: ExtensionCardProps) {
    const [isInstalling, setIsInstalling] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const handleInstall = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsInstalling(true);
        onInstall?.(id);
    };

    const handleUninstall = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUninstall?.(id);
    };

    const handleInstallComplete = () => {
        setIsInstalling(false);
    };

    return (
        <>
            <div
                onClick={onClick}
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer relative group"
                data-oid="peqy5r2"
            >
                <div className="flex items-start space-x-4" data-oid="a80jk7x">
                    <div
                        className="w-12 h-12 rounded bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0"
                        data-oid="6j8bdy4"
                    >
                        {icon}
                    </div>
                    <div className="flex-1 min-w-0" data-oid="r0vlr6t">
                        <div className="flex items-center justify-between" data-oid="__ukh0i">
                            <h3
                                className="text-lg font-medium text-gray-900 dark:text-white truncate"
                                data-oid="u:4k:h:"
                            >
                                {title}
                            </h3>
                            {isPro && <ProTag variant="right" data-oid="eyca1vb" />}
                        </div>
                        <p
                            className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
                            data-oid="jgp4gc5"
                        >
                            {description}
                        </p>
                        <p className="mt-2 text-xs text-gray-400" data-oid="z3fsn0b">
                            使用 {usedTimes} 次
                        </p>
                    </div>
                </div>

                <div
                    className={`absolute bottom-4 right-4 transition-opacity duration-200 ${showButton ? 'opacity-100' : 'opacity-0'}`}
                    data-oid="6._nys-"
                >
                    {isInstalled ? (
                        <button
                            onClick={handleUninstall}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-md transition-colors flex items-center space-x-2 whitespace-nowrap"
                            data-oid="ztb8o_j"
                        >
                            <Trash2 className="w-4 h-4" data-oid="fsbhd4g" />
                            <span data-oid="633muwx">卸载</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleInstall}
                            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors flex items-center space-x-2 whitespace-nowrap ${
                                isPro
                                    ? 'bg-gradient-to-r from-[#2C1810] to-[#463229] hover:opacity-90'
                                    : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                            data-oid="r:.pz1j"
                        >
                            <Download className="w-4 h-4" data-oid="md2nag-" />
                            <span data-oid=":3np2c3">{isPro ? '升级到 Pro' : '安装'}</span>
                        </button>
                    )}
                </div>
            </div>
            <InstallProgress
                isInstalling={isInstalling}
                onComplete={handleInstallComplete}
                data-oid="zc5dt_x"
            />
        </>
    );
}
