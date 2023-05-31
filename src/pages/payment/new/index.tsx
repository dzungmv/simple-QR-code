import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function NewPayment() {
    return <h2>New Payment</h2>;
}

NewPayment.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
