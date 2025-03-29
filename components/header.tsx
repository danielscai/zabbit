'use client';

import { useState } from 'react';
import { Globe, User, Settings, Bell } from 'lucide-react';
import { useAppContext } from '@/context/app-context';

type Language = {
    code: string;
    name: string;
};

interface HeaderProps {
    title: string;
    tabs?: {
        id: string;
        name: string;
    }[];
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
}

export default function Header({ title, tabs, activeTab, onTabChange }: HeaderProps) {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const { language, setLanguage } = useAppContext();

    const languages: Language[] = [
        { code: 'zh-CN', name: '中文' },
        { code: 'en-US', name: 'English' },
        { code: 'ja-JP', name: '日本語' },
    ];

    const handleLanguageChange = (language: Language) => {
        setLanguage(language);
        setShowLanguageMenu(false);
        // Here you would implement actual language switching logic
    };

    return (
        <header
            className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
            data-oid="dc1thtu"
        >
            <div className="px-[24px] py-4 flex items-center h-16" data-oid="krq8s.b">
                <div className="flex-1" data-oid="mhr6dv0">
                    <h1
                        className="text-gray-800 dark:text-white text-[30px] font-semibold"
                        data-oid="ud8m.zg"
                    >
                        {title}
                    </h1>
                </div>

                <div className="flex items-center space-x-4" data-oid="yz0kjx3">
                    <button
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        data-oid="273n44y"
                    >
                        <Bell size={20} data-oid="uagact3" />
                    </button>

                    <button
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        data-oid="7ydydlf"
                    >
                        <Settings size={20} data-oid="clklr9o" />
                    </button>

                    <div className="relative" data-oid="k6clx2y">
                        <button
                            className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            data-oid="4u_ygyr"
                        >
                            <Globe size={20} data-oid="9pkbza4" />
                            <span className="ml-1" data-oid="428zglq">
                                {language.name}
                            </span>
                        </button>

                        {showLanguageMenu && (
                            <div
                                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10"
                                data-oid="-gpsaje"
                            >
                                <ul className="py-1" data-oid="756qwdo">
                                    {languages.map((lang) => (
                                        <li key={lang.code} data-oid="h_nw5tk">
                                            <button
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => handleLanguageChange(lang)}
                                                data-oid="m2h7_2k"
                                            >
                                                {lang.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div
                        className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white"
                        data-oid="uq1dfnn"
                    >
                        <User size={16} data-oid="2dekly7" />
                    </div>
                </div>
            </div>

            {tabs && tabs.length > 0 && (
                <div className="px-[24px] flex space-x-8" data-oid="jtceji5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange?.(tab.id)}
                            className={`
                                py-4 px-1 border-b-[3px] font-medium text-sm  
                                ${
                                    activeTab === tab.id
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                            `}
                            data-oid="_1r0.k2"
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
}
