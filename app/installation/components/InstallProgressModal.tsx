'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  XMarkIcon 
} from '@heroicons/react/24/solid';

export type StepStatus = 'pending' | 'running' | 'completed' | 'error';

export interface InstallStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  logs: string[];
  error?: string;
}

interface InstallProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: InstallStep[];
  currentStepIndex: number;
  isCompleted: boolean;
}

const InstallProgressModal = ({
  isOpen,
  onClose,
  steps,
  currentStepIndex,
  isCompleted
}: InstallProgressModalProps) => {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  // 当前步骤变化时，自动展开当前步骤，收起其他步骤
  useEffect(() => {
    if (!isOpen) return;
    
    const newExpandedSteps: Record<string, boolean> = {};
    
    steps.forEach((step, index) => {
      // 当前步骤自动展开
      newExpandedSteps[step.id] = index === currentStepIndex;
      
      // 错误步骤也保持展开
      if (step.status === 'error') {
        newExpandedSteps[step.id] = true;
      }
    });
    
    setExpandedSteps(newExpandedSteps);
  }, [currentStepIndex, steps, isOpen]);

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[600px] max-w-full max-h-[80vh] flex flex-col">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">
            {isCompleted ? '安装完成' : '安装进度'} 
            <span className="ml-2 text-sm font-normal text-gray-500">
              {currentStepIndex + 1}/{steps.length}
            </span>
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 步骤列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`border rounded-lg ${
                  step.status === 'running' 
                    ? 'border-purple-300 dark:border-purple-700' 
                    : step.status === 'completed'
                    ? 'border-green-300 dark:border-green-700'
                    : step.status === 'error'
                    ? 'border-red-300 dark:border-red-700'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* 步骤标题 */}
                <div 
                  className={`flex items-center justify-between p-3 cursor-pointer ${
                    step.status === 'running' 
                      ? 'bg-purple-50 dark:bg-purple-900/20' 
                      : step.status === 'completed'
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : step.status === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20'
                      : ''
                  }`}
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-center gap-3">
                    {/* 状态图标 */}
                    {step.status === 'completed' ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : step.status === 'error' ? (
                      <XCircleIcon className="w-5 h-5 text-red-500" />
                    ) : step.status === 'running' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    
                    {/* 步骤标题 */}
                    <span className={`font-medium ${
                      step.status === 'completed' 
                        ? 'text-green-700 dark:text-green-400' 
                        : step.status === 'error'
                        ? 'text-red-700 dark:text-red-400'
                        : step.status === 'running'
                        ? 'text-purple-700 dark:text-purple-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {/* 展开/收起图标 */}
                  {expandedSteps[step.id] ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                {/* 步骤详情 */}
                {expandedSteps[step.id] && (
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    {/* 步骤描述 */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {step.description}
                    </p>
                    
                    {/* 错误信息 */}
                    {step.error && (
                      <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-700 dark:text-red-400">
                        <strong>错误:</strong> {step.error}
                      </div>
                    )}
                    
                    {/* 日志信息 */}
                    {step.logs && step.logs.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs font-medium text-gray-500 mb-1">日志:</div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded max-h-[200px] overflow-y-auto">
                          {step.logs.map((log, i) => (
                            <div key={i} className="text-xs font-mono mb-1 text-gray-700 dark:text-gray-300">
                              {log}
                            </div>
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
        
        {/* 底部按钮 */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
          {isCompleted ? (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              完成
            </button>
          ) : (
            <div className="text-sm text-gray-500">
              {currentStepIndex >= 0 && currentStepIndex < steps.length 
                ? `正在执行: ${steps[currentStepIndex].title}` 
                : '准备开始安装...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallProgressModal;
