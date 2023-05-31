import { auth } from '@/firebase/config';
import { NextOrObserver, signOut, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import swal from 'sweetalert';
import LoadingScreen from '../loading';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slice/userSlice';

type Props = {
    close: () => void;
};

const ChangePassword: React.FC<Props> = ({ close }) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(false);
    const [hideConfirmPassword, setHideConfirmPassword] =
        useState<boolean>(false);

    const [changePasswordPending, setChangePasswordPending] =
        useState<boolean>(false);

    const [logoutPending, setLogoutPending] = useState<boolean>(false);

    const HANDLE = {
        changePassword: async () => {
            if (!password || !confirmPassword) {
                swal(
                    'Vui lòng nhập đầy đủ thông tin',
                    'Vui lòng thử lại',
                    'error'
                );
                return;
            }
            if (password !== confirmPassword) {
                swal('Mật khẩu không khớp', 'Vui lòng thử lại', 'error');
                return;
            }

            if (password.length < 6) {
                swal(
                    'Mật khẩu phải lớn hơn 6 ký tự',
                    'Vui lòng thử lại',
                    'error'
                );
                return;
            }

            const user = auth?.currentUser as any;

            setChangePasswordPending(true);
            await updatePassword(user, password)
                .then(() => {
                    setChangePasswordPending(false);
                    swal('Thay đổi mật khẩu thành công', '', 'success').then(
                        () => {
                            setPassword('');
                            setConfirmPassword('');
                            close();
                        }
                    );
                })
                .catch((err) => {
                    setChangePasswordPending(false);

                    swal(
                        'Vui lòng đăng nhập lại',
                        'Vui lòng thử lại',
                        'error'
                    ).then(() => {
                        setLogoutPending(true);
                        signOut(auth)
                            .then((res) => {
                                dispatch(logout());
                                setLogoutPending(false);
                            })
                            .catch((err) => {
                                swal(
                                    'Đăng xuất thất bại',
                                    'Vui lòng thử lại sau',
                                    'error'
                                );
                                setLogoutPending(false);
                            });
                    });
                });
        },
        unHidePassword: () => {
            setHidePassword((prev) => !prev);
        },
        unHideConfirmPassword: () => {
            setHideConfirmPassword((prev) => !prev);
        },
    };

    return (
        <>
            <div className='w-[550px] px-4 py-3 mobile:w-full'>
                <div className='mb-[15px]'>
                    <div className='flex items-center justify-between'>
                        <label className='text-[15px] mb-1'>Mật khẩu</label>
                    </div>
                    <div className=' relative w-full flex items-center justify-center'>
                        <input
                            type={hidePassword ? 'text' : 'password'}
                            placeholder='Nhập mật khẩu'
                            className='text-[15px] p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                            onChange={(e) => setPassword(e.target.value)}
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
                <div className='mb-[15px]'>
                    <div className='flex items-center justify-between'>
                        <label className='text-[15px] mb-1'>
                            Nhập lại mật khẩu
                        </label>
                    </div>
                    <div className=' relative w-full flex items-center justify-center'>
                        <input
                            type={hideConfirmPassword ? 'text' : 'password'}
                            placeholder='Nhập mật khẩu'
                            className='text-[15px] p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {confirmPassword && confirmPassword.length > 0 && (
                            <div
                                className='absolute right-3 hover:cursor-pointer'
                                onClick={HANDLE.unHideConfirmPassword}
                            >
                                {hideConfirmPassword ? (
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
                    onClick={HANDLE.changePassword}
                >
                    Đổi mật khẩu
                </button>
            </div>
            {changePasswordPending || (logoutPending && <LoadingScreen />)}
        </>
    );
};

ChangePassword.displayName = 'ChangePassword';
export default ChangePassword;
