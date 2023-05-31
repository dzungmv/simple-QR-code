import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Payment() {
    return <h2>Payment</h2>;
}

Payment.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
