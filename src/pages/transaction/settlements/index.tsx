import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Settlements() {
    return (
        <>
            <Head>
                <title>Settlements - Payme</title>
            </Head>
            <h2>Settlements</h2>
        </>
    );
}

Settlements.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
