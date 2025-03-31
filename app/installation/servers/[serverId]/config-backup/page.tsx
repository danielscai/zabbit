import ServerDetailLayout from '../../components/ServerDetailLayout';
import ServerDetail from '../../components/ServerDetail';

interface ConfigBackupPageProps {
    params: {
        serverId: string;
    };
}

export default function ConfigBackupPage({ params }: ConfigBackupPageProps) {
    return (
        <ServerDetailLayout>
            <ServerDetail serverId={params.serverId} activeTab="config-backup" />
        </ServerDetailLayout>
    );
} 