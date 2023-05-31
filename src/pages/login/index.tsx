import LoginPage from '@/components/auth/login';
import Head from 'next/head';

export default function Login() {
    return (
        <>
            <Head>
                <title>Login - Payme</title>
            </Head>
            <LoginPage />
        </>
    );
}
