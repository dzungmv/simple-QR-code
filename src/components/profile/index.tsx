'use client';

import { selectUser } from '@/redux/slice/userSlice';
import { UserProps } from '@/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../modal';
import ChangeDisplayName from './change-name';
import ChangePassword from '../header/change-password';
import Head from 'next/head';

const Profile: React.FC = () => {
    const user: UserProps = useSelector(selectUser);

    const [openModalChangeName, setOpenModalChangeName] =
        useState<boolean>(false);
    const [openModalChangePassword, setOpenModalChangePassword] =
        useState<boolean>(false);

    const HANDLE = {
        OpenModalChangeName: () => {
            setOpenModalChangeName(true);
        },
        OpenModalChangePassword: () => {
            setOpenModalChangePassword(true);
        },
    };

    return (
        <>
            <Head>
                <title>
                    {user?.displayName ?? ' Thông tin tài khoản'} - Payme
                </title>
            </Head>
            <section className='w-full mx-auto'>
                <div className='w-[65%] onlyTablet:w-[80%] mobile:w-full mx-auto mt-2 bg-white flex flex-col gap-[6px] rounded-xl p-3 px-4'>
                    <h2 className='font-medium text-lg text-gray-600 mb-2'>
                        Thông tin tài khoản
                    </h2>
                    <div className='flex items-center justify-between text-[15px]'>
                        <p className='text-gray-500'>Tên tài khoản: </p>

                        <div
                            className='group flex items-center gap-1 text-primary hover:cursor-pointer'
                            onClick={HANDLE.OpenModalChangeName}
                        >
                            <i className='fa-solid fa-pen-to-square group-hover:-translate-x-1 transition-all duration-300'></i>
                            {(
                                <span className='text-black font-medium'>
                                    {user?.displayName}
                                </span>
                            ) ?? <p>Cập nhật</p>}
                        </div>
                    </div>

                    <hr className='border border-dashed' />

                    <div className='flex items-center justify-between text-[15px] py-2'>
                        <p className='text-gray-500'>Email: </p>
                        <p className='font-medium'>{user?.email || 'null'}</p>
                    </div>

                    <hr className='border border-dashed' />

                    <div className='flex justify-end mt-4'>
                        <button
                            className='py-2 px-4 outline-primary bg-primary rounded-lg text-sm font-medium text-white hover:bg-primaryHover'
                            onClick={HANDLE.OpenModalChangePassword}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            </section>

            {openModalChangeName && (
                <Modal
                    title='Đổi tên tài khoản'
                    open={openModalChangeName}
                    close={() => setOpenModalChangeName(false)}
                >
                    <ChangeDisplayName
                        close={() => setOpenModalChangeName(false)}
                    />
                </Modal>
            )}

            {openModalChangePassword && (
                <Modal
                    title='Đổi mật khẩu'
                    open={openModalChangePassword}
                    close={() => setOpenModalChangePassword(false)}
                >
                    <ChangePassword
                        close={() => setOpenModalChangePassword(false)}
                    />
                </Modal>
            )}
        </>
    );
};

Profile.displayName = 'Profile';
export default Profile;
