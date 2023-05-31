'use client';
import PrivateRoute from '@/components/auth/private-route';
import { ReactNode } from 'react';
import ReduxProvider from '@/redux/provider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';

type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
    Component: Page;
};

export default function App({ Component, pageProps }: Props) {
    // const Layout = Component.Layout ? Component.Layout : PrivateRoute;
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    return (
        <ReduxProvider>
            <PrivateRoute>
                {getLayout(<Component {...pageProps} />)}
            </PrivateRoute>
        </ReduxProvider>
    );
}
