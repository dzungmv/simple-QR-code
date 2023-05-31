import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function TransactionManage() {
    return (
        <>
            <Head>
                <title>Transaction Manage - Payme</title>
            </Head>
            <h2>Transaction Manage</h2>
        </>
    );
}

TransactionManage.getLayout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);
