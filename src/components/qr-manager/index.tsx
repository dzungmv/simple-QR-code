import {
    getDatabase,
    onValue,
    push,
    ref,
    child,
    update,
} from 'firebase/database';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ImageCustom from '../image';
import LoadingScreen from '../loading';
import Modal from '../modal';

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
    const [qrcodes, setQrcodes] = useState<any[]>([]);
    const [fetchPending, setFetchPending] = useState<boolean>(true);
    const [openModalQR, setOpenModalQR] = useState<boolean>(false);

    const [qrCode, setQrCode] = useState<QRManagerProps>();

    console.log('qrcodes', qrcodes);

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
            console.log('echk');

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

    console.log('qrcodes', qrCode);

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
        if (!openModalQR) {
            setQrCode(undefined);
        }
    }, [openModalQR]);

    return (
        <>
            <section className=''>
                <div className='flex items-center justify-end gap-2'>
                    <Link
                        href='/payment/paymentpos'
                        className='px-5 py-4 flex items-center justify-center gap-1 w-fit bg-violet-500 rounded-lg shadow-md hover:shadow-lg hover:bg-violet-600 text-white'
                    >
                        <i className='fa-solid fa-scanner-touchscreen'></i>
                        Scan QR Code
                    </Link>

                    <Link
                        href='/payment/payme-qr'
                        className='px-5 py-4 flex items-center justify-center gap-1 w-fit bg-primary text-white rounded-lg shadow-md hover:shadow-lg hover:bg-primaryHover'
                    >
                        <i className='fa-solid fa-qrcode'></i>
                        Tạo QR Code
                    </Link>
                </div>

                <div className='w-full mt-10 rounded-xl bg-white'>
                    <h2 className='border-b p-4 text-xl font-medium'>Mã QR</h2>
                    <table className='table-auto w-full border'>
                        <thead className='border'>
                            <tr className=' text-center'>
                                <th className='px-4 py-3'>QR</th>
                                <th>Tên hiện thị</th>
                                <th>Tên tài khoản đăng nhập</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='border text-sm'>
                            {qrcodes &&
                                qrcodes.length > 0 &&
                                qrcodes.map(
                                    (item: QRManagerProps, index: number) => {
                                        return (
                                            <tr
                                                className='border text-center'
                                                key={index}
                                            >
                                                <td className='px-4 py-2 flex items-center justify-center'>
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
                                                <td>
                                                    {item.username ?? 'User'}
                                                </td>
                                                <td>{item.email}</td>
                                                <td>
                                                    {item.qrStatus ===
                                                    'active' ? (
                                                        <span className='bg-[#00a67e] p-2 rounded-full px-3 text-white'>
                                                            Đang hoạt động
                                                        </span>
                                                    ) : (
                                                        <span className='bg-red-500 p-2 rounded-full px-3 text-white'>
                                                            Không khả dụng
                                                        </span>
                                                    )}
                                                </td>
                                                <td className='pr-3 '>
                                                    {item.qrStatus ===
                                                    'active' ? (
                                                        <div
                                                            className='p-1 bg-red-500 text-white rounded-full hover:bg-red-600 hover:cursor-pointer'
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
                                                            className='p-1 bg-green-500 text-white rounded-full hover:bg-green-600 hover:cursor-pointer'
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
                                    }
                                )}
                        </tbody>
                    </table>
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
                                {qrCode?.qrData?.accountNumber}{' '}
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
        </>
    );
};

QRManager.displayName = 'QRManager';
export default QRManager;
