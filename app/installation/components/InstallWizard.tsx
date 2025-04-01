'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import InstallProgress, { Step } from './InstallProgress';

interface InstallWizardProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (data: any) => void;
}

interface Extension {
    id: string;
    name: string;
    description: string;
    recommended: boolean;
    icon: string;
}

const deploymentModes = [
    {
        id: 'single',
        title: '单机部署',
        description: '适用于小型团队或测试环境',
        icon: '单机',
        imageUrl: '/images/single-node.svg',
    },
    {
        id: 'cluster',
        title: '集群部署',
        description: '适用于中大型团队，提供高可用性',
        icon: '集群',
        imageUrl: '/images/cluster-mode.svg',
    },
    {
        id: 'distributed',
        title: '分布式部署',
        description: '适用于超大规模部署，支持跨地域分布',
        icon: '分布式',
        imageUrl: '/images/distributed-mode.svg',
    },
];

const extensions: Extension[] = [
    {
        id: 'monitoring',
        name: '基础监控',
        description: '系统资源、网络和基础设施监控',
        recommended: true,
        icon: '📊',
    },
    {
        id: 'logging',
        name: '日志管理',
        description: '集中式日志收集和分析',
        recommended: true,
        icon: '📝',
    },
    {
        id: 'alerting',
        name: '告警通知',
        description: '多渠道告警通知（邮件、短信、钉钉等）',
        recommended: true,
        icon: '🔔',
    },
    {
        id: 'dashboard',
        name: '可视化面板',
        description: '自定义仪表盘和数据可视化',
        recommended: false,
        icon: '📈',
    },
    {
        id: 'api',
        name: 'API 集成',
        description: 'RESTful API 和第三方系统集成',
        recommended: false,
        icon: '🔌',
    },
];

export default function InstallWizard({ isOpen, onClose, onComplete }: InstallWizardProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedMode, setSelectedMode] = useState('single'); // 默认选择单机部署
    const [formData, setFormData] = useState({
        organization: '',
        region: '',
        port: '10051',
        username: 'Admin',
        password: 'zabbix',
    });
    const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);
    const [optionsHeight, setOptionsHeight] = useState(0);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [contentHeight, setContentHeight] = useState(400);

    // 监听选项容器高度变化
    useEffect(() => {
        const updateHeight = () => {
            const optionsContainer = document.getElementById('deployment-options');
            if (optionsContainer) {
                setOptionsHeight(optionsContainer.offsetHeight);
            }
        };

        // 初始加载和窗口大小变化时更新高度
        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    // 在步骤更改时计算并设置最大内容高度
    useEffect(() => {
        // 给内容区域一个小延迟，等待DOM渲染完成
        const timer = setTimeout(() => {
            const contentContainer = document.getElementById('step-content-container');
            if (contentContainer) {
                // 设置最大高度为当前高度或已有的最大高度
                setContentHeight(Math.max(contentContainer.scrollHeight, contentHeight));
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [currentStep]);

    // 设置初始固定高度，避免高度过大
    useEffect(() => {
        setContentHeight(350);
    }, []);

    const steps = [
        { title: '选择部署模式', description: '选择适合您的部署方式' },
        { title: '基本配置', description: '配置基本信息' },
        { title: '选择扩展', description: '选择需要的功能扩展' },
        { title: '确认配置', description: '确认所有配置信息' },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // 在最后一步点击"开始部署"按钮时
            onComplete({
                mode: selectedMode,
                ...formData,
                extensions: selectedExtensions,
            });
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const toggleAdvanced = () => {
        setShowAdvanced(!showAdvanced);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div id="deployment-options">
                                <RadioGroup
                                    value={selectedMode}
                                    onValueChange={setSelectedMode}
                                    className="space-y-4"
                                >
                                    {deploymentModes.map((mode) => (
                                        <label
                                            key={mode.id}
                                            className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none transition-all duration-200 ${
                                                selectedMode === mode.id
                                                    ? 'border-purple-300 ring-1 ring-purple-300 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-200'
                                            }`}
                                        >
                                            <RadioGroupItem
                                                value={mode.id}
                                                className="sr-only"
                                                aria-labelledby={`mode-${mode.id}-label`}
                                            />
                                            <div className="flex flex-1">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="px-2 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded">
                                                            {mode.icon}
                                                        </span>
                                                        <span
                                                            id={`mode-${mode.id}-label`}
                                                            className="text-base font-medium text-gray-900"
                                                        >
                                                            {mode.title}
                                                        </span>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        {mode.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </RadioGroup>
                            </div>
                            
                            <div 
                                className="flex justify-center items-center" 
                                style={{ height: optionsHeight > 0 ? `${optionsHeight}px` : 'auto' }}
                            >
                                <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm w-full h-full max-w-[350px]">
                                    <div className="text-center text-sm font-medium text-gray-700 mb-2">
                                        {selectedMode === 'single' 
                                            ? '单机部署架构图' 
                                            : selectedMode === 'cluster' 
                                                ? '集群部署架构图' 
                                                : '分布式部署架构图'}
                                    </div>
                                    <div className="relative w-full" style={{ height: 'calc(100% - 30px)' }}>
                                        <Image
                                            src={deploymentModes.find(mode => mode.id === selectedMode)?.imageUrl || ''}
                                            alt={`${selectedMode} 架构图`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="organization"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    组织名称
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    value={formData.organization}
                                    maxLength={30}
                                    onChange={(e) =>
                                        setFormData({ ...formData, organization: e.target.value })
                                    }
                                    className="block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="请输入组织名称"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="region"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    部署地区
                                </label>
                                <input
                                    type="text"
                                    id="region"
                                    value={formData.region}
                                    maxLength={20}
                                    onChange={(e) =>
                                        setFormData({ ...formData, region: e.target.value })
                                    }
                                    className="block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="请输入部署地区"
                                />
                            </div>
                            
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    管理员用户名
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    maxLength={20}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    className="block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="请输入用户名"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    管理员密码
                                </label>
                                <input
                                    type="text"
                                    id="password"
                                    value={formData.password}
                                    maxLength={30}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="请输入密码"
                                />
                            </div>
                            
                            <div className="mt-2 md:col-span-2">
                                <button
                                    type="button"
                                    onClick={toggleAdvanced}
                                    className="flex items-center text-sm text-purple-600 hover:text-purple-800 focus:outline-none transition-colors duration-200"
                                >
                                    <svg 
                                        className={`w-4 h-4 mr-1 transform transition-transform duration-200 ${showAdvanced ? 'rotate-90' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                    高级选项
                                </button>
                                
                                <AnimatePresence>
                                    {showAdvanced && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 pb-2 space-y-4">
                                                <div className="md:w-1/2">
                                                    <label
                                                        htmlFor="port"
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                    >
                                                        端口号
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="port"
                                                        value={formData.port}
                                                        maxLength={5}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, port: e.target.value })
                                                        }
                                                        className="block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        placeholder="请输入端口号"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {extensions.map((extension) => (
                                <label
                                    key={extension.id}
                                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all duration-200 ${
                                        selectedExtensions.includes(extension.id)
                                            ? 'border-purple-300 ring-1 ring-purple-300 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-200'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={selectedExtensions.includes(extension.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedExtensions([
                                                    ...selectedExtensions,
                                                    extension.id,
                                                ]);
                                            } else {
                                                setSelectedExtensions(
                                                    selectedExtensions.filter(
                                                        (id) => id !== extension.id
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                    <div className="flex flex-1">
                                        <div className="flex items-start space-x-3">
                                            <div className="text-2xl flex-shrink-0">
                                                {extension.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {extension.name}
                                                    </span>
                                                    {extension.recommended && (
                                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            推荐
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {extension.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                    <h3 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                                        <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 inline-flex items-center justify-center mr-2">1</span>
                                        部署信息
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex">
                                            <span className="text-sm font-medium text-gray-500 w-24">部署模式:</span>
                                            <span className="text-sm text-gray-900">
                                                {deploymentModes.find(mode => mode.id === selectedMode)?.title || '-'}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-sm font-medium text-gray-500 w-24">组织名称:</span>
                                            <span className="text-sm text-gray-900">
                                                {formData.organization || '-'}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-sm font-medium text-gray-500 w-24">部署地区:</span>
                                            <span className="text-sm text-gray-900">
                                                {formData.region || '-'}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-sm font-medium text-gray-500 w-24">端口号:</span>
                                            <span className="text-sm text-gray-900">
                                                {formData.port}
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-sm font-medium text-gray-500 w-24">用户名:</span>
                                            <span className="text-sm text-gray-900">
                                                {formData.username}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                    <h3 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                                        <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 inline-flex items-center justify-center mr-2">2</span>
                                        已选扩展
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedExtensions.length > 0 ? (
                                            selectedExtensions.map((id) => {
                                                const ext = extensions.find(e => e.id === id);
                                                return (
                                                    <div 
                                                        key={id} 
                                                        className="flex items-center rounded-full bg-purple-50 px-3 py-1.5"
                                                    >
                                                        <span className="text-lg mr-1.5">{ext?.icon}</span>
                                                        <span className="text-sm font-medium text-purple-700">
                                                            {ext?.name}
                                                        </span>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-sm text-gray-500">未选择任何扩展</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] p-0 gap-0 overflow-hidden" style={{ maxHeight: '90vh' }}>
                {/* 标题区域 */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <DialogHeader className="p-0">
                        <DialogTitle className="text-xl font-semibold text-gray-900">安装向导</DialogTitle>
                        <p className="text-sm text-gray-500 mt-1">按照步骤完成 Zabbix 的安装配置</p>
                    </DialogHeader>
                </div>

                {/* 步骤导航区域 */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center relative">
                        {steps.map((step, index) => (
                            <div 
                                key={step.title} 
                                className="flex flex-col items-center relative z-10"
                                style={{ width: `${100 / steps.length}%` }}
                            >
                                <div className="flex items-center">
                                    <div 
                                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium ${
                                            index < currentStep 
                                                ? 'bg-purple-200 text-purple-600' 
                                                : index === currentStep
                                                ? 'bg-purple-600 text-white font-bold shadow-md'
                                                : 'border-2 border-gray-300 text-gray-500'
                                        }`}
                                    >
                                        {index < currentStep ? (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            index + 1
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs font-medium mt-2 text-center">
                                    {step.title}
                                </div>
                            </div>
                        ))}
                        
                        {/* 步骤之间的分段连接线 */}
                        <div className="absolute top-5 left-0 w-full">
                            {steps.map((_, index) => {
                                if (index < steps.length - 1) {
                                    const segmentWidth = 100 / steps.length;
                                    const startPos = (index + 0.5) * segmentWidth;
                                    const endPos = (index + 1.5) * segmentWidth;
                                    
                                    return (
                                        <div 
                                            key={`connector-${index}`}
                                            style={{
                                                position: 'absolute',
                                                left: `calc(${startPos}% + 15px)`, 
                                                width: `calc(${endPos - startPos - 30}%)`,
                                                top: '4px',
                                                height: '2px',
                                            }}
                                            className={index < currentStep ? 'bg-purple-400' : 'bg-gray-300'}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>

                {/* 内容区域 */}
                <div className="p-6 bg-white overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                    <div 
                        id="step-content-container"
                        style={{ minHeight: `${contentHeight}px` }}
                        className="relative"
                    >
                        {renderStepContent()}
                    </div>
                </div>

                {/* 底部按钮区域 */}
                <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                            currentStep === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                    >
                        上一步
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                            (currentStep === 0 && !selectedMode) ||
                            (currentStep === 1 && (!formData.organization || !formData.region))
                        }
                        className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                            (currentStep === 0 && !selectedMode) ||
                            (currentStep === 1 && (!formData.organization || !formData.region))
                                ? 'bg-purple-300 cursor-not-allowed'
                                : 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                        }`}
                    >
                        {currentStep === steps.length - 1 ? '开始部署' : '下一步'}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 