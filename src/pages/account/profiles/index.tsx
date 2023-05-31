import { MainLayout } from '@/components/layouts';
import Profile from '@/components/profile';
import { ReactNode } from 'react';

export default function Profiles() {
    return <Profile />;
}

Profiles.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
