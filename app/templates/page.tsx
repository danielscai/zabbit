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
            id: 'rocketmq5',
            title: '阿里云 RocketMQ5',
            description: 'Apache RocketMQ 消息队列服务监控',
            icon: '/images/aliyun-rocketmq.png',
            usedTimes: 12345,
            indicators: [
                { name: 'QueueId', description: '队列ID' },
                { name: 'Topic', description: '主题名称' },
            ],
        },
        {
            id: 'aliyun-sae',
            title: '阿里云 SAE',
            description: '阿里云 Serverless 应用引擎监控',
            icon: '/images/aliyun-sae.png',
            usedTimes: 8562,
            indicators: [
                { name: 'AppId', description: '应用ID' },
                { name: 'Region', description: '地域' },
            ],
        },
        {
            id: 'aliyun-slb',
            title: '阿里云 SLB',
            description: '负载均衡服务监控',
            icon: '/images/aliyun-slb.png',
            usedTimes: 15678,
            indicators: [
                { name: 'LoadBalancerId', description: '负载均衡实例ID' },
                { name: 'Port', description: '端口' },
            ],
        },
        {
            id: 'elasticsearch',
            title: 'ElasticSearch',
            description: '分布式搜索和分析引擎监控',
            icon: '/images/elasticsearch.png',
            usedTimes: 23456,
            indicators: [
                { name: 'ClusterName', description: '集群名称' },
                { name: 'NodeName', description: '节点名称' },
            ],
        },
        {
            id: 'emqx',
            title: 'EMQX',
            description: '开源 MQTT 消息服务器监控',
            icon: '/images/emqx.png',
            usedTimes: 7890,
            indicators: [
                { name: 'NodeName', description: '节点名称' },
                { name: 'Topic', description: '主题' },
            ],
        },
        {
            id: 'etcd',
            title: 'etcd',
            description: '分布式键值存储系统监控',
            icon: '/images/etcd.png',
            usedTimes: 9876,
            indicators: [
                { name: 'Endpoint', description: '终端节点' },
                { name: 'ClusterId', description: '集群ID' },
            ],
        },
        {
            id: 'Dameng',
            title: '达梦数据库',
            description: '达梦数据库（DM8）',
            icon: '/images/Dameng.png',
            usedTimes: 34567,
            indicators: [
                { name: 'DashboardId', description: '仪表盘ID' },
                { name: 'PanelId', description: '面板ID' },
            ],
        },
        {
            id: 'hadoop',
            title: 'Hadoop HDFS',
            description: '分布式文件系统监控',
            icon: '/images/hadoop.png',
            usedTimes: 6789,
            indicators: [
                { name: 'NameNode', description: '名称节点' },
                { name: 'DataNode', description: '数据节点' },
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
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="-c9k8jz">
            <Sidebar data-oid="o8ko_km" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="j08idra">
                <Header
                    title="模板管理"
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    data-oid="vy-v3.j"
                />

                <main className="flex-1 overflow-y-auto p-6" data-oid="3-9e.6d">
                    <div className="max-w-7xl mx-auto" data-oid="lfxfwx7">
                        {/* <div
              className="border-b border-gray-200 dark:border-gray-700"
              data-oid="ohtlvzk"
              ></div> */}

                        <div
                            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            data-oid=":g9i..."
                        >
                            {MOCK_TEMPLATES[activeTab].map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    {...template}
                                    onClick={() => setSelectedTemplate(template)}
                                    data-oid="bn1ixi7"
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
                data-oid="a5m5ez9"
            />
        </div>
    );
}
