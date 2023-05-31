'use client';

import { auth } from '@/firebase/config';
import { logout } from '@/redux/slice/userSlice';
import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import LoadingScreen from '../loading';
import Modal from '../modal';
import ChangePassword from './change-password';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HeaderAction: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const tooltipRef = useRef<HTMLDivElement>(null);
    const [openTooltip, setOpenTooltip] = useState<boolean>(false);

    const [logoutPending, setLogoutPending] = useState<boolean>(false);

    const [changePasswordModal, setChangePasswordModal] =
        useState<boolean>(false);

    const HANDLE = {
        openToolTip: () => {
            setOpenTooltip((prev) => !prev);
        },
        logout: async () => {
            setLogoutPending(true);
            await signOut(auth)
                .then((res) => {
                    dispatch(logout());
                    setLogoutPending(false);
                })
                .catch((err) => {
                    swal('Đăng xuất thất bại', 'Vui lòng thử lại sau', 'error');
                    setLogoutPending(false);
                });
        },
        openChangePasswordModal: () => {
            setChangePasswordModal(true);
            setOpenTooltip(false);
        },
        goToProfile: () => {
            router.push('/account/profiles');
            setOpenTooltip(false);
        },
    };

    useEffect(() => {
        // Close tooltip when click outside
        const handleClickOutside = (event: MouseEvent) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node)
            ) {
                setOpenTooltip(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className=' relative flex items-center justify-center'>
                <button onClick={HANDLE.openToolTip}>
                    <i className='fa-solid fa-circle-user text-4xl text-[#647081]'></i>
                </button>

                {openTooltip && (
                    <div
                        ref={tooltipRef}
                        className='w-[300px] h-fit absolute top-[100%] right-[10%] rounded-lg p-2 shadow-md border bg-white'
                    >
                        <div
                            className='flex items-center gap-2 p-2 hover:bg-slate-200 rounded-lg hover:cursor-pointer'
                            onClick={HANDLE.goToProfile}
                        >
                            <i className='fa-solid fa-user text-gray-600'></i>
                            <p className='text-sm font-medium text-gray-600'>
                                Thông tin tài khoản
                            </p>
                        </div>
                        <div
                            className='flex items-center gap-2 p-2 hover:bg-slate-200 rounded-lg hover:cursor-pointer'
                            onClick={HANDLE.openChangePasswordModal}
                        >
                            <i className='fa-solid fa-key text-gray-600'></i>
                            <p className='text-sm font-medium text-gray-600'>
                                Đổi mật khẩu
                            </p>
                        </div>

                        <div
                            className='flex items-center gap-2 p-2 hover:bg-slate-200 rounded-lg hover:cursor-pointer'
                            onClick={HANDLE.logout}
                        >
                            <i className='fa-solid fa-right-from-bracket text-gray-600'></i>
                            <p className='text-sm font-medium text-gray-600'>
                                Đăng xuất
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {logoutPending && <LoadingScreen />}
            {changePasswordModal && (
                <Modal
                    title='Thay đổi mật khẩu'
                    open={changePasswordModal}
                    close={() => setChangePasswordModal(false)}
                    closeOutside={false}
                >
                    <ChangePassword
                        close={() => setChangePasswordModal(false)}
                    />
                </Modal>
            )}
        </>
    );
};

HeaderAction.displayName = 'Personal';

export default HeaderAction;
