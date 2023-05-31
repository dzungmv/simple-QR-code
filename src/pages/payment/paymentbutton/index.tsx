import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function PaymentButton() {
    return <h2>Payment Button</h2>;
}

PaymentButton.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
