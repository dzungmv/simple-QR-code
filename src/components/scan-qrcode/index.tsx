import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

import { Player } from '@lottiefiles/react-lottie-player';
import qr_scan_animation from '../../../public/scan-qr.json';
import Modal from '../modal';
import { useRouter } from 'next/navigation';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const QrReader = require('react-qr-reader');

const ScanQRCode: React.FC = () => {
    const router = useRouter();
    const [access, setAccess] = useState<boolean>(false);
    const [data, setData] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const cameraRef = React.useRef<any>(null);

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
        closeCamera: async () => {
            await cameraRef.current?.clearComponent();
            setAccess(false);
        },
        turnOnCamera: () => {
            cameraRef.current?.handleVideo();
        },
    };

    useEffect(() => {
        if (data) {
            setOpenModal(true);
        }
    }, [data]);

    useEffect(() => {
        return () => {
            if (access) {
                cameraRef.current?.clearComponent();
            }
        };
    }, [access]);

    return (
        <>
            <section className='w-[90%] mx-auto mobile:w-full'>
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
                            {/* <QrReader
                                ref={cameraRef}
                                facingMode='user'
                                // legacyMode={false}
                                delay={300}
                                onError={HANDLE.handleError}
                                onScan={HANDLE.handleScan}
                                style={{ width: '350px' }}
                            /> */}

                            <BarcodeScannerComponent
                                width='350px'
                                height='350px'
                                onUpdate={(err: any, result: any) => {
                                    if (result) {
                                        setData(result?.text);
                                    } else {
                                        setData('');
                                    }
                                }}
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
                {/* <div
                    id='reader'
                    className='w-[500px] h-[500px] flex items-center justify-center'
                ></div> */}
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
