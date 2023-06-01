import { MainLayout } from '@/components/layouts';
import KYCPage from '@/components/profile/kyc';
import Head from 'next/head';

export default function KYC() {
    return (
        <>
            <Head>
                <title>KYC - Payme</title>
            </Head>
            <KYCPage />
        </>
    );
}

KYC.getLayout = function getLayout(page: React.ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};
