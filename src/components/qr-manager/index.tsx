import {
    selectIdentify,
    selectUser,
    setIdentify,
} from '@/redux/slice/userSlice';
import { IdentifyProps, UserProps } from '@/types';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageCustom from '../image';
import LoadingScreen from '../loading';
import Modal from '../modal';
import IdentifyTable from './identify-table';

import identify_animation from '../../../public/identify.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/navigation';

interface QRManagerProps {
    qrId: string;
    email: string;
    username?: string;
    qrCode: string;
    qrStatus: string;
    userId?: string;
    qrData?: {
        nameBank: string;
        accountNumber: string;
        accountName: string;
    };
}

const QRManager: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user: UserProps = useSelector(selectUser);
    const identify: IdentifyProps = useSelector(selectIdentify);

    const [qrcodes, setQrcodes] = useState<QRManagerProps[]>([]);
    const [fetchPending, setFetchPending] = useState<boolean>(true);
    const [openModalQR, setOpenModalQR] = useState<boolean>(false);

    const [tableQR, setTableQR] = useState<boolean>(true);

    const [qrCode, setQrCode] = useState<QRManagerProps>();

    const [modalIdentify, setModalIdentify] = useState<boolean>(false);

    const HANDLE = {
        openModalQR: (qrCode: QRManagerProps) => {
            setOpenModalQR(true);
            setQrCode(qrCode);
        },
        deactiveQR: (qrCode: QRManagerProps) => {
            const db = getDatabase();

            const qrData = {
                ...qrCode,
                qrStatus: 'deactive',
            };

            const updates = {} as any;

            updates['/qr-codes/' + qrCode.qrId] = qrData;

            return update(ref(db), updates);
        },

        activeQR: (qrCode: QRManagerProps) => {
            const db = getDatabase();

            const qrData = {
                ...qrCode,
                qrStatus: 'active',
            };

            const updates = {} as any;

            updates['/qr-codes/' + qrCode.qrId] = qrData;

            return update(ref(db), updates);
        },
    };

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'qr-codes');
        setFetchPending(true);
        onValue(starCountRef, (snapshot) => {
            if (!snapshot.exists()) {
                setFetchPending(false);
                return;
            }

            const data = snapshot.val();

            const keys = Object.keys(data);

            setQrcodes(
                keys.map((key) => {
                    return {
                        ...data[key],
                        qrId: key,
                    };
                })
            );
            setFetchPending(false);
        });
    }, []);

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, 'identifys/' + user?.uid);

        onValue(starCountRef, (snapshot) => {
            if (!snapshot.exists()) {
                dispatch(setIdentify(null));
                return;
            }
            const data = snapshot.val();
            dispatch(setIdentify(data));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!openModalQR) {
            setQrCode(undefined);
        }
    }, [openModalQR]);

    useEffect(() => {
        if (!identify || (identify && identify.status === 'rejected')) {
            setTimeout(() => {
                setModalIdentify(true);
            }, 3000);
        }
    }, [identify]);

    return (
        <>
            <section className='w-full'>
                <div className='flex items-center justify-end mobile:justify-center gap-2'>
                    <Link
                        href='/payment/paymentpos'
                        className='text-sm px-4 py-3 mobile:p-3 flex items-center justify-center gap-1 w-fit bg-violet-500 rounded-lg shadow-md hover:shadow-lg hover:bg-violet-600 text-white'
                    >
                        <i className='fa-solid fa-scanner-touchscreen'></i>
                        Scan QR Code
                    </Link>

                    <Link
                        href='/payment/payme-qr'
                        className='text-sm px-4 py-3 mobile:p-3 flex items-center justify-center gap-1 w-fit bg-primary text-white rounded-lg shadow-md hover:shadow-lg hover:bg-primaryHover'
                    >
                        <i className='fa-solid fa-qrcode'></i>
                        Tạo QR Code
                    </Link>
                </div>

                <div className='mt-5 rounded-xl bg-white overflow-x-auto pb-2 w-full'>
                    <div className='border-b font-medium flex items-center mobile:justify-between'>
                        <div
                            className='px-3 py-2 hover:bg-gray-200 hover:cursor-pointer mobile:text-sm relative'
                            onClick={() => setTableQR(true)}
                        >
                            Danh sách QR Code
                            {tableQR && (
                                <div className=' absolute w-full h-[3px] rounded-full bg-primary bottom-0 left-0'></div>
                            )}
                        </div>

                        <div
                            className='px-3 py-2 hover:bg-gray-200 hover:cursor-pointer relative mobile:text-sm'
                            onClick={() => setTableQR(false)}
                        >
                            Định danh tài khoản
                            {!tableQR && (
                                <div className=' absolute w-full h-[3px] rounded-full bg-primary bottom-0 left-0'></div>
                            )}
                        </div>
                    </div>

                    {tableQR ? (
                        <table className='w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg text-sm'>
                            <thead className='text-white'>
                                {qrcodes &&
                                    qrcodes.length > 0 &&
                                    qrcodes.map((item: QRManagerProps) => {
                                        return (
                                            <tr
                                                key={item.qrId}
                                                className='bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg mobile:rounded-none mb-2 sm:mb-0'
                                            >
                                                <th className='p-3 text-left mobile:h-[70px] truncate'>
                                                    QR
                                                </th>
                                                <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                    Tên hiện thị
                                                </th>
                                                <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                    Tên tài khoản
                                                </th>
                                                <th className='p-3 text-left mobile:h-[50px] truncate'>
                                                    Trạng thái
                                                </th>
                                                <th className='p-3 mobile:h-[50px] truncate'></th>
                                            </tr>
                                        );
                                    })}
                            </thead>
                            <tbody className='flex-1 sm:flex-none'>
                                {qrcodes &&
                                    qrcodes.length > 0 &&
                                    qrcodes.map((item: QRManagerProps) => {
                                        return (
                                            <tr
                                                className='flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'
                                                key={item.qrId}
                                            >
                                                <td className='border-grey-light border hover:bg-gray-100 p-3 mobile:h-[70px]'>
                                                    <figure
                                                        className='w-[35px] hover:cursor-pointer'
                                                        style={{
                                                            cursor:
                                                                item.qrStatus ===
                                                                'active'
                                                                    ? 'pointer'
                                                                    : 'not-allowed',
                                                            opacity:
                                                                item.qrStatus ===
                                                                'active'
                                                                    ? 1
                                                                    : 0.5,
                                                        }}
                                                        onClick={() => {
                                                            item.qrStatus ===
                                                            'active'
                                                                ? HANDLE.openModalQR(
                                                                      item
                                                                  )
                                                                : null;
                                                        }}
                                                    >
                                                        <ImageCustom
                                                            src={
                                                                'https://sbx-mc.payme.vn/assets/img/icon-qrcode.svg'
                                                            }
                                                            alt='qr-code'
                                                        />
                                                    </figure>
                                                </td>
                                                <td className='border-grey-light border hover:bg-gray-100 p-3 mobile:h-[50px]'>
                                                    {item.username ?? 'User'}
                                                </td>
                                                <td className='border-grey-light border hover:bg-gray-100 p-3 mobile:h-[50px]'>
                                                    {item.email}
                                                </td>
                                                <td className='border-grey-light border hover:bg-gray-100 p-3 mobile:h-[50px]'>
                                                    {item.qrStatus ===
                                                    'active' ? (
                                                        <span className='bg-[#00a67e] p-2 rounded-full px-3 text-white truncate text-xs'>
                                                            Đang hoạt động
                                                        </span>
                                                    ) : (
                                                        <span className='bg-red-500 p-2 rounded-full px-3 text-white text-xs'>
                                                            Không khả dụng
                                                        </span>
                                                    )}
                                                </td>
                                                <td className='pr-3 border-grey-light border hover:bg-gray-100 p-3 mobile:h-[50px] truncate'>
                                                    {item.qrStatus ===
                                                    'active' ? (
                                                        <div
                                                            className='p-2 bg-red-500 text-white rounded-lg px-5 py-2  w-fit flex items-center justify-center hover:bg-red-600 hover:cursor-pointer'
                                                            onClick={() =>
                                                                HANDLE.deactiveQR(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i className='fa-brands fa-creative-commons-nc-eu'></i>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className='p-1 bg-green-500 text-white w-fit rounded-lg px-5 py-2  flex items-center justify-center hover:bg-green-600 hover:cursor-pointer'
                                                            onClick={() =>
                                                                HANDLE.activeQR(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i className='fa-solid fa-wave-pulse'></i>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    ) : (
                        <IdentifyTable />
                    )}
                </div>
            </section>
            {fetchPending && <LoadingScreen />}
            {openModalQR && (
                <Modal
                    title='Thông tin Mã QR'
                    open={openModalQR}
                    close={() => setOpenModalQR(false)}
                >
                    <div className='w-[500px] p-4 bg-[url("https://sbx-mc.payme.vn/assets/img/login/background-login.svg")] flex items-center justify-center flex-col rounded-bl-2xl rounded-br-2xl mobile:w-full'>
                        <figure className='w-[300px] h-[300px]'>
                            <ImageCustom src={qrCode!.qrCode} alt='qr-code' />
                        </figure>

                        <hr className='border border-dashed' />

                        <div className='text-center'>
                            <h3 className='text-xl mb-4 font-medium'>
                                Thông tin chuyển khoản
                            </h3>
                            <p className=' font-medium text-primary'>
                                {qrCode?.qrData?.accountNumber}
                                <i className='fa-solid fa-copy'></i>
                            </p>

                            <p className='text-primary font-medium'>
                                {qrCode?.qrData?.accountName}
                            </p>

                            <div className='text-center w-full flex items-end justify-center'>
                                <p className='text-gray-500 max-w-[250px] text-center'>
                                    {qrCode?.qrData?.nameBank}
                                </p>
                            </div>

                            <div className='flex items-center justify-evenly gap-10 mt-6'>
                                <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 font-medium rounded-xl text-white'>
                                    <i className='fa-solid fa-download'></i> In
                                    mã QR
                                </button>
                                <button className='py-3 px-4 bg-primary hover:bg-primaryHover font-medium rounded-xl text-white'>
                                    <i className='fa-solid fa-download'></i> Lưu
                                    ảnh
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {modalIdentify && (
                <Modal
                    title='Xác thực tài khoản'
                    open={modalIdentify}
                    close={() => setModalIdentify(false)}
                >
                    <div className='w-[550px] p-4 mobile:w-full'>
                        <Player
                            style={{
                                width: '170px',
                                marginTop: '-50px',
                            }}
                            src={identify_animation}
                            autoplay
                            loop
                        />
                        <p className='-mt-8'>
                            Vui lòng xác thực tài khoản để sử dụng các tính năng
                            của PayME
                        </p>

                        <div className='mt-10 flex items-center justify-end gap-3'>
                            <button
                                className='p-3 py-2 rounded-lg text-sm hover:bg-gray-200'
                                onClick={() => setModalIdentify(false)}
                            >
                                Để sau
                            </button>
                            <button
                                className='px-4 py-2 rounded-lg bg-primary text-sm font-medium text-white'
                                onClick={() =>
                                    router.push('/account/profiles/kyc')
                                }
                            >
                                Xác thực
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

QRManager.displayName = 'QRManager';
export default QRManager;
