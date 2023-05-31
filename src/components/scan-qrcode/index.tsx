import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

import qr_scan_animation from '../../../public/scan-qr.json';
import { Player } from '@lottiefiles/react-lottie-player';
import Modal from '../modal';

const QrReader = require('react-qr-reader');

const ScanQRCode: React.FC = () => {
    const [access, setAccess] = useState<boolean>(false);
    const [data, setData] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const HANDLE = {
        askCameraPermission: () => {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: 'environment',
                    },
                })
                .then((stream: any) => {
                    setAccess(true);
                })
                .catch((err: any) => {
                    swal('Thông báo', 'Có lỗi xảy ra', 'error');
                });
        },
        handleError: (err: any) => {
            console.log(err);
        },
        handleScan: (data: any) => {
            if (data) {
                setData(data);
            }
        },
        closeCamera: () => {
            setAccess(false);
        },
    };

    useEffect(() => {
        if (data) {
            setOpenModal(true);
        }
    }, [data]);

    return (
        <>
            <section className='w-[90%] mx-auto'>
                <div className='flex justify-end'>
                    <Link
                        href='/payment/payme-qr'
                        className='px-4 py-3 flex items-center justify-center gap-1 w-fit bg-primary text-white rounded-lg shadow-md hover:shadow-lg hover:bg-primaryHover'
                    >
                        <i className='fa-solid fa-qrcode'></i>
                        Tạo QR Code
                    </Link>
                </div>
                <div className='mt-5 bg-white flex items-center justify-center flex-col py-5 shadow-sm rounded-lg'>
                    {access ? (
                        <div className='w-full flex items-center justify-center'>
                            <QrReader
                                facingMode='environment'
                                delay={1000}
                                onError={HANDLE.handleError}
                                onScan={HANDLE.handleScan}
                                // chooseDeviceId={()=>selected}
                                style={{ width: '350px' }}
                            />
                        </div>
                    ) : (
                        <div className='w-[350px]'>
                            <Player autoplay loop src={qr_scan_animation} />
                        </div>
                    )}
                    {!access ? (
                        <button
                            className='px-4 py-3 bg-primary rounded-lg text-white hover:bg-primaryHover mt-5'
                            onClick={HANDLE.askCameraPermission}
                        >
                            Mở camera
                        </button>
                    ) : (
                        <button
                            className='px-4 py-3 bg-gray-500 rounded-lg hover:bg-gray-600 text-white mt-5'
                            onClick={HANDLE.closeCamera}
                        >
                            Tắt camera
                        </button>
                    )}
                </div>
            </section>

            {openModal && (
                <Modal
                    title='Kết quả'
                    open={openModal}
                    close={() => {
                        setOpenModal(false);
                        setData('');
                    }}
                >
                    <div className='w-[550px] p-4'>
                        <p className='text-xl font-semibold'>Dữ liệu:</p>
                        <p className='text-lg break-all'>{data}</p>
                    </div>
                </Modal>
            )}
        </>
    );
};

ScanQRCode.displayName = 'ScanQRCode';
export default ScanQRCode;
