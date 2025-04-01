'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ServerList from './components/ServerList';
import InstallationLayout from '../components/InstallationLayout';
import InstallWizard from '../components/InstallWizard';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DeployResult {
    success: boolean;
    logs: string[];
    error?: string;
    accessUrl?: string;
    username?: string;
    password?: string;
}

export default function ServersPage() {
    const router = useRouter();
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false);
    const [deployResult, setDeployResult] = useState<DeployResult | null>(null);

    const handleNewServer = () => {
        setIsWizardOpen(true);
    };

    const handleClose = () => {
        setIsWizardOpen(false);
    };

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
            
            return {
                success: result.success,
                logs: result.logs || [],
                error: result.error,
                accessUrl: result.accessUrl,
                username: result.username,
                password: result.password
            };
        } catch (error: any) {
            console.error('部署服务器出错:', error);
            throw error;
        }
    };

    const handleComplete = async (data: any) => {
        console.log('开始处理安装向导完成:', data);
        try {
            // 执行安装步骤
            const result = await deployServer(data);
            console.log('部署完成，结果:', result);
            
            setDeployResult(result);
            setShowResultDialog(true);
            setIsWizardOpen(false);
            
            if (result.success) {
                toast.success('Zabbix部署成功！');
            } else {
                toast.error('Zabbix部署失败！');
            }
        } catch (error: any) {
            console.error('安装过程出错:', error);
            const errorMessage = error.message || '未知错误';
            
            setDeployResult({
                success: false,
                logs: [],
                error: errorMessage
            });
            setShowResultDialog(true);
            setIsWizardOpen(false);
            toast.error(`Zabbix部署失败：${errorMessage}`);
        }
    };

    return (
        <InstallationLayout>
            <div className="container mx-auto px-4 py-0">
                <ServerList onNewServer={handleNewServer} />
                <InstallWizard 
                    isOpen={isWizardOpen}
                    onClose={handleClose}
                    onComplete={handleComplete}
                />

                {/* 部署结果弹窗 */}
                <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                {deployResult?.success ? (
                                    <>
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>部署成功</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span>部署失败</span>
                                    </>
                                )}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 space-y-4">
                            {deployResult?.success ? (
                                <>
                                    <div className="rounded-lg bg-green-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-green-800">部署完成</h3>
                                                <div className="mt-2 text-sm text-green-700">
                                                    <p>Zabbix 服务已成功部署！您可以通过以下信息访问系统：</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-500 w-24">访问地址：</span>
                                            <a href={deployResult.accessUrl} target="_blank" rel="noopener noreferrer" 
                                               className="text-purple-600 hover:text-purple-800">
                                                {deployResult.accessUrl}
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-500 w-24">用户名：</span>
                                            <span className="text-gray-900">{deployResult.username}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-500 w-24">密码：</span>
                                            <span className="text-gray-900">{deployResult.password}</span>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 rounded-lg p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-yellow-800">安全提示</h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>请及时修改默认密码以确保系统安全！</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="rounded-lg bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">部署失败</h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <p>{deployResult?.error || '未知错误'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 部署日志 */}
                            {deployResult?.logs && deployResult.logs.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">部署日志</h4>
                                    <div className="bg-gray-100 rounded-lg p-3 max-h-40 overflow-y-auto">
                                        {deployResult.logs.map((log, index) => (
                                            <div key={index} className="text-sm text-gray-600 font-mono">
                                                {log}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowResultDialog(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                关闭
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </InstallationLayout>
    );
}