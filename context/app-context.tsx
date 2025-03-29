'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = {
    code: string;
    name: string;
};

type AppContextType = {
    language: Language;
    setLanguage: (language: Language) => void;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>({ code: 'zh-CN', name: '中文' });
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <AppContext.Provider
            value={{
                language,
                setLanguage,
                sidebarCollapsed,
                setSidebarCollapsed,
            }}
            data-oid="lmggkh8"
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
