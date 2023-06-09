import { MainLayout } from '@/components/layouts';
import QRManager from '@/components/qr-manager';
import { selectBank, setBank } from '@/redux/slice/bankSlice';
import { BankProps } from '@/types';
import axios from 'axios';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();

    // Handle fetch QR code
    useEffect(() => {
        (async () => {
            const res = await axios.get('https://api.vietqr.io/v2/banks');
            const bankData = res?.data?.data;
            dispatch(setBank(bankData));
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Head>
                <title>QR Manager</title>
            </Head>
            <QRManager />
        </>
    );
}

Home.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
