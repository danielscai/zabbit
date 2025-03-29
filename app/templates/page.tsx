'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import TemplateCard from '@/components/TemplateCard';
import TemplateDetailModal from '@/components/TemplateDetailModal';

const TABS = [
    { id: 'system', name: '系统模板' },
    { id: 'custom', name: '自有模板' },
];

const MOCK_TEMPLATES = {
    system: [
        {
            id: '1',
            title: '阿里云站点监控',
            description: '监控网站可用性和性能指标',
            icon: '/icons/aliyun-monitor.png',
            usedTimes: 48156,
            indicators: [
                { name: 'Address', description: '站点地址' },
                { name: 'TaskName', description: '探测任务名称' },
                // ... 其他指标
            ],
        },
        // ... 其他系统模板
    ],
    custom: [
        // ... 自定义模板
    ],
};

export default function TemplatesPage() {
    const [activeTab, setActiveTab] = useState('system');
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="ie2o_rf">
            <Sidebar data-oid=".lyxf-z" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="5.qx:m-">
                <Header data-oid="7xvhb77" />

                <main className="flex-1 overflow-y-auto p-6" data-oid="v7v8ib-">
                    <div className="max-w-7xl mx-auto" data-oid="m.t1wnj">
                        <div
                            className="border-b border-gray-200 dark:border-gray-700"
                            data-oid="ohtlvzk"
                        >
                            <nav className="-mb-px flex space-x-8" data-oid="sky.y6d">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                      py-4 px-1 border-b-2 font-medium text-sm
                      ${
                          activeTab === tab.id
                              ? 'border-purple-500 text-purple-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                                        data-oid="7cta6n."
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div
                            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            data-oid="qyfn_ld"
                        >
                            {MOCK_TEMPLATES[activeTab].map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    {...template}
                                    onClick={() => setSelectedTemplate(template)}
                                    data-oid="cq4n7pg"
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <TemplateDetailModal
                isOpen={!!selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
                template={selectedTemplate}
                data-oid="z46rwhm"
            />
        </div>
    );
}
