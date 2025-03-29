'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';

// Icons
import {
    LayoutTemplate,
    Bell,
    Activity,
    Download,
    BarChart2,
    FileText,
    Database,
    ShoppingBag,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

type MenuItem = {
    name: string;
    icon: React.ReactNode;
    href: string;
};

export default function Sidebar() {
    const { sidebarCollapsed, setSidebarCollapsed } = useAppContext();
    const pathname = usePathname();

    // Collapse sidebar when navigating to templates page
    useEffect(() => {
        if (pathname === '/templates') {
            setSidebarCollapsed(true);
        }
    }, [pathname, setSidebarCollapsed]);

    const menuItems: MenuItem[] = [
        {
            name: '模板管理',
            icon: <LayoutTemplate size={20} data-oid=".q953oi" />,
            href: '/templates',
        },
        { name: '告警管理', icon: <Bell size={20} data-oid="68d69:n" />, href: '/alerts' },
        { name: '监控项管理', icon: <Activity size={20} data-oid="bthlfm-" />, href: '/monitors' },
        {
            name: '安装管理',
            icon: <Download size={20} data-oid="rubpf35" />,
            href: '/installation',
        },
        { name: '业务监控', icon: <BarChart2 size={20} data-oid="kgdp1n-" />, href: '/business' },
        { name: '巡检报告', icon: <FileText size={20} data-oid="8ys7f1n" />, href: '/reports' },
        { name: 'CMDB', icon: <Database size={20} data-oid="..fmjeo" />, href: '/cmdb' },
        {
            name: '扩展商店',
            icon: <ShoppingBag size={20} data-oid="xa8.6l_" />,
            href: '/extensions',
        },
    ];

    return (
        <div
            className={cn(
                'h-screen transition-all duration-300 flex flex-col',
                sidebarCollapsed ? 'w-16' : 'w-64',
            )}
            data-oid="l:i:fsb"
        >
            <div
                className="bg-gradient-to-b from-[#B66EE1] to-[#9747FF] h-full flex flex-col text-white"
                data-oid="9v-hifi"
            >
                <div className="p-4 flex items-center justify-between" data-oid="swybrii">
                    {!sidebarCollapsed && (
                        <h1
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 flex items-center"
                            data-oid="oi0_d3v"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2"
                                data-oid="vu_w11-"
                            >
                                <path
                                    d="M12 2L2 7L12 12L22 7L12 2Z"
                                    fill="url(#paint0_linear)"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    data-oid="ub_5n:0"
                                />

                                <path
                                    d="M2 17L12 22L22 17"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    data-oid="s02v7wi"
                                />

                                <path
                                    d="M2 12L12 17L22 12"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    data-oid="5wmixdp"
                                />

                                <defs data-oid="urae8c6">
                                    <linearGradient
                                        id="paint0_linear"
                                        x1="2"
                                        y1="7"
                                        x2="22"
                                        y2="7"
                                        gradientUnits="userSpaceOnUse"
                                        data-oid="y42z7m1"
                                    >
                                        <stop stopColor="#FFFFFF" data-oid="gfgx0ev" />
                                        <stop offset="1" stopColor="#E9D5FF" data-oid="agi_rze" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            Zabbit
                        </h1>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-1 rounded-full hover:bg-purple-700"
                        data-oid="mpgu48_"
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight size={20} data-oid="gu-a:b9" />
                        ) : (
                            <ChevronLeft size={20} data-oid="h81jp2c" />
                        )}
                    </button>
                </div>

                <nav className="flex-1 mt-6" data-oid="ogzj-6.">
                    <ul className="space-y-2 px-2" data-oid="3qy7q1_">
                        {menuItems.map((item) => (
                            <li key={item.name} data-oid="bm3p.5l">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center p-3 rounded-lg hover:bg-purple-700 transition-colors',
                                        pathname === item.href ? 'bg-purple-700' : '',
                                    )}
                                    data-oid="qu13jv-"
                                >
                                    <span className="flex-shrink-0" data-oid="1jj7jfp">
                                        {item.icon}
                                    </span>
                                    {!sidebarCollapsed && (
                                        <span className="ml-3" data-oid="r3ta3fm">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
