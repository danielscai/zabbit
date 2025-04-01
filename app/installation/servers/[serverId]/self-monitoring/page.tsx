'use client';

import ServerDetailLayout from '../../components/ServerDetailLayout';
import ServerDetail from '../../components/ServerDetail';

interface SelfMonitoringPageProps {
    params: {
        serverId: string;
    };
}

export default function SelfMonitoringPage({ params }: SelfMonitoringPageProps) {
    return (
        <ServerDetailLayout>
            <ServerDetail serverId={params.serverId} activeTab="self-monitoring" />
        </ServerDetailLayout>
    );
} 