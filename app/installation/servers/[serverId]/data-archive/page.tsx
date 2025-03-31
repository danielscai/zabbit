import ServerDetailLayout from '../../components/ServerDetailLayout';
import ServerDetail from '../../components/ServerDetail';

interface DataArchivePageProps {
    params: {
        serverId: string;
    };
}

export default function DataArchivePage({ params }: DataArchivePageProps) {
    return (
        <ServerDetailLayout>
            <ServerDetail serverId={params.serverId} activeTab="data-archive" />
        </ServerDetailLayout>
    );
} 