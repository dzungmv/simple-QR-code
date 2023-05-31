import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Settlements() {
    return <h2>Settlements</h2>;
}

Settlements.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
