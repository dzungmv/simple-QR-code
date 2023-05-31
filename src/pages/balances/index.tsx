import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Balances() {
    return <h2>Balances</h2>;
}

Balances.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
