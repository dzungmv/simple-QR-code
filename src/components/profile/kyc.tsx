import { selectIdentify, selectUser } from '@/redux/slice/userSlice';
import { IdentifyProps, UserProps } from '@/types';
import { Player } from '@lottiefiles/react-lottie-player';
import { getDatabase, ref, set } from 'firebase/database';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import ImageCustom from '../image';

import identify_pending_animation from '../../../public/identify-pending.json';
import axios from 'axios';
import LoadingScreen from '../loading';

const KYCPage: React.FC = () => {
    const user: UserProps = useSelector(selectUser);
    const identify: IdentifyProps = useSelector(selectIdentify);

    const [imageFront, setImageFront] = useState<any>('');
    const [imageBack, setImageBack] = useState<any>('');
    const [avatar, setAvatar] = useState<any>('');

    const [imageFrontPreview, setImageFrontPreview] = useState<any>(null);
    const [imageBackPreview, setImageBackPreview] = useState<any>(null);
    const [avatarPreview, setAvatarPreview] = useState<any>(null);
    const [pendingConfirm, setPendingConfirm] = useState<boolean>(false);

    const HANDLE = {
        selectImageFront: (e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];

            //     only accept image file

            if (file) {
                if (!file.type.includes('image')) {
                    swal('Thông báo', 'Sai định dạng file', 'error');
                    return;
                }

                setImageFront(file);
            }
        },
        seclectImageBack: (e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];

            if (file) {
                if (!file.type.includes('image')) {
                    swal('Thông báo', 'Sai định dạng file', 'error');
                    return;
                }

                setImageBack(file);
            }
        },
        seclectImageAvt: (e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];

            if (file) {
                if (!file.type.includes('image')) {
                    swal('Thông báo', 'Sai định dạng file', 'error');
                    return;
                }

                setAvatar(file);
            }
        },
        removeImgFront: () => {
            setImageFront(null);
            setImageFrontPreview(null);
            URL.revokeObjectURL(imageFront);
        },
        removeImgBack: () => {
            setImageBack(null);
            setImageBackPreview(null);
            URL.revokeObjectURL(imageBack);
        },
        removeImgAvt: () => {
            setAvatar(null);
            setAvatarPreview(null);
            URL.revokeObjectURL(avatar);
        },
        uploadPhotos: async () => {
            const uploadedFiles = [imageFront, imageBack, avatar];
            const formPhotos = uploadedFiles.map((file) => {
                const form = new FormData();
                form.append('image', file);
                return form;
            });
            const photos = formPhotos.map((form) => {
                return axios.post(
                    `https://api.imgbb.com/1/upload?expiration=15552000&key=${process.env.IMGBB_API_KEY}`,
                    form
                );
            });
            const res = await Promise.all(photos);
            let urlPhotos = res.map((r) => r?.data?.data?.display_url);
            return urlPhotos;
        },
        confirm: async () => {
            const db = getDatabase();

            const imgFrontByte = imageFront.size;
            const imgFrontMB = imgFrontByte / (1024 * 1024);

            const imgBackByte = imageFront.size;
            const imgBackMB = imgBackByte / (1024 * 1024);

            const avatarByte = avatar.size;
            const avatarMB = avatarByte / (1024 * 1024);

            if (imgFrontMB + imgBackMB + avatarMB > 20) {
                swal(
                    'Thông báo',
                    'Kích thước file lớn hơn 20MB, vui lòng thử lại',
                    'error'
                ).then(() => {
                    setImageFront(null);
                    setImageFrontPreview(null);
                    setImageBack(null);
                    setImageBackPreview(null);
                    setAvatar(null);
                    setAvatarPreview(null);
                });

                return;
            }

            try {
                setPendingConfirm(true);
                const photos = await HANDLE.uploadPhotos();

                await set(ref(db, 'identifys/' + user.uid), {
                    imageFront: photos[0],
                    imageBack: photos[1],
                    avatar: photos[2],
                    status: 'pending',
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                });

                setPendingConfirm(false);

                swal('Thông báo', 'Gửi xác thực thành công', 'success').then(
                    () => {
                        setImageFront(null);
                        setImageFrontPreview(null);
                        setImageBack(null);
                        setImageBackPreview(null);
                        setAvatar(null);
                        setAvatarPreview(null);
                    }
                );
            } catch (error) {
                setPendingConfirm(false);
                console.log(error);
                swal('Thông báo', 'Gửi xác thực thất bại', 'error');
            }
        },
    };

    useEffect(() => {
        if (imageFront) {
            setImageFrontPreview(URL.createObjectURL(imageFront));
        }

        if (imageBack) {
            setImageBackPreview(URL.createObjectURL(imageBack));
        }

        if (avatar) {
            setAvatarPreview(URL.createObjectURL(avatar));
        }

        return () => {
            if (imageFront) {
                URL.revokeObjectURL(imageFront);
            }
            if (imageBack) {
                URL.revokeObjectURL(imageBack);
            }

            if (avatar) {
                URL.revokeObjectURL(avatar);
            }
        };
    }, [imageFront, imageBack, avatar]);
    return (
        <>
            <section className='py-3 w-[80%] mx-auto mobile:w-full'>
                <h1 className=' font-medium text-lg'>Xác thực danh tính</h1>

                <p className='mt-2 text-gray-600'>
                    Để bảo vệ tài khoản của bạn, vui lòng xác thực danh tính để
                    sử dụng các tính năng của Payme
                </p>

                {identify && identify.status === 'pending' ? (
                    <div className='flex flex-col gap-6 mt-7'>
                        <Player
                            className='w-[370px] mobile:w-full'
                            src={identify_pending_animation}
                            autoplay
                            loop
                        ></Player>
                        <p className='text-center font-medium text-2xl mobile:text-xl'>
                            Tài khoản của bạn đang được xác thực
                        </p>
                    </div>
                ) : (
                    <div className='p-3 bg-white mt-4 rounded-lg border border-dashed'>
                        <div className='flex items-center justify-between mobile:flex-col mobile:gap-4 mobile:justify-normal'>
                            <div>
                                <p>CMND/CCCD - Mặt trước</p>
                                <p className='text-gray-500 text-sm'>
                                    File có định dạng là ảnh: jpg, png, jpeg
                                </p>
                            </div>
                            <div>
                                <input
                                    type='file'
                                    id='imageFront'
                                    className=' hidden'
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => HANDLE.selectImageFront(e)}
                                />
                                <label
                                    className='px-4 py-2 flex items-center gap-1 bg-violet-500 hover:bg-violet-600 text-sm text-white rounded-md hover:cursor-pointer'
                                    htmlFor='imageFront'
                                >
                                    <i className='fa-solid fa-upload'></i>
                                    Tải lên
                                </label>
                            </div>
                        </div>

                        <hr className=' border border-dashed my-3' />

                        <div className='flex items-center justify-between mobile:flex-col mobile:gap-4 mobile:justify-normal'>
                            <div>
                                <p>CMND/CCCD - Mặt sau</p>
                                <p className='text-gray-500 text-sm'>
                                    File có định dạng là ảnh: jpg, png, jpeg
                                </p>
                            </div>
                            <div>
                                <input
                                    type='file'
                                    id='imageBack'
                                    className=' hidden'
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => HANDLE.seclectImageBack(e)}
                                />
                                <label
                                    className='px-4 py-2 flex items-center gap-1 bg-violet-500 hover:bg-violet-600 text-sm text-white rounded-md hover:cursor-pointer'
                                    htmlFor='imageBack'
                                >
                                    <i className='fa-solid fa-upload'></i>
                                    Tải lên
                                </label>
                            </div>
                        </div>

                        <hr className=' border border-dashed my-3' />

                        <div className='flex items-center justify-between mobile:flex-col mobile:gap-4 mobile:justify-normal'>
                            <div>
                                <p>Ảnh chân dung</p>
                                <p className='text-gray-500 text-sm'>
                                    File có định dạng là ảnh: jpg, png, jpeg
                                </p>
                            </div>
                            <div>
                                <input
                                    type='file'
                                    id='imageAvt'
                                    className=' hidden'
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => HANDLE.seclectImageAvt(e)}
                                />
                                <label
                                    className='px-4 py-2 flex items-center gap-1 bg-violet-500 hover:bg-violet-600 text-sm text-white rounded-md hover:cursor-pointer'
                                    htmlFor='imageAvt'
                                >
                                    <i className='fa-solid fa-upload'></i>
                                    Tải lên
                                </label>
                            </div>
                        </div>

                        <hr className=' border border-dashed my-3' />

                        <p className=' text-sm font-medium text-gray-500 mt-3'>
                            *Kích thước file không quá 20MB
                        </p>

                        {(imageBackPreview ||
                            imageFrontPreview ||
                            avatarPreview) && (
                            <div className='mt-5 flex items-center gap-7 mobile:flex-col'>
                                {imageFrontPreview && (
                                    <figure className='w-[250px] relative group'>
                                        <p className='text-sm font-medium text-gray-400'>
                                            Mặt trước
                                        </p>
                                        <ImageCustom
                                            src={imageFrontPreview}
                                            alt='img-front'
                                        />
                                        <div
                                            className='absolute w-7 h-7 items-center justify-center rounded-full bg-gray-300 top-1 right-1 hidden group-hover:flex hover:bg-gray-400 hover:cursor-pointer'
                                            onClick={HANDLE.removeImgFront}
                                        >
                                            <i className='fa-solid fa-xmark-large text-sm'></i>
                                        </div>
                                    </figure>
                                )}

                                {imageBackPreview && (
                                    <figure className='w-[250px] relative group'>
                                        <p className='text-sm font-medium text-gray-400'>
                                            Mặt sau
                                        </p>
                                        <ImageCustom
                                            src={imageBackPreview}
                                            alt='img-back'
                                        />
                                        <div
                                            className='absolute w-7 h-7 items-center justify-center rounded-full bg-gray-300 top-1 right-1 hidden group-hover:flex hover:bg-gray-400 hover:cursor-pointer'
                                            onClick={HANDLE.removeImgBack}
                                        >
                                            <i className='fa-solid fa-xmark-large text-sm'></i>
                                        </div>
                                    </figure>
                                )}

                                {avatarPreview && (
                                    <figure className='w-[250px] relative group'>
                                        <p className='text-sm font-medium text-gray-400'>
                                            Ảnh chân dung
                                        </p>
                                        <ImageCustom
                                            src={avatarPreview}
                                            alt='img-back'
                                        />
                                        <div
                                            className='absolute w-7 h-7 items-center justify-center rounded-full bg-gray-300 top-1 right-1 hidden group-hover:flex hover:bg-gray-400 hover:cursor-pointer'
                                            onClick={HANDLE.removeImgAvt}
                                        >
                                            <i className='fa-solid fa-xmark-large text-sm'></i>
                                        </div>
                                    </figure>
                                )}
                            </div>
                        )}
                        {imageBack && imageFront && avatar && (
                            <div className='flex mt-5 justify-end'>
                                <button
                                    className='px-4 p-3 text-sm rounded-lg bg-primary hover:bg-primaryHover text-white font-medium'
                                    onClick={HANDLE.confirm}
                                >
                                    Gửi yêu cầu
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {pendingConfirm && <LoadingScreen />}
        </>
    );
};

KYCPage.displayName = 'KYCPage';
export default KYCPage;
