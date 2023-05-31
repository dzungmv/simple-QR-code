import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function PaymentSubscription() {
    return (
        <>
            <Head>
                <title>Payme Subcription - Payme</title>
            </Head>
            <h2>Payment Subcription</h2>
        </>
    );
}

PaymentSubscription.getLayout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);
