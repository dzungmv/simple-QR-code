import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Configurations() {
    return <h2>Configurations</h2>;
}

Configurations.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
