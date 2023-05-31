import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Report() {
    return <h2>Report</h2>;
}

Report.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
