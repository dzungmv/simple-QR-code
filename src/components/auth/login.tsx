'use client';
import { useState } from 'react';
import ImageCustom from '../image';
import Link from 'next/link';
import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/firebase/config';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slice/userSlice';
import LoadingScreen from '../loading';
import Modal from '../modal';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [email, setEmail] = useState<string>('');

    const [hidePassword, setHidePassword] = useState<boolean>(false);

    const [loginPending, setLoginPending] = useState<boolean>(false);

    const [modalForgotPassword, setModalForgotPassword] =
        useState<boolean>(false);

    const HANDLE = {
        validationEmail: (email: string) => {
            const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            return regex.test(email);
        },
        unHidePassword: () => {
            setHidePassword((prev) => !prev);
        },
        signIn: async () => {
            if (!username || !password) {
                swal('Thông báo', 'Vui lòng nhập đầy đủ thông tin', 'warning');
                return;
            }

            if (!HANDLE.validationEmail(username)) {
                swal('Thông báo', 'Email không hợp lệ', 'warning');
                return;
            }

            setLoginPending(true);
            await signInWithEmailAndPassword(auth, username, password)
                .then((res) => {
                    dispatch(
                        setUser({
                            uid: res?.user?.uid,
                            email: res?.user?.email,
                            displayName: res?.user?.displayName,
                            emailVerified: res?.user?.emailVerified,
                        })
                    );
                    setLoginPending(false);
                })
                .catch((err) => {
                    setLoginPending(false);
                    if (err.code === 'auth/user-not-found') {
                        swal(
                            'Tài khoản không tồn tại',
                            'Vui lòng kiểm tra lại tài khoản',
                            'error'
                        );
                    }

                    if (err.code === 'auth/wrong-password') {
                        swal(
                            'Mật khẩu không chính xác',
                            'Vui lòng kiểm tra lại mật khẩu',
                            'error'
                        );
                    }

                    if (err.code === 'auth/invalid-email') {
                        swal(
                            'Email không hợp lệ',
                            'Vui lòng kiểm tra lại email',
                            'error'
                        );
                    }

                    if (err.code === 'auth/too-many-requests') {
                        swal(
                            'Đăng nhập thất bại',
                            'Bạn đã đăng nhập quá nhiều lần',
                            'error'
                        );
                    }
                });
        },
        keyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                HANDLE.signIn();
            }
        },
        keyDownForgotPassword: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                HANDLE.sendResetPassword();
            }
        },
        sendResetPassword: async () => {
            if (!email) {
                swal('Thông báo', 'Vui lòng nhập email', 'error');
                return;
            }

            if (!HANDLE.validationEmail(email)) {
                swal('Thông báo', 'Email không hợp lệ', 'error');
                return;
            }
            setLoginPending(true);
            await sendPasswordResetEmail(auth, email)
                .then(() => {
                    setLoginPending(false);
                    swal(
                        'Thông báo',
                        'Vui lòng kiểm tra email để lấy lại mật khẩu',
                        'success'
                    );

                    setModalForgotPassword(false);
                })
                .catch((err) => {
                    setLoginPending(false);
                    console.log(err);

                    if (err.code === 'auth/user-not-found') {
                        swal('Thông báo', 'Email không tồn tại', 'error');
                    }
                });
        },
    };

    return (
        <>
            <main className='w-full min-h-screen bg-[url("https://sbx-mc.payme.vn/assets/img/login/background-login.svg")] flex justify-center flex-col items-center '>
                <div className='flex items-center justify-center mb-[33px]'>
                    <figure className='w-[136px] flex items-center justify-center'>
                        <ImageCustom
                            src='https://sbx-mc.payme.vn/assets/img/login/logo-payme.svg'
                            alt='Login logo'
                        />
                    </figure>
                </div>

                <section className='bg-white p-20 py-12 shadow-[0_20px_46px_0_rgba(0,0,0,.1)] rounded-[20px] mobile:px-4 mobile:shadow-none mobile:rounded-none'>
                    <h1 className='text-[28px] font-bold text-[#272b41] max-w-[450px] mb-8 text-center'>
                        Đăng nhập tài khoản của bạn
                    </h1>

                    <div className='w-[450px] mobile:w-full'>
                        <div className='w-full mb-[15px]'>
                            <label className='text-[15px] mb-1'>Email</label>
                            <input
                                onKeyDown={HANDLE.keyDown}
                                type='text'
                                placeholder='Nhập email'
                                className='text-[15px] p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='mb-[15px]'>
                            <div className='flex items-center justify-between'>
                                <label className='text-[15px] mb-1'>
                                    Mật khẩu
                                </label>
                                <div
                                    className='text-[15px] text-primary hover:underline hover:cursor-pointer'
                                    onClick={() => setModalForgotPassword(true)}
                                >
                                    Quên mật khẩu?
                                </div>
                            </div>
                            <div className=' relative w-full flex items-center justify-center'>
                                <input
                                    type={hidePassword ? 'text' : 'password'}
                                    onKeyDown={HANDLE.keyDown}
                                    placeholder='Nhập mật khẩu'
                                    className='text-[15px] p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                {password && password.length > 0 && (
                                    <div
                                        className='absolute right-3 hover:cursor-pointer'
                                        onClick={HANDLE.unHidePassword}
                                    >
                                        {hidePassword ? (
                                            <i className='fa-solid fa-eye'></i>
                                        ) : (
                                            <i className='fa-solid fa-eye-slash'></i>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            className='h-[50px] flex items-center justify-center w-full outline-primary bg-primary text-white rounded-xl text-lg hover:bg-primaryHover'
                            onClick={HANDLE.signIn}
                        >
                            Tiếp tục
                        </button>
                    </div>
                </section>

                <div className='flex items-center mt-10 font-medium text-[15px]'>
                    <p className='mr-4'>Chưa có tài khoản?</p>{' '}
                    <Link
                        href='/signup'
                        className='text-primary hover:underline cursor-pointer'
                    >
                        Đăng kí
                    </Link>
                </div>
            </main>
            {loginPending && <LoadingScreen />}
            {modalForgotPassword && (
                <Modal
                    title='Quên mật khẩu'
                    open={modalForgotPassword}
                    close={() => setModalForgotPassword(false)}
                >
                    <div className='w-[550px] mobile:w-full p-4'>
                        <p className='mb-4'>
                            Vui lòng nhập email của bạn để lấy lại mật khẩu
                        </p>
                        <input
                            onKeyDown={HANDLE.keyDownForgotPassword}
                            type='text'
                            placeholder='Nhập email'
                            className='text-[15px] p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className='flex items-center justify-end mt-7 gap-2'>
                            <button
                                className='p-2 text-sm font-medium rounded-lg hover:bg-gray-200'
                                onClick={() => {
                                    setModalForgotPassword(false);
                                }}
                            >
                                Hủy
                            </button>
                            <button
                                className='p-2 px-3 rounded-lg text-white text-sm font-medium bg-primary hover:bg-primaryHover'
                                onClick={HANDLE.sendResetPassword}
                            >
                                Gửi xác nhận
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default LoginPage;
