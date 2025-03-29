import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/app-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Zabbit - Zabbix管理平台',
    description: '现代化的Zabbix管理平台',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="zh-CN" data-oid="cursskj">
            <body className={inter.className} data-oid="b4ss3nk">
                <AppProvider data-oid="cwgc06z">{children}</AppProvider>
            </body>
        </html>
    );
}
