'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ServerDetailLayout from '../components/ServerDetailLayout';
import ServerDetailSkeleton from '../components/ServerDetailSkeleton';
import Sidebar from '@/components/sidebar';
import InstallationLayout from '../../components/InstallationLayout';

// 动态导入 ServerDetail 组件
const ServerDetail = dynamic(
    () => import('../components/ServerDetail'),
    {
        loading: () => <ServerDetailSkeleton />,
        ssr: false
    }
);

interface ServerPageProps {
    params: {
        serverId: string;
    };
}

export default function ServerPage({ params }: ServerPageProps) {
    const router = useRouter();

    return (
        <ServerDetailLayout>
            <Suspense fallback={<ServerDetailSkeleton />}>
                <ServerDetail serverId={params.serverId} />
            </Suspense>
        </ServerDetailLayout>
    );
} 