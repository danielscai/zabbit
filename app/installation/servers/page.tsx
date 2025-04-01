'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ServerList from './components/ServerList';
import InstallationLayout from '../components/InstallationLayout';
import InstallWizard from '../components/InstallWizard';

export default function ServersPage() {
    const router = useRouter();
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const handleNewServer = () => {
        setIsWizardOpen(true);
    };

    const handleClose = () => {
        setIsWizardOpen(false);
    };

    const handleComplete = (data: any) => {
        console.log('Installation completed:', data);
        setIsWizardOpen(false);
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
            </div>
        </InstallationLayout>
    );
}