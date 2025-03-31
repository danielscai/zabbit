'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InstallationPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/installation/servers');
    }, [router]);

    return null;
}
