'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ProTag from '@/components/ProTag';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import InstallProgressModal, { InstallStep } from './InstallProgressModal';

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
    title: mode === 'single' ? '部署服务' : mode === 'cluster' ? '部署集群服务' : '部署分布式服务',
    description: mode === 'single' 
      ? '启动并配置所有服务'
      : mode === 'cluster'
      ? '配置集群节点并启动服务'
      : '配置分布式节点并启动服务',
    status: 'pending',
    logs: [],
  }
];

const ServerInstall = () => {
  // 状态管理
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployMode, setDeployMode] = useState<'single' | 'cluster' | 'distributed' | null>(null);
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

  // 处理部署请求
  const handleDeploy = async (mode: 'single' | 'cluster' | 'distributed') => {
    try {
      // 初始化部署状态
      setDeployMode(mode);
      setIsDeploying(true);
      const initialSteps = getInitialSteps(mode);
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
              mode: mode,
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
      <div className="grid grid-cols-3 gap-6">
        {/* 单机模式卡片 */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">单机模式</h2>
            <div className="flex flex-col">
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300">
                  单机模式适合小型环境使用，所有组件部署在同一台服务器上。
                </p>
              </div>
              <div className="w-full mb-4">
                <Image
                  src="/images/single-node.svg"
                  alt="单机部署架构图"
                  width={400}
                  height={300}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDeploy('single')}
            disabled={isDeploying}
            className={`w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg ${
              isDeploying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isDeploying && deployMode === 'single' ? '部署中...' : '开始部署'}
          </motion.button>
        </section>

        {/* 集群模式卡片 */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">集群模式</h2>
              <ProTag variant="right" />
            </div>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">
                集群模式提供高可用性，支持水平扩展，适合中型部署环境。
              </p>
            </div>
            <div className="w-full mb-4">
              <Image
                src="/images/cluster-mode.svg"
                alt="集群部署架构图"
                width={400}
                height={300}
                className="w-full"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDeploy('cluster')}
            disabled={isDeploying}
            className={`w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg ${
              isDeploying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isDeploying && deployMode === 'cluster' ? '部署中...' : '开始部署'}
          </motion.button>
        </section>

        {/* 分布式集群卡片 */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">分布式集群</h2>
              <ProTag variant="right" />
            </div>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">
                分布式集群架构，支持跨区域部署和负载均衡，适合大规模部署。
              </p>
            </div>
            <div className="w-full mb-4">
              <Image
                src="/images/distributed-cluster-mode.svg"
                alt="分布式集群架构图"
                width={400}
                height={300}
                className="w-full"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDeploy('distributed')}
            disabled={isDeploying}
            className={`w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg ${
              isDeploying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isDeploying && deployMode === 'distributed' ? '部署中...' : '开始部署'}
          </motion.button>
        </section>
      </div>

      {/* 安装进度弹窗 */}
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

export default ServerInstall;
