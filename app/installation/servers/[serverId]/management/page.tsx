'use client';

import ServerDetailLayout from '../../components/ServerDetailLayout';
import ServerDetail from '../../components/ServerDetail';

interface ManagementPageProps {
    params: {
        serverId: string;
    };
}

export default function ManagementPage({ params }: ManagementPageProps) {
    return (
        <ServerDetailLayout>
            <ServerDetail serverId={params.serverId} activeTab="management" />
        </ServerDetailLayout>
    );
} 