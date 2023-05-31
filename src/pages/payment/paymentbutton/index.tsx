import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function PaymentButton() {
    return (
        <>
            <Head>
                <title>Payme button - Payme</title>
            </Head>
            <h2>Payment Button</h2>
        </>
    );
}

PaymentButton.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
