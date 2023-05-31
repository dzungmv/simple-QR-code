import SignupPage from '@/components/auth/register';
import Head from 'next/head';

export default function Signup() {
    return (
        <>
            <Head>
                <title>Signup - Payme</title>
            </Head>
            <SignupPage />
        </>
    );
}
