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
            <ServerDetail serverId={params.serverId} activeTab="overview" />
        </ServerDetailLayout>
    );
} 