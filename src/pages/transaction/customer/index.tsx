import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Customer() {
    return <h2>Customer</h2>;
}

Customer.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
