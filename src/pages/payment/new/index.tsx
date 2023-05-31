import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function NewPayment() {
    return (
        <>
            <Head>
                <title>New payment - Payme</title>
            </Head>
            <h2>New Payment</h2>
        </>
    );
}

NewPayment.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
