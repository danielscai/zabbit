'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Image from 'next/image';

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
    const [isLoading, setIsLoading] = useState(false);
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
    const handleSubmit = async () => {
        if (!query.trim() || isLoading) return;

        // 添加用户消息
        const userMessage: Message = {
            role: 'user',
            content: query,
        };

        setMessages([...messages, userMessage]);
        setQuery('');
        setShowExamples(false);
        setIsLoading(true);

        // 模拟AI开始回复
        setIsTyping(true);
        setDisplayedText('');
        setCurrentCharIndex(0);

        try {
            // 调用AI API
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            // 添加AI消息
            const aiMessage: Message = {
                role: 'assistant',
                content: data.text,
                images: data.images,
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            
            // 添加错误消息
            const errorMessage: Message = {
                role: 'assistant',
                content: '抱歉，我在处理您的请求时遇到了问题。请稍后再试。',
            };
            
            setMessages((prev) => [...prev, errorMessage]);
            setIsTyping(false);
        } finally {
            setIsLoading(false);
        }
    };

    // 处理按键事件
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // 处理示例点击
    const handleExampleClick = (description: string) => {
        setQuery(description);
        setShowExamples(false);
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
                                                        {message.images && message.images.length > 0 && (
                                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-oid="image-grid">
                                                                {message.images.map((image, imgIndex) => (
                                                                    <div key={imgIndex} className="relative" data-oid={`image-${imgIndex}`}>
                                                                        <Image
                                                                            src={image.url}
                                                                            alt={image.alt}
                                                                            width={300}
                                                                            height={200}
                                                                            className="rounded-lg"
                                                                        />
                                                                        <p className="text-xs text-gray-500 mt-1">{image.caption}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full py-12" data-oid="empty-state">
                                    <div className="text-center max-w-md" data-oid="empty-content">
                                        <h2 className="text-2xl font-bold mb-4">Zabbit 超级AI助手</h2>
                                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                                            我可以帮助您分析监控数据、解决告警问题、生成报告，以及更多。
                                            输入您的问题或选择下面的示例开始对话。
                                        </p>

                                        {showExamples && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" data-oid="examples-grid">
                                                {examples.map((example, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                        onClick={() => handleExampleClick(example.description)}
                                                        data-oid={`example-${index}`}
                                                    >
                                                        <h3 className="font-medium mb-1">{example.title}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {example.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 输入区域 */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4" data-oid="input-area">
                        <div className="max-w-4xl mx-auto flex items-end" data-oid="input-container">
                            <div className="relative flex-1 mr-2" data-oid="textarea-container">
                                <textarea
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white resize-none"
                                    placeholder="输入您的问题..."
                                    rows={1}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    style={{ minHeight: '60px', maxHeight: '200px' }}
                                    data-oid="query-input"
                                />
                                <button
                                    className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    onClick={() => {
                                        /* 实现语音输入功能 */
                                    }}
                                    data-oid="mic-button"
                                >
                                    <Mic size={20} />
                                </button>
                            </div>
                            <button
                                className={`p-3 rounded-lg ${
                                    isLoading
                                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                                        : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
                                } text-white`}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                data-oid="send-button"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
