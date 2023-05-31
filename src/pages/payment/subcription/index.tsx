import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function PaymentSubscription() {
    return <h2>Payment Subcription</h2>;
}

PaymentSubscription.getLayout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);
