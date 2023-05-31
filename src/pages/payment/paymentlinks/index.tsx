import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function PaymentPages() {
    return (
        <>
            <Head>
                <title>Payme links - Payme</title>
            </Head>
            <h2>Payme links</h2>
        </>
    );
}

PaymentPages.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
