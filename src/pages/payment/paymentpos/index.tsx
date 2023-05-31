import { MainLayout } from '@/components/layouts';
import ScanQRCode from '@/components/scan-qrcode';
import { ReactNode } from 'react';

export default function PaymentPos() {
    return <ScanQRCode />;
}

PaymentPos.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
