import { MainLayout } from '@/components/layouts';
import ScanQRCode from '@/components/scan-qrcode';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function PaymentPos() {
    return (
        <>
            <Head>
                <title>Payme POS - Payme</title>
            </Head>
            <ScanQRCode />
        </>
    );
}

PaymentPos.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
