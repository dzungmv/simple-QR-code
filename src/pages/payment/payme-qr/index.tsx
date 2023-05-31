import GenerateQRCode from '@/components/generate-qrcode';
import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function PaymeQR() {
    return <GenerateQRCode />;
}

PaymeQR.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
