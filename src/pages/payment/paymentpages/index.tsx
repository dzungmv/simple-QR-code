import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function PaymentLinks() {
    return <h2>Payment page</h2>;
}

PaymentLinks.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
