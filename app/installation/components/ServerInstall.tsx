'use client';

import { useState } from 'react';
import ServerList from './ServerList';
import InstallWizard from './InstallWizard';
import InstallProgressModal, { InstallStep } from './InstallProgressModal';
import { toast } from 'react-hot-toast';

const ServerInstall = () => {
  const [showInstallWizard, setShowInstallWizard] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // 关闭进度弹窗
  const handleCloseProgressModal = () => {
    if (isCompleted || !isDeploying) {
      setShowProgressModal(false);
    }
  };

  // 处理安装向导完成
  const handleInstallWizardComplete = async (serverData: any) => {
    try {
      setIsDeploying(true);
      setShowProgressModal(true);
      setIsCompleted(false);

      // Execute installation steps from wizard
      await onComplete(serverData);

      toast.success('部署成功！');
      setIsCompleted(true);
    } catch (error: any) {
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
        isCompleted={isCompleted}
      />
    </>
  );
};

export default ServerInstall;
