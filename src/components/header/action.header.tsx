'use client';

import { auth } from '@/firebase/config';
import { logout, selectIdentify } from '@/redux/slice/userSlice';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import LoadingScreen from '../loading';
import Modal from '../modal';
import ChangePassword from './change-password';
import { IdentifyProps } from '@/types';

const HeaderAction: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const identify: IdentifyProps = useSelector(selectIdentify);

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
        goToKYC: () => {
            router.push('/account/profiles/kyc');
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
                <div
                    onClick={HANDLE.openToolTip}
                    className='relative hover:cursor-pointer'
                >
                    <i className='fa-solid fa-circle-user text-4xl text-[#647081]'></i>
                    {!identify && (
                        <div className=' absolute w-4 h-4 flex items-center justify-center bg-red-500 rounded-full top-0 right-[-2px] text-white text-xs'>
                            1
                        </div>
                    )}

                    {((identify && identify.status === 'pending') ||
                        (identify && identify.status === 'rejected')) && (
                        <div
                            className=' absolute w-4 h-4 flex items-center justify-center bg-yellow-500 rounded-full top-0 right-[-2px] text-white text-xs'
                            style={{
                                backgroundColor:
                                    identify.status === 'pending'
                                        ? '#F59E0B'
                                        : '#EF4444',
                            }}
                        >
                            !
                        </div>
                    )}

                    {identify && identify.status === 'approved' && (
                        <div className=' absolute w-4 h-4 flex items-center justify-center bg-green-500 rounded-full bottom-[2px] right-[-2px] text-white text-xs'>
                            <i className='fa-solid fa-check'></i>
                        </div>
                    )}
                </div>

                {openTooltip && (
                    <div
                        ref={tooltipRef}
                        className='w-[300px] h-fit absolute top-[100%] right-[10%] rounded-lg p-2 shadow-md border bg-white'
                    >
                        {!identify && (
                            <div
                                className='flex items-center gap-2 p-2 bg-red-200 hover:bg-red-300 rounded-lg hover:cursor-pointer'
                                onClick={HANDLE.goToKYC}
                            >
                                <i className='fa-solid fa-passport text-gray-600'></i>
                                <p className='text-sm font-medium text-gray-600'>
                                    Xác minh tài khoản
                                </p>
                            </div>
                        )}

                        {identify && identify.status === 'pending' && (
                            <div className='flex items-center gap-2 p-2 bg-yellow-200 rounded-lg'>
                                <i className='fa-solid fa-passport text-gray-600'></i>
                                <p className='text-sm font-medium text-gray-600'>
                                    Tài khoản đang được chờ xác minh
                                </p>
                            </div>
                        )}

                        {identify && identify.status === 'rejected' && (
                            <div
                                className='flex items-center gap-2 p-2 bg-red-300 hover:bg-red-400 rounded-lg hover:cursor-pointer'
                                onClick={HANDLE.goToKYC}
                            >
                                <i className='fa-solid fa-passport text-gray-600'></i>
                                <p className='text-sm font-medium text-gray-600'>
                                    Tài khoản bị từ chối xác minh, xác minh lại
                                </p>
                            </div>
                        )}

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
