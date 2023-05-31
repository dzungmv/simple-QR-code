import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Payout() {
    return (
        <>
            <Head>
                <title>Payout - Payme</title>
            </Head>
            <h2>Payout</h2>
        </>
    );
}

Payout.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
