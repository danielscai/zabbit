'use client';

import { useRouter } from 'next/navigation';
import ServerList from './ServerList';

export default function ServersContent() {
    const router = useRouter();

    const handleNewServer = () => {
        router.push('/installation/servers/new');
    };

    return (
        <div className="container mx-auto px-4 py-0">
           
            <ServerList onNewServer={handleNewServer} />
        </div>
    );
} 