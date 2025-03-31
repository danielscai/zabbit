'use client';

import { useState } from 'react';
import ServerList from './ServerList';
import InstallWizard from './InstallWizard';
import InstallProgressModal, { InstallStep } from './InstallProgressModal';
import { toast } from 'react-hot-toast';

const ServerInstall = () => {
  const [showInstallWizard, setShowInstallWizard] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [steps, setSteps] = useState<InstallStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // 更新特定步骤的状态
  const updateStep = (stepId: string, updates: Partial<InstallStep>) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    );
  };

  // 关闭进度弹窗
  const handleCloseProgressModal = () => {
    if (isCompleted || !isDeploying) {
      setShowProgressModal(false);
    }
  };

  // 处理安装向导完成
  const handleInstallWizardComplete = async (serverData: any) => {
    try {
      // 初始化部署状态
      setIsDeploying(true);
      const initialSteps = getInitialSteps(serverData.mode);
      setSteps(initialSteps);
      setCurrentStepIndex(0);
      setShowProgressModal(true);
      setIsCompleted(false);

      // 逐步执行安装步骤
      for (let i = 0; i < initialSteps.length; i++) {
        const step = initialSteps[i];
        setCurrentStepIndex(i);
        
        // 更新当前步骤状态为运行中
        updateStep(step.id, { status: 'running' });

        try {
          // 调用 API 执行当前步骤
          const response = await fetch('/api/installation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              step: step.id,
              config: serverData,
            }),
          });

          // 处理 API 响应
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '步骤执行失败');
          }

          // 解析响应数据
          const data = await response.json();
          
          // 更新步骤状态为已完成
          updateStep(step.id, { 
            status: 'completed',
            logs: data.logs || []
          });
        } catch (error: any) {
          // 更新步骤状态为错误
          updateStep(step.id, { 
            status: 'error',
            error: error.message,
          });
          
          // 抛出错误以中断后续步骤
          throw error;
        }
      }

      // 所有步骤完成
      toast.success('部署成功！');
      setIsCompleted(true);
    } catch (error: any) {
      // 处理部署过程中的错误
      toast.error('部署失败：' + error.message);
    } finally {
      setIsDeploying(false);
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

      <InstallProgressModal
        isOpen={showProgressModal}
        onClose={handleCloseProgressModal}
        steps={steps}
        currentStepIndex={currentStepIndex}
        isCompleted={isCompleted}
      />
    </>
  );
};

// 定义每种部署模式的初始安装步骤
const getInitialSteps = (mode: 'single' | 'cluster' | 'distributed'): InstallStep[] => [
  {
    id: 'check-docker',
    title: 'Docker 环境检查',
    description: '检查 Docker 是否正确安装并运行',
    status: 'pending',
    logs: [],
  },
  {
    id: 'check-compose',
    title: 'Docker Compose 检查',
    description: '检查 Docker Compose 是否正确安装',
    status: 'pending',
    logs: [],
  },
  {
    id: 'pull-images',
    title: '测试镜像拉取',
    description: '测试 Docker 拉取功能是否正常工作',
    status: 'pending',
    logs: [],
  },
  {
    id: 'deploy-services',
    title: mode === 'single' ? '部署 Zabbix 服务' : mode === 'cluster' ? '部署 Zabbix 集群服务' : '部署 Zabbix 分布式服务',
    description: '使用 Docker Compose 部署 Zabbix Server 和 PostgreSQL 数据库',
    status: 'pending',
    logs: [],
  }
];

export default ServerInstall;
