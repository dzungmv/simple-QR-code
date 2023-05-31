import { MainLayout } from '@/components/layouts';
import Profile from '@/components/profile';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Profiles() {
    return (
        <>
            <Head>
                <title>Profiles - Payme</title>
            </Head>
            <Profile />
        </>
    );
}

Profiles.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
