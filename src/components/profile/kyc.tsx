import { ChangeEvent, useEffect, useState } from 'react';
import ImageCustom from '../image';
import swal from 'sweetalert';
import { getDatabase, ref, set } from 'firebase/database';
import { IdentifyProps, UserProps } from '@/types';
import { useSelector } from 'react-redux';
import { selectIdentify, selectUser } from '@/redux/slice/userSlice';
import { Player } from '@lottiefiles/react-lottie-player';

import identify_pending_animation from '../../../public/identify-pending.json';

const KYCPage: React.FC = () => {
    const user: UserProps = useSelector(selectUser);
    const identify: IdentifyProps = useSelector(selectIdentify);

    const [imageFront, setImageFront] = useState<any>('');
    const [imageBack, setImageBack] = useState<any>(null);

    const [imageFrontPreview, setImageFrontPreview] = useState<any>(null);
    const [imageBackPreview, setImageBackPreview] = useState<any>(null);

    const [imgBase64, setImgBase64] = useState<string>('');
    const [imgBase64Back, setImgBase64Back] = useState<string>('');

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
                const reader = new FileReader();
                setImageFront(file);

                reader.onloadend = () => {
                    setImgBase64(reader.result as string);
                };

                reader.readAsDataURL(file);
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
                const reader = new FileReader();
                setImageBack(file);

                reader.onloadend = () => {
                    setImgBase64Back(reader.result as string);
                };

                reader.readAsDataURL(file);
            }
        },
        removeImgFront: () => {
            setImageFront(null);
            setImageFrontPreview(null);
        },
        removeImgBack: () => {
            setImageBack(null);
            setImageBackPreview(null);
        },
        confirm: async () => {
            const db = getDatabase();
            try {
                await set(ref(db, 'identifys/' + user.uid), {
                    imageFront: imgBase64,
                    imageBack: imgBase64Back,
                    status: 'pending',
                    name: user.displayName,
                    email: user.email,
                    id: user.uid,
                });

                swal('Thông báo', 'Gửi xác thực thành công', 'success').then(
                    () => {
                        setImageFront(null);
                        setImageFrontPreview(null);
                        setImageBack(null);
                        setImageBackPreview(null);

                        setImgBase64('');
                        setImgBase64Back('');
                    }
                );
            } catch (error) {
                swal('Thông báo', 'Gửi xác thực thành công', 'error');
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

        if (!imageFront) {
            setImgBase64('');
        }

        if (!imageBack) {
            setImgBase64Back('');
        }
        return () => {
            if (imageFront) {
                URL.revokeObjectURL(imageFront);
            }
            if (imageBack) {
                URL.revokeObjectURL(imageBack);
            }
        };
    }, [imageFront, imageBack]);
    return (
        <section className='py-3 w-[80%] mx-auto mobile:w-full'>
            <h1 className=' font-medium text-lg'>Xác thực danh tính</h1>

            <p className='mt-2 text-gray-600'>
                Để bảo vệ tài khoản của bạn, vui lòng xác thực danh tính để sử
                dụng các tính năng của Payme
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    HANDLE.selectImageFront(e)
                                }
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    HANDLE.seclectImageBack(e)
                                }
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

                    {(imageBackPreview || imageFrontPreview) && (
                        <div className='mt-5 flex items-center gap-7 mobile:flex-col'>
                            {imageFrontPreview && (
                                <figure className='w-[250px] relative group'>
                                    <ImageCustom
                                        src={imageFrontPreview}
                                        alt='img-back'
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
                        </div>
                    )}
                    {imageBack && imageFront && (
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
    );
};

KYCPage.displayName = 'KYCPage';
export default KYCPage;
