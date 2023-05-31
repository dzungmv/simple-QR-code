import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function TransactionManage() {
    return <h2>Transaction Manage</h2>;
}

TransactionManage.getLayout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);
