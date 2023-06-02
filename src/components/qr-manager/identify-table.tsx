import { IdentifyProps } from '@/types';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import ImageCustom from '../image';
import ImagePreview from '../modal/image-preview';

const IdentifyTable: React.FC = () => {
    const [identifys, setIdentifys] = useState<IdentifyProps[]>([]);
    const [modalPreview, setModalPreview] = useState<boolean>(false);
    const [imageIdentifyPreview, setImageIdentifyPreview] =
        useState<string>('');

    const HANDLE = {
        preview: (image: string) => {
            setModalPreview(true);
            setImageIdentifyPreview(image);
        },
        approve: (identify: IdentifyProps) => {
            const db = getDatabase();

            const qrData = {
                ...identify,
                status: 'approved',
            };

            const updates = {} as any;

            updates['/identifys/' + identify.id] = qrData;

            return update(ref(db), updates);
        },
        reject: (identify: IdentifyProps) => {
            const db = getDatabase();

            const qrData = {
                ...identify,
                status: 'rejected',
            };

            const updates = {} as any;

            updates['/identifys/' + identify.id] = qrData;

            return update(ref(db), updates);
        },
    };

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'identifys');

        onValue(starCountRef, (snapshot) => {
            if (!snapshot.exists()) {
                return;
            }

            const data = snapshot.val();

            const keys = Object.keys(data);

            setIdentifys(
                keys.map((key) => {
                    return {
                        ...data[key],
                        id: key,
                    };
                })
            );
        });
    }, []);
    return (
        <>
            <div
                className='overflow-hidden'
                style={{
                    width: 'inherit',
                }}
            >
                <div className='overflow-auto min-width-full'>
                    <table className='w-full flex flex-row flex-no-wrap sm:bg-white sm:shadow-lg text-sm'>
                        <thead className='text-white'>
                            {identifys &&
                                identifys.length > 0 &&
                                identifys.map((item: IdentifyProps) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className='bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg mobile:rounded-none mb-2 sm:mb-0'
                                        >
                                            <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                Tên hiện thị
                                            </th>
                                            {/* <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                Email
                                            </th> */}
                                            <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                CMND/CCCD mặt trước
                                            </th>
                                            <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                CMND/CCCD mặt sau
                                            </th>
                                            <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                Ảnh chân dung
                                            </th>
                                            <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                Trạng thái
                                            </th>
                                            {item.status === 'pending' && (
                                                <th className='p-3 text-left mobile:h-[50px] truncate'></th>
                                            )}
                                        </tr>
                                    );
                                })}
                        </thead>
                        <tbody className='flex-1 sm:flex-none'>
                            {identifys &&
                                identifys.length > 0 &&
                                identifys.map((item: IdentifyProps) => {
                                    return (
                                        <tr
                                            className='flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'
                                            key={item.id}
                                        >
                                            <td className='border-grey-light truncate border hover:bg-gray-100 p-3 mobile:h-[50px]'>
                                                {item.name ?? 'User'}
                                            </td>
                                            {/* <td className='border-grey-light truncate border hover:bg-gray-100 p-3 mobile:h-[50px]'>
                                                {item.email}
                                            </td> */}
                                            <td className='border-grey-light truncate border hover:bg-gray-100 mobile:h-[50px] mobile:px-3'>
                                                <figure
                                                    className='w-[70px] cursor-pointer mx-auto mobile:mx-0'
                                                    onClick={() =>
                                                        HANDLE.preview(
                                                            item.imageFront
                                                        )
                                                    }
                                                >
                                                    <ImageCustom
                                                        src={item.imageFront}
                                                        alt='qr-code'
                                                    />
                                                </figure>
                                            </td>
                                            <td className='border-grey-light border truncate hover:bg-gray-100 mobile:h-[50px] mobile:px-3'>
                                                <figure
                                                    className='w-[70px] cursor-pointer mx-auto mobile:mx-0'
                                                    onClick={() =>
                                                        HANDLE.preview(
                                                            item.imageBack
                                                        )
                                                    }
                                                >
                                                    <ImageCustom
                                                        src={item.imageBack}
                                                        alt='qr-code'
                                                    />
                                                </figure>
                                            </td>

                                            <td className='border-grey-light border truncate hover:bg-gray-100 mobile:h-[50px] mobile:px-3'>
                                                <figure
                                                    className='w-[70px] cursor-pointer mx-auto mobile:mx-0'
                                                    onClick={() =>
                                                        HANDLE.preview(
                                                            item.avatar
                                                        )
                                                    }
                                                >
                                                    <ImageCustom
                                                        src={item.avatar}
                                                        alt='qr-code'
                                                    />
                                                </figure>
                                            </td>
                                            <td className='pr-3 border-grey-light border hover:bg-gray-100 p-3 mobile:h-[50px] truncate'>
                                                {item.status === 'pending' && (
                                                    <span className='bg-yellow-500 p-2 rounded-full px-3 text-white truncate text-xs'>
                                                        Chờ duyệt
                                                    </span>
                                                )}

                                                {item.status === 'approved' && (
                                                    <span className='bg-[#00a67e] p-2 rounded-full px-3 text-white text-xs'>
                                                        Đã duyệt
                                                    </span>
                                                )}

                                                {item.status === 'rejected' && (
                                                    <span className='bg-red-500 p-2 rounded-full px-3 text-white text-xs'>
                                                        Đã từ chối
                                                    </span>
                                                )}
                                            </td>

                                            {item.status === 'pending' && (
                                                <td className='pr-3 border-grey-light border hover:bg-gray-100 p-3 mobile:h-[50px] truncate flex items-center gap-3'>
                                                    <div
                                                        className=' p-2 px-4 rounded-lg bg-primary hover:bg-primaryHover hover:cursor-pointer text-white'
                                                        onClick={() =>
                                                            HANDLE.approve(item)
                                                        }
                                                    >
                                                        Duyệt
                                                    </div>

                                                    <div
                                                        className=' p-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white'
                                                        onClick={() =>
                                                            HANDLE.reject(item)
                                                        }
                                                    >
                                                        Từ chối
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalPreview && (
                <ImagePreview
                    open={modalPreview}
                    close={() => {
                        setModalPreview(false);
                        setImageIdentifyPreview('');
                    }}
                    imgURL={imageIdentifyPreview}
                />
            )}
        </>
    );
};

IdentifyTable.displayName = 'IdentifyTable';
export default IdentifyTable;
