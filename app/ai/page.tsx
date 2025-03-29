'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Image from 'next/image';
import { h2 } from 'framer-motion/client';

// 模拟的AI回答内容
const mockResponse = {
    text: `根据我对昨晚报警数据的分析，系统在23:15至02:30期间共触发了27次报警，主要集中在以下几个方面：

1. **CPU使用率过高** (8次报警)
   - 主要发生在应用服务器cluster-app-03和cluster-app-05
   - 峰值达到92.7%，远超75%的警戒阈值
   - 通过分析进程，发现是每日数据同步任务导致

2. **内存占用异常** (6次报警)
   - 数据库服务器db-master-01内存使用率突增至95%
   - 查询日志显示有大量未优化的SQL查询

3. **网络连接超时** (13次报警)
   - 主要集中在负载均衡器lb-cluster-01
   - 连接超时主要来自外部API调用

下面是CPU和内存使用率的趋势图，可以看到明显的异常峰值：`,
    images: [
        {
            url: '/images/cpu-usage-graph.png',
            alt: 'CPU使用率趋势图',
            caption: '昨晚23:00-03:00 CPU使用率趋势',
        },
        {
            url: '/images/memory-usage-graph.png',
            alt: '内存使用率趋势图',
            caption: '昨晚23:00-03:00 内存使用率趋势',
        },
        {
            url: '/images/network-connections.png',
            alt: '网络连接状态图',
            caption: '昨晚23:00-03:00 网络连接状态',
        },
    ],
};

// 消息类型定义
type Message = {
    role: 'user' | 'assistant';
    content: string;
    images?: {
        url: string;
        alt: string;
        caption: string;
    }[];
};

export default function AIPage() {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [showExamples, setShowExamples] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // 处理消息提交
    const handleSubmit = () => {
        if (!query.trim()) return;

        // 添加用户消息
        const userMessage: Message = {
            role: 'user',
            content: query,
        };

        setMessages([...messages, userMessage]);
        setQuery('');
        setShowExamples(false);

        // 模拟AI开始回复
        setIsTyping(true);
        setDisplayedText('');
        setCurrentCharIndex(0);

        // 延迟一下再添加AI消息，模拟网络延迟
        setTimeout(() => {
            const aiMessage: Message = {
                role: 'assistant',
                content: mockResponse.text,
                images: mockResponse.images,
            };

            setMessages((prev) => [...prev, aiMessage]);
        }, 500);
    };

    // 处理按键事件
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // 模拟打字效果
    useEffect(() => {
        if (isTyping && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];

            if (lastMessage.role === 'assistant') {
                if (currentCharIndex < lastMessage.content.length) {
                    const timer = setTimeout(() => {
                        setDisplayedText(lastMessage.content.substring(0, currentCharIndex + 1));
                        setCurrentCharIndex((prev) => prev + 1);
                    }, 15); // 调整速度

                    return () => clearTimeout(timer);
                } else {
                    setIsTyping(false);
                }
            }
        }
    }, [isTyping, currentCharIndex, messages]);

    // 自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, displayedText]);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900" data-oid="49v4361">
            <Sidebar data-oid="6bdt26a" />

            <div className="flex-1 flex flex-col overflow-hidden" data-oid="52wk1gj">
                <Header title="超级AI" data-oid="cyc:8tk" />

                <main className="flex-1 flex flex-col overflow-hidden" data-oid="ahmq_bm">
                    <div className="flex-1 overflow-y-auto p-6" data-oid="chat-scroll-area">
                        <div className="max-w-4xl mx-auto" data-oid="qph:7-n">
                            {/* 聊天消息区域 */}
                            {messages.length > 0 ? (
                                <div className="mb-6 space-y-6" data-oid="chat-messages">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            data-oid={`message-${index}`}
                                        >
                                            <div
                                                className={`max-w-3xl rounded-lg p-4 ${
                                                    message.role === 'user'
                                                        ? 'bg-purple-100 dark:bg-purple-900 text-gray-900 dark:text-white'
                                                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                                                }`}
                                                data-oid="ye7.0rv"
                                            >
                                                {index === messages.length - 1 &&
                                                message.role === 'assistant' &&
                                                isTyping ? (
                                                    <div data-oid="yp0fbyt">
                                                        <div
                                                            className="prose dark:prose-invert"
                                                            dangerouslySetInnerHTML={{
                                                                __html: displayedText.replace(
                                                                    /\n/g,
                                                                    '<br/>',
                                                                ),
                                                            }}
                                                            data-oid=":p9j43w"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div data-oid="cuw0x5a">
                                                        <div
                                                            className="prose dark:prose-invert"
                                                            dangerouslySetInnerHTML={{
                                                                __html: message.content.replace(
                                                                    /\n/g,
                                                                    '<br/>',
                                                                ),
                                                            }}
                                                            data-oid="nz--zw2"
                                                        />

                                                        {/* 图片区域 */}
                                                        {message.images &&
                                                            message.images.length > 0 && (
                                                                <div
                                                                    className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                                                                    data-oid="014r9sn"
                                                                >
                                                                    {message.images.map(
                                                                        (image, imgIndex) => (
                                                                            <div
                                                                                key={imgIndex}
                                                                                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                                                                                data-oid="2xhtelh"
                                                                            >
                                                                                <div
                                                                                    className="relative h-48 w-full"
                                                                                    data-oid="ew75ecr"
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            image.url
                                                                                        }
                                                                                        alt={
                                                                                            image.alt
                                                                                        }
                                                                                        className="w-full h-full object-cover"
                                                                                        data-oid="o-i60ef"
                                                                                    />
                                                                                </div>
                                                                                <div
                                                                                    className="p-2 text-sm text-gray-600 dark:text-gray-400 text-center"
                                                                                    data-oid="80linqk"
                                                                                >
                                                                                    {image.caption}
                                                                                </div>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} data-oid="6:zl1qd" />
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center py-6 text-gray-700 dark:text-gray-300 text-center"
                                    data-oid="intro-text"
                                >
                                    <h2 className="text-2xl font-bold mb-6" data-oid="6e1_-hw">
                                        你好，我是超级AI。准备好了吗？我们可以随时开始。
                                    </h2>

                                    {showExamples && (
                                        <div
                                            className="space-y-6 w-full max-w-3xl"
                                            data-oid="xv1yilx"
                                        >
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
                                                        onClick={() => {
                                                            setQuery(example.description);
                                                            setTimeout(() => handleSubmit(), 100);
                                                        }}
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
                                    )}

                                    {/* 输入区域 - 在无消息时显示在中央 */}
                                    <div className="w-full max-w-3xl mt-8" data-oid="wdlgmhe">
                                        <div className="relative" data-oid="61xytz2">
                                            <input
                                                type="text"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="输入任何问题，我来帮你解答..."
                                                className="w-full p-4 pr-20 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                data-oid="o_cvf_k"
                                            />

                                            <div
                                                className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2"
                                                data-oid="jv5am3u"
                                            >
                                                <button
                                                    className="p-2 text-gray-400 hover:text-purple-500"
                                                    data-oid=":zkifsu"
                                                >
                                                    <Mic size={20} data-oid="4flj.4y" />
                                                </button>
                                                <button
                                                    className="p-2 text-gray-400 hover:text-purple-500"
                                                    onClick={handleSubmit}
                                                    data-oid="761l9x3"
                                                >
                                                    <Send size={20} data-oid="2jbu1e6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 输入区域 - 当有消息时固定在底部 */}
                    {messages.length > 0 && (
                        <div
                            className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            data-oid="66rmiow"
                        >
                            <div className="max-w-4xl mx-auto" data-oid="tjviirm">
                                <div className="relative" data-oid="w-52jxu">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="输入任何问题，我来帮你解答..."
                                        className="w-full p-4 pr-20 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        data-oid="8h-1.5w"
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
                                            onClick={handleSubmit}
                                            data-oid="8xe2:41"
                                        >
                                            <Send size={20} data-oid=".hj0t:0" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
