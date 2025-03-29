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
            data-oid="s.hl.cr"
        >
            <div className="px-[24px] py-4 flex items-center h-16" data-oid="._5go:4">
                <div className="flex-1" data-oid="8xkq_l8">
                    <h1
                        className="text-gray-800 dark:text-white text-[30px] font-semibold"
                        data-oid="x77.j0w"
                    >
                        {title}
                    </h1>
                </div>

                <div className="flex items-center space-x-4" data-oid="a:bw5kh">
                    <button
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        data-oid=".eq1hue"
                    >
                        <Bell size={20} data-oid="jww-1o3" />
                    </button>

                    <button
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        data-oid="8i4k4zi"
                    >
                        <Settings size={20} data-oid="tjs0fya" />
                    </button>

                    <div className="relative" data-oid="20y:-o6">
                        <button
                            className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            data-oid="v9547-h"
                        >
                            <Globe size={20} data-oid="3a_.z3u" />
                            <span className="ml-1" data-oid="-nnvz7p">
                                {language.name}
                            </span>
                        </button>

                        {showLanguageMenu && (
                            <div
                                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10"
                                data-oid="ok.4y38"
                            >
                                <ul className="py-1" data-oid="dlg:2x-">
                                    {languages.map((lang) => (
                                        <li key={lang.code} data-oid="5jty7pm">
                                            <button
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => handleLanguageChange(lang)}
                                                data-oid="k:xd:20"
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
                        data-oid="r1d665q"
                    >
                        <User size={16} data-oid="z62.0jf" />
                    </div>
                </div>
            </div>

            {tabs && tabs.length > 0 && (
                <div className="px-[24px] flex space-x-8" data-oid="kk0cgci">
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
                            data-oid="2jw67p5"
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
}
