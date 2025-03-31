'use client';

import { useRouter } from 'next/navigation';
import InstallationLayout from '../../components/InstallationLayout';
import InstallWizard from '../../components/InstallWizard';

export default function NewServerPage() {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    const handleComplete = (data: any) => {
        // TODO: 处理安装完成后的数据
        console.log('Installation completed:', data);
        router.back();
    };

    return (
        <InstallationLayout>
            <InstallWizard 
                isOpen={true}
                onClose={handleClose}
                onComplete={handleComplete}
            />
        </InstallationLayout>
    );
} 