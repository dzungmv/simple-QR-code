import GenerateQRCode from '@/components/generate-qrcode';
import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function PaymeQR() {
    return (
        <>
            <Head>
                <title>QR Code - Payme</title>
            </Head>
            <GenerateQRCode />
        </>
    );
}

PaymeQR.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
