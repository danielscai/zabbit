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
    error?: string;
    instanceId?: string;
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
                success: true,
                instanceId: result.instanceId
            };
        } catch (error: any) {
            console.error('部署服务器出错:', error);
            return {
                success: false,
                error: error.message
            };
        }
    };

    const handleComplete = async (data: any) => {
        console.log('开始处理安装向导完成:', data);
        try {
            // 执行安装步骤
            const result = await deployServer(data);
            console.log('部署请求完成，结果:', result);
            
            setDeployResult(result);
            setShowResultDialog(true);
            setIsWizardOpen(false);
            
            if (result.success) {
                toast.success('Zabbix部署请求已提交！');
                // 刷新服务器列表
                router.refresh();
            } else {
                toast.error('Zabbix部署失败！');
            }
        } catch (error: any) {
            console.error('安装过程出错:', error);
            setDeployResult({
                success: false,
                error: error.message
            });
            setShowResultDialog(true);
            setIsWizardOpen(false);
            toast.error(`Zabbix部署失败：${error.message}`);
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

                {/* 简化的部署结果弹窗 */}
                <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                {deployResult?.success ? (
                                    <>
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>部署请求已提交</span>
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

                        <div className="mt-4">
                            {deployResult?.success ? (
                                <p className="text-sm text-gray-500">
                                    Zabbix实例正在部署中，您可以在列表中查看部署进度。
                                </p>
                            ) : (
                                <p className="text-sm text-red-500">
                                    {deployResult?.error || '未知错误'}
                                </p>
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
