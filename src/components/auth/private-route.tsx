import { selectUser } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const user = useSelector(selectUser);

    const uid = user?.uid;

    useEffect(() => {
        !uid ? router.push('/login') : router.push('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);
    return <>{children}</>;
};

export default PrivateRoute;
