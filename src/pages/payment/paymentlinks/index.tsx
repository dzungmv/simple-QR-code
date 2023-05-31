import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function PaymentPages() {
    return <h2>Payment links</h2>;
}

PaymentPages.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
