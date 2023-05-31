import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Report() {
    return (
        <>
            <Head>
                <title>Report - Payme</title>
            </Head>
            <h2>Report</h2>
        </>
    );
}

Report.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
