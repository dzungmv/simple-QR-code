import GenerateQRCode from '@/components/generate-qrcode';
import { MainLayout } from '@/components/layouts';
import { ReactNode } from 'react';

export default function PaymeQR() {
    // console.log('Check', posts);

    return <GenerateQRCode />;
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
