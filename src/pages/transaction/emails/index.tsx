import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Emails() {
    return (
        <>
            <Head>
                <title>Emails - Payme</title>
            </Head>
            <h2>Emails</h2>
        </>
    );
}

Emails.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
