'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InstallationLayout from './components/InstallationLayout';


export default function InstallationPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/installation/servers');
    }, [router]);

    return (
        <InstallationLayout>
            {null}
        </InstallationLayout>
    );
}
