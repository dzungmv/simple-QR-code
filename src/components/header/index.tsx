import { useRouter } from 'next/navigation';
import ImageCustom from '../image';
import HeaderAction from './action.header';

const Header: React.FC = () => {
    const router = useRouter();
    return (
        <div className='flex items-center justify-between w-full '>
            <figure
                className='w-[100px] hover:cursor-pointer'
                onClick={() => router.push('/')}
            >
                <ImageCustom
                    src='https://sbx-mc.payme.vn/assets/img/login/logo-payme.svg'
                    alt='logo'
                    priority={true}
                />
            </figure>

            <HeaderAction />
        </div>
    );
};

Header.displayName = 'Header';
export default Header;
