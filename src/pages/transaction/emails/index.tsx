import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function Emails() {
    return <h2>Emails</h2>;
}

Emails.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
