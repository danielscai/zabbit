import { CheckCircleIcon, XCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export interface Step {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'running' | 'completed' | 'error';
    error?: string;
    logs?: string[];
}

interface InstallProgressProps {
    steps: Step[];
    currentStepIndex: number;
    onClose?: () => void;
    isCompleted: boolean;
}

const InstallProgress = ({ steps, currentStepIndex, onClose, isCompleted }: InstallProgressProps) => {
    const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

    // 当前步骤变化时，自动展开当前步骤，收起其他步骤
    useEffect(() => {
        const newExpandedSteps: Record<string, boolean> = {};
        
        steps.forEach((step, index) => {
            // 当前步骤展开，其他步骤收起
            newExpandedSteps[step.id] = index === currentStepIndex;
            
            // 错误步骤也展开
            if (step.status === 'error') {
                newExpandedSteps[step.id] = true;
            }
        });
        
        setExpandedSteps(newExpandedSteps);
    }, [currentStepIndex, steps]);

    const toggleExpand = (stepId: string) => {
        setExpandedSteps(prev => ({
            ...prev,
            [stepId]: !prev[stepId]
        }));
    };

    const getStepIcon = (status: Step['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
            case 'error':
                return <XCircleIcon className="w-5 h-5 text-red-500" />;
            case 'running':
                return (
                    <div className="w-5 h-5">
                        <div className="w-full h-full border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                );
            default:
                return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
        }
    };

    const getStepColor = (status: Step['status']) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 dark:text-green-400';
            case 'error':
                return 'text-red-600 dark:text-red-400';
            case 'running':
                return 'text-purple-600 dark:text-purple-400';
            default:
                return 'text-gray-400 dark:text-gray-500';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[600px] max-w-[90vw] max-h-[80vh] flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center">
                        {isCompleted ? '安装完成' : '安装进度'}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                            {currentStepIndex + 1}/{steps.length}
                        </span>
                    </h3>
                    {onClose && (
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <XCircleIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div 
                                key={step.id}
                                className={`rounded-lg border ${
                                    index === currentStepIndex
                                        ? 'border-purple-200 dark:border-purple-900'
                                        : 'border-gray-200 dark:border-gray-700'
                                }`}
                            >
                                <div 
                                    className={`p-4 flex items-center justify-between cursor-pointer ${
                                        index === currentStepIndex
                                            ? 'bg-purple-50 dark:bg-purple-900/20'
                                            : ''
                                    }`}
                                    onClick={() => toggleExpand(step.id)}
                                >
                                    <div className="flex items-center space-x-3">
                                        {getStepIcon(step.status)}
                                        <span className={`font-medium ${getStepColor(step.status)}`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {expandedSteps[step.id] ? (
                                            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                
                                {expandedSteps[step.id] && (
                                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            {step.description}
                                        </p>
                                        
                                        {step.error && (
                                            <div className="mt-2 text-sm text-red-600 dark:text-red-400 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                                错误: {step.error}
                                            </div>
                                        )}
                                        
                                        {step.logs && step.logs.length > 0 && (
                                            <div className="mt-3">
                                                <div className="text-xs font-medium text-gray-500 mb-1">日志:</div>
                                                <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded max-h-[200px] overflow-y-auto">
                                                    {step.logs.map((log, i) => (
                                                        <div key={i} className="mb-1">{log}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    {isCompleted ? (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            完成
                        </button>
                    ) : (
                        <div className="text-sm text-gray-500">
                            {currentStepIndex >= 0 && currentStepIndex < steps.length ? 
                                `正在执行: ${steps[currentStepIndex].title}` : 
                                '准备开始安装...'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstallProgress;
