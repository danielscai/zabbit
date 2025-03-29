'use client';

import { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

export default function AIPage() {
    const [query, setQuery] = useState('');

    const examples = [
        {
            title: 'CPU告警分析',
            description: '分析今天上午CPU告警过高的原因并提供解决方案',
        },
        {
            title: '故障报告生成',
            description: '帮我总结昨晚故障的原因，收集相关材料并生成报告',
        },
        {
            title: '服务安装配置',
            description: '帮我安装配置一个集群版的Zabbix监控系统',
        },
        {
            title: '系统巡检分析',
            description: '执行平台巡检，找出使用率过低的服务器并提供优化建议',
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="49v4361">
            <Sidebar data-oid="6bdt26a" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="52wk1gj">
                <Header title="智能运维 AI" data-oid="cyc:8tk" />

                <main className="flex-1 overflow-y-auto p-6" data-oid="ahmq_bm">
                    <div className="max-w-4xl mx-auto" data-oid="qph:7-n">
                        <div className="mb-8" data-oid="66rmiow">
                            <div
                                className="mb-10 text-gray-700 dark:text-gray-300 text-center"
                                data-oid="intro-text"
                            >
                                <h2 className="text-3xl font-bold mb-4" data-oid="6e1_-hw">
                                    你好，我是超级AI。准备好了吗？我们可以随时开始。
                                </h2>
                            </div>
                            <div className="relative" data-oid="w-52jxu">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="输入任何问题，我来帮你解答..."
                                    className="w-full p-4 pr-20 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    data-oid="o_cvf_k"
                                />

                                <div
                                    className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2"
                                    data-oid="c6o97eg"
                                >
                                    <button
                                        className="p-2 text-gray-400 hover:text-purple-500"
                                        data-oid="dxw.aan"
                                    >
                                        <Mic size={20} data-oid="v3.91a8" />
                                    </button>
                                    <button
                                        className="p-2 text-gray-400 hover:text-purple-500"
                                        data-oid="8xe2:41"
                                    >
                                        <Send size={20} data-oid=".hj0t:0" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6" data-oid="xv1yilx">
                            <h2
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                                data-oid="4t7kr-e"
                            >
                                你可以这样问我
                            </h2>
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                data-oid="a9ivcr9"
                            >
                                {examples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-500 dark:hover:border-purple-500 cursor-pointer transition-colors"
                                        onClick={() => setQuery(example.description)}
                                        data-oid="6gx6gx9"
                                    >
                                        <h3
                                            className="font-medium text-gray-900 dark:text-white mb-2"
                                            data-oid="ywhmo3m"
                                        >
                                            {example.title}
                                        </h3>
                                        <p
                                            className="text-gray-600 dark:text-gray-300 text-sm"
                                            data-oid="8d.q4pt"
                                        >
                                            {example.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
