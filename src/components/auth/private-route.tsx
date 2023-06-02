import { selectUser } from '@/redux/slice/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();

    const user = useSelector(selectUser);

    const uid = user?.uid;

    useEffect(() => {
        if (!uid) {
            router.push('/login');
        } else if (uid && pathname === '/login') {
            router.push('/');
        } else {
            router.push(pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);
    return <>{children}</>;
};

export default PrivateRoute;
