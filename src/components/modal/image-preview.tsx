'use client';

import { useEffect, useRef } from 'react';
import ImageCustom from '../image';

type ModalProps = {
    // title: string;
    // children: React.ReactNode;
    imgURL: string;
    open: boolean;
    close: (state: boolean) => void;
    closeOutside?: boolean;
};

const ImagePreview: React.FC<ModalProps> = ({
    open,
    imgURL,
    close,
    closeOutside = true,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const handleCloseModal = () => {
        close(false);
    };

    const handleClickOutside = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (modalRef.current) {
            if (!modalRef.current.contains(e.target as Node)) {
                close(false);
            }
        }
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        if (open) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [open, close]);
    return (
        <>
            {open && (
                <section
                    className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,.4)] backdrop-blur-[5px] z-[1001] overflow-y-auto mobile:px-2'
                    onClick={closeOutside ? handleClickOutside : undefined}
                >
                    <div
                        className=' absolute top-6 right-8 group hover:cursor-pointer'
                        onClick={handleCloseModal}
                    >
                        <i className='fa-solid fa-xmark-large text-2xl text-white group-hover:text-slate-200'></i>
                    </div>
                    <div
                        className='bg-white rounded-lg shadow-xl animate-modal mobile:w-full'
                        ref={modalRef}
                    >
                        <figure className=''>
                            <ImageCustom src={imgURL ?? ''} alt='preview' />
                        </figure>
                    </div>
                </section>
            )}
        </>
    );
};

ImagePreview.displayName = 'ImagePreview';
export default ImagePreview;
