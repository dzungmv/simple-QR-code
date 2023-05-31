import GenerateQRCode from '@/components/generate-qrcode';
import { MainLayout } from '@/components/layouts';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function PaymeQR() {
    // console.log('Check', posts);

    return (
        <>
            <Head>
                <title>QR Code - Payme</title>
            </Head>
            <GenerateQRCode />
        </>
    );
}

PaymeQR.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

// export const getStaticProps: GetStaticProps = async (context) => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

//     return {
//         props: {
//             posts: res.data,
//         },
//     };
// };
