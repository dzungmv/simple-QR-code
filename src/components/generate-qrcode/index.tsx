'use client';

import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { Player } from '@lottiefiles/react-lottie-player';

import qr_animation from '../../../public/qr-animation.json';
import qr_scan_animation from '../../../public/scan-qr.json';
import ImageCustom from '../image';
import Modal from '../modal';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { UserProps } from '@/types';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slice/userSlice';

const QRCode = require('qrcode');
const QrReader = require('react-qr-reader');
const { v4: uuidv4 } = require('uuid');

const GenerateQRCode: React.FC = () => {
    const user: UserProps = useSelector(selectUser);

    const [testQRCode, setTestQRCode] = useState<string>('');

    const [nameBank, setNameBank] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [checkboxRule, setCheckboxRule] = useState<boolean>(false);

    const [qrCode, setQRCode] = useState<string>('');

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [access, setAccess] = useState<boolean>(false);
    const [dataScan, setDataScan] = useState<string>('');

    const nameBankRef = useRef<HTMLInputElement>(null);

    console.log('QRCODE', QRCode);

    const HANDLE = {
        generateQRCode: () => {
            if (!nameBank || !accountNumber || !username) {
                swal('Thông báo', 'Vui lòng nhập đầy đủ thông tin', 'warning');
                return;
            }

            if (!checkboxRule) {
                swal('Thông báo', 'Bạn chưa đồng ý với điều khoản', 'warning');
                return;
            }

            // QRCode.toDataURL(
            //     JSON.stringify({
            //         nameBank,
            //         accountNumber,
            //         username,
            //     })
            // )
            //     .then(async (url: string) => {
            //         console.log('check QRCODE:', url);

            //         setQRCode(url);
            //         const db = getDatabase();

            //         await set(ref(db, 'qr-codes/' + uuidv4()), {
            //             userId: user?.uid,
            //             username: user?.displayName,
            //             email: user?.email,
            //             qrCode: url,
            //             qrStatus: 'active',
            //             qrData: {
            //                 nameBank,
            //                 accountNumber,
            //                 accountName: username,
            //             },
            //             dateCreated: new Date().toISOString(),
            //         });

            //         swal('Thông báo', 'Tạo QR Code thành công', 'success');
            //     })
            //     .catch((err: any) => {
            //         swal('Thông báo', 'Có lỗi xảy ra', 'error');
            //     });

            QRCode.create(
                JSON.stringify({
                    nameBank,
                    accountNumber,
                    username,
                }),
                {
                    errorCorrectionLevel: 'H',
                    type: 'image/jpeg',
                    quality: 0.3,
                    margin: 1,
                }
            );
        },
        resetQR: () => {
            setQRCode('');
            setNameBank('');
            setAccountNumber('');
            setUsername('');
            setCheckboxRule(false);
            nameBankRef.current?.focus();
        },
        openModalQRCode: () => {
            setOpenModal(true);
        },
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
            swal('Thông báo', 'Có lỗi xảy ra', 'error');
        },
        handleScan: (data: any) => {
            if (data) {
                setDataScan(data);
            }
        },
        closeCamera: () => {
            setAccess(false);
        },
    };

    useEffect(() => {
        if (dataScan) {
            //   check if dataScan is have nameBank, accountNumber, username set to state
            if (
                dataScan.includes('nameBank') &&
                dataScan.includes('accountNumber') &&
                dataScan.includes('username')
            ) {
                const data = JSON.parse(dataScan);
                setNameBank(data.nameBank);
                setAccountNumber(data.accountNumber);
                setUsername(data.username);
                setOpenModal(false);
            } else {
                swal('Thông báo', 'Có lỗi xảy ra', 'error');
            }
        }
    }, [dataScan]);

    return (
        <>
            <section className='w-[90%] mx-auto'>
                <div className='flex justify-end'>
                    <button
                        className='px-4 py-3 flex items-center justify-center gap-1 w-fit bg-violet-500 rounded-lg shadow-md hover:shadow-lg hover:bg-violet-600 text-white'
                        onClick={HANDLE.openModalQRCode}
                    >
                        <i className='fa-solid fa-scanner-touchscreen'></i>
                        Scan banking QR Code
                    </button>
                </div>
                <div className=' flex items-start gap-5 mt-5'>
                    <div className='w-[60%] rounded-xl bg-white px-4 py-3'>
                        <h2 className='text-2xl font-medium'>Tạo mã QR</h2>

                        <div className='mt-4 ml-1'>
                            <div className='w-full mb-[15px]'>
                                <label className='text-[15px] mb-2'>
                                    Ngân hàng thụ hưởng
                                </label>
                                <input
                                    type='text'
                                    ref={nameBankRef}
                                    value={nameBank}
                                    placeholder='Nhập ngân hàng thụ hưởng'
                                    className='text-[15px] mt-1 p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                                    onChange={(e) =>
                                        setNameBank(e.target.value)
                                    }
                                />
                            </div>

                            <div className='w-full mb-[15px]'>
                                <label className='text-[15px] mb-2'>
                                    Số tài khoản thụ hưởng
                                </label>
                                <input
                                    type='text'
                                    placeholder='Nhập số tài khoản thụ hưởng'
                                    className='text-[15px] p-[5px] pl-[10px] w-full h-[50px] mt-1 outline-none bg-[#eff2f7] rounded-xl'
                                    value={accountNumber}
                                    onChange={(e) =>
                                        setAccountNumber(e.target.value)
                                    }
                                />
                            </div>

                            <div className='w-full mb-[15px]'>
                                <label className='text-[15px] mb-2'>
                                    Tên người thụ hưởng
                                </label>
                                <input
                                    type='text'
                                    placeholder='Nhập tên người thụ hưởng'
                                    className='text-[15px] mt-1 p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>

                            <div className='flex items-center gap-1'>
                                <input
                                    type='checkbox'
                                    id='rules'
                                    checked={checkboxRule}
                                    onChange={() =>
                                        setCheckboxRule((prev) => !prev)
                                    }
                                />
                                <label
                                    htmlFor='rules'
                                    className='text-sm select-none hover:cursor-pointer'
                                >
                                    Tôi đồng ý với các điều khoản sử dụng của hệ
                                    thống
                                </label>
                            </div>

                            <button
                                className=' rounded-xl bg-primary hover:bg-primaryHover h-[50px] text-white font-medium mt-5 w-full'
                                onClick={HANDLE.generateQRCode}
                            >
                                Tạo mã QR
                            </button>
                        </div>
                    </div>
                    <div className='flex-1'>
                        {qrCode && qrCode.length > 0 ? (
                            <>
                                <figure className='w-full h-full animate-modal'>
                                    <ImageCustom src={qrCode} alt='QR Code' />
                                </figure>
                                <div className='mt-2 flex items-center justify-evenly'>
                                    <button
                                        className='py-2 px-5 bg-gray-300 rounded-lg hover:bg-gray-400'
                                        onClick={HANDLE.resetQR}
                                    >
                                        Tạo lại
                                    </button>

                                    <a
                                        href={qrCode}
                                        download='qr-code.png'
                                        className='py-2 px-5 bg-violet-500 text-white rounded-lg hover:bg-violet-600'
                                    >
                                        Tải về
                                    </a>
                                </div>
                            </>
                        ) : (
                            <Player autoplay loop src={qr_animation}></Player>
                        )}
                    </div>

                    <div>{testQRCode}</div>
                </div>
            </section>
            {openModal && (
                <Modal
                    title='Scan banking QR Code'
                    open={openModal}
                    close={() => setOpenModal(false)}
                >
                    <div className='w-[700px] flex items-center flex-col justify-center p-4'>
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
                </Modal>
            )}
        </>
    );
};

GenerateQRCode.displayName = 'GenerateQRCode';
export default GenerateQRCode;
