import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Payout() {
    return <h2>Payout</h2>;
}

Payout.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
