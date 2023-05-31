import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Configurations() {
    return (
        <>
            <Head>
                <title>Configurations - Payme</title>
            </Head>
            <h2>Configurations</h2>
        </>
    );
}

Configurations.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
