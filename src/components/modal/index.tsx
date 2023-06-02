'use client';

import { useEffect, useRef } from 'react';

type ModalProps = {
    title: string;
    children: React.ReactNode;
    open: boolean;
    close: (state: boolean) => void;
    closeOutside?: boolean;
};

const Modal: React.FC<ModalProps> = ({
    title,
    children,
    open,
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
                    className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-[5px] z-[1001] overflow-y-auto mobile:px-2'
                    onClick={closeOutside ? handleClickOutside : undefined}
                >
                    <div
                        className='bg-white rounded-lg shadow-xl animate-modal mobile:w-full mobile:mt-4'
                        ref={modalRef}
                    >
                        <div className='p-2 shadow-sm relative'>
                            <h3 className='text-lg font-medium text-center '>
                                {title}
                            </h3>
                            <div
                                className='w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center absolute right-3 top-1 hover:bg-slate-300 hover:cursor-pointer'
                                onClick={handleCloseModal}
                            >
                                <i className='fa-solid fa-xmark'></i>
                            </div>
                        </div>
                        {children}
                    </div>
                </section>
            )}
        </>
    );
};

Modal.displayName = 'Modal';
export default Modal;
