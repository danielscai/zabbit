'use client';

import { useState } from 'react';
import ServerList from './ServerList';
import InstallWizard from './InstallWizard';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

interface DeployResult {
    success: boolean;
    logs: string[];
    error?: string;
    accessUrl?: string;
    username?: string;
    password?: string;
}

// 调用后端API部署服务器
const deployServer = async (serverData: any): Promise<DeployResult> => {
    try {
        console.log('开始部署服务器:', serverData);
        const response = await fetch('/api/installation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                step: 'deploy-services',
                config: serverData
            }),
        });

        console.log('API响应状态:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('部署失败:', errorText);
            throw new Error(`部署失败: ${errorText}`);
        }

        const result = await response.json();
        console.log('部署结果:', result);
        
        // 转换API响应格式为DeployResult格式
        return {
            success: !result.error,
            logs: result.logs || [],
            error: result.error,
            accessUrl: result.accessUrl,
            username: serverData.username,
            password: serverData.password
        };
    } catch (error) {
        console.error('部署服务器出错:', error);
        throw error;
    }
};

const ZabbixInstall = () => {
    const [showInstallWizard, setShowInstallWizard] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false);
    const [deployResult, setDeployResult] = useState<DeployResult | null>(null);

    // 处理安装向导完成
    const handleInstallWizardComplete = async (serverData: any) => {
        console.log('开始处理安装向导完成:', serverData);
        try {
            // 执行安装步骤
            const result = await deployServer(serverData);
            console.log('部署完成，结果:', result);
            
            setDeployResult(result);
            setShowResultDialog(true);
            setShowInstallWizard(false);
        } catch (error: any) {
            console.error('安装过程出错:', error);
            const errorMessage = error.message || '未知错误';
            
            setDeployResult({
                success: false,
                logs: [],
                error: errorMessage
            });
            setShowResultDialog(true);
            setShowInstallWizard(false);
        }
    };

    return (
        <>
            <ServerList onNewServer={() => setShowInstallWizard(true)} />
            
            <InstallWizard
                isOpen={showInstallWizard}
                onClose={() => setShowInstallWizard(false)}
                onComplete={handleInstallWizardComplete}
            />

            {/* 部署结果弹窗 */}
            <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            {/* 背景装饰 */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className={`absolute inset-0 ${deployResult?.success ? 'bg-green-50' : 'bg-red-50'} opacity-20`} />
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full ${
                                        deployResult?.success ? 'bg-green-200' : 'bg-red-200'
                                    }`}
                                />
                            </div>

                            {/* 内容区域 */}
                            <div className="relative p-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    {/* 状态图标 */}
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                        deployResult?.success ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ 
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: 0.2 
                                            }}
                                        >
                                            {deployResult?.success ? (
                                                <CheckCircleIcon className="w-10 h-10 text-green-600" />
                                            ) : (
                                                <XCircleIcon className="w-10 h-10 text-red-600" />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* 标题和描述 */}
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                        className={`text-xl font-semibold mb-2 ${
                                            deployResult?.success ? 'text-green-700' : 'text-red-700'
                                        }`}
                                    >
                                        {deployResult?.success ? '部署成功' : '部署失败'}
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 }}
                                        className="text-gray-600 mb-6"
                                    >
                                        {deployResult?.success
                                            ? 'Zabbix 服务已成功部署，您可以通过以下信息访问系统'
                                            : deployResult?.error || '部署过程中发生错误'}
                                    </motion.p>

                                    {/* 访问信息 */}
                                    {deployResult?.success && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.5 }}
                                            className="w-full max-w-sm bg-white rounded-lg border border-gray-200 p-4 mb-6"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">访问地址</span>
                                                    <a
                                                        href={deployResult.accessUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
                                                    >
                                                        {deployResult.accessUrl}
                                                        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                                                    </a>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">用户名</span>
                                                    <span className="text-sm font-medium">{deployResult.username}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">密码</span>
                                                    <span className="text-sm font-medium">{deployResult.password}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* 部署日志 */}
                                    {deployResult?.logs && deployResult.logs.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.6 }}
                                            className="w-full"
                                        >
                                            <div className="text-sm font-medium text-gray-700 mb-2 text-left">部署日志</div>
                                            <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto text-left">
                                                {deployResult.logs.map((log, index) => (
                                                    <div key={index} className="text-sm text-gray-600 font-mono mb-1">
                                                        {log}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* 按钮 */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.7 }}
                                        className="mt-6 flex gap-3"
                                    >
                                        {deployResult?.success ? (
                                            <>
                                                <button
                                                    onClick={() => window.open(deployResult.accessUrl, '_blank')}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                                >
                                                    访问系统
                                                </button>
                                                <button
                                                    onClick={() => setShowResultDialog(false)}
                                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                                >
                                                    关闭
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setShowResultDialog(false);
                                                        setShowInstallWizard(true);
                                                    }}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                                >
                                                    重试
                                                </button>
                                                <button
                                                    onClick={() => setShowResultDialog(false)}
                                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                                >
                                                    关闭
                                                </button>
                                            </>
                                        )}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ZabbixInstall;
