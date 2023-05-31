import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function PaymentLinks() {
    return (
        <>
            <Head>
                <title>Payme pages - Payme</title>
            </Head>
            <h2>Payme pages</h2>
        </>
    );
}

PaymentLinks.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
