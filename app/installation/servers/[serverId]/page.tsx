'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ServerDetailLayout from '../components/ServerDetailLayout';
import Sidebar from '@/components/sidebar';
import InstallationLayout from '../../components/InstallationLayout';
import ServerDetail from '../components/ServerDetail';
import DeploymentLogs from '../components/DeploymentLogs';

interface ServerPageProps {
    params: {
        serverId: string;
    };
}

export default function ServerPage({ params }: ServerPageProps) {
    const router = useRouter();

    return (
        <ServerDetailLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <ServerDetail serverId={params.serverId} activeTab="overview" />
                </div>
                <div className="lg:col-span-1">
                    <DeploymentLogs instanceId={params.serverId} refreshInterval={5000} />
                </div>
            </div>
        </ServerDetailLayout>
    );
} 