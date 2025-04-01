'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InstallationLayout from './components/InstallationLayout';
import InstallWizard from './components/InstallWizard';

export default function InstallationPage() {
    const router = useRouter();
    const [isWizardOpen, setIsWizardOpen] = useState(true);

    const handleClose = () => {
        setIsWizardOpen(false);
        router.back();
    };

    const handleComplete = (data: any) => {
        console.log('Installation completed:', data);
        setIsWizardOpen(false);
        router.back();
    };

    return (
        <InstallationLayout>
            <InstallWizard 
                isOpen={isWizardOpen}
                onClose={handleClose}
                onComplete={handleComplete}
            />
        </InstallationLayout>
    );
}
