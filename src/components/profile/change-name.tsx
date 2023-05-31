import { auth } from '@/firebase/config';
import { setUser } from '@/redux/slice/userSlice';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

type Props = {
    close: () => void;
};

const ChangeDisplayName: React.FC<Props> = ({ close }) => {
    const distpatch = useDispatch();
    const [name, setName] = useState<string>('');

    const HANDLE = {
        changeDisplayName: async () => {
            if (!name) {
                swal('Vui lòng nhập tên hiển thị', '', 'error');
                return;
            }
            const user: any = auth.currentUser;

            await updateProfile(user, {
                displayName: name,
            })
                .then(() => {
                    distpatch(
                        setUser({
                            uid: user?.uid,
                            email: user?.email,
                            displayName: name,
                            emailVerified: user?.emailVerified,
                        })
                    );
                    swal('Đổi tên hiển thị thành công', '', 'success').then(
                        () => {
                            close();
                        }
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    };

    return (
        <div className='w-[550px] p-4'>
            <div className='mb-[15px]'>
                <div className='flex items-center justify-between'>
                    <label className='text-[15px] mb-1'>Tên hiển thị</label>
                </div>
                <div className=' relative w-full flex items-center justify-center'>
                    <input
                        type='text'
                        value={name}
                        placeholder='Nhập tên hiển thị'
                        className='text-[15px] p-[5px] pl-[10px] w-full h-[50px] outline-none bg-[#eff2f7] rounded-xl'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            <button
                className='h-[50px] flex items-center justify-center w-full outline-primary bg-primary text-white rounded-xl text-lg hover:bg-primaryHover'
                onClick={HANDLE.changeDisplayName}
            >
                Đổi tên hiển thị
            </button>
        </div>
    );
};

ChangeDisplayName.displayName = 'ChangeDisplayName';
export default ChangeDisplayName;
