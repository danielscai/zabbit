import ServerDetailLayout from '../../components/ServerDetailLayout';
import ServerDetail from '../../components/ServerDetail';

interface DatabaseBackupPageProps {
    params: {
        serverId: string;
    };
}

export default function DatabaseBackupPage({ params }: DatabaseBackupPageProps) {
    return (
        <ServerDetailLayout>
            <ServerDetail serverId={params.serverId} activeTab="database-backup" />
        </ServerDetailLayout>
    );
} 