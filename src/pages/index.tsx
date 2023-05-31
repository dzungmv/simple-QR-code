import GenerateQRCode from '@/components/generate-qrcode';
import { MainLayout } from '@/components/layouts';
import QRManager from '@/components/qr-manager';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Home({ children }: { children: ReactNode }) {
    return <QRManager />;
}

Home.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
