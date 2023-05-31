import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Balances() {
    return (
        <>
            <Head>
                <title>Balance - Payme</title>
            </Head>
            <h2>Balances</h2>
        </>
    );
}

Balances.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
