import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Customer() {
    return (
        <>
            <Head>
                <title>Customer - Payme</title>
            </Head>
            <h2>Customer</h2>
        </>
    );
}

Customer.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
