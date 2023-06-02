import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className='flex flex-col gap-1 w-full mb-4 bg-white z-50'>
            <Link
                href='/'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor: pathname === '/' ? '#e5e7eb' : '',
                    color: pathname === '/' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-duotone fa-grid-horizontal text-lg'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Dashboard
                </span>
            </Link>

            <Link
                href='/balances'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor: pathname === '/balances' ? '#e5e7eb' : '',
                    color: pathname === '/balances' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-wallet'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Quản lý số dư
                </span>
            </Link>

            <hr />

            <Link
                href='/payment/new'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/payment/new' ? '#e5e7eb' : '',
                    color: pathname === '/payment/new' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-credit-card'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Thanh toán mới
                </span>
            </Link>

            <hr />

            <h2 className='font-medium text-[#647081] text-[15px] ml-2 tablet:hidden'>
                NHẬN THANH TOÁN
            </h2>

            <Link
                href='/payment/paymentpages'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/payment/paymentpages' ? '#e5e7eb' : '',
                    color:
                        pathname === '/payment/paymentpages' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-memo'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    PayME page
                </span>
            </Link>

            <Link
                href='/payment/paymentlinks'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/payment/paymentlinks' ? '#e5e7eb' : '',
                    color:
                        pathname === '/payment/paymentlinks' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-link'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    PayME links
                </span>
            </Link>

            <Link
                href='/payment/paymentpos'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/payment/paymentpos' ? '#e5e7eb' : '',
                    color: pathname === '/payment/paymentpos' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-computer-classic'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    PayME POS
                </span>
            </Link>

            <Link
                href='/payment/paymentbutton'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/payment/paymentbutton' ? '#e5e7eb' : '',
                    color:
                        pathname === '/payment/paymentbutton' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-toggle-large-on'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    PayME Button
                </span>
            </Link>

            <Link
                href='/payment/subcription'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/payment/subcription' ? '#e5e7eb' : '',
                    color: pathname === '/payment/subcription' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-money-check'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    PayME Subcription
                </span>
            </Link>

            <Link
                href='/payment/payme-qr'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/payment/payme-qr' ? '#e5e7eb' : '',
                    color: pathname === '/payment/payme-qr' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-qrcode'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Mã QR
                </span>
            </Link>

            <h2 className='font-medium text-[#647081] text-[15px] ml-2 tablet:hidden'>
                CHUYỂN TIỀN/ THANH TOÁN
            </h2>

            <Link
                href='/payout'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor: pathname === '/payout' ? '#e5e7eb' : '',
                    color: pathname === '/payout' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-coins'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Payout
                </span>
            </Link>

            <h2 className='font-medium text-[#647081] text-[15px] ml-2 tablet:hidden'>
                QUẢN LÝ GIAO DỊCH
            </h2>

            <Link
                href='/transaction-manage'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/transaction-manage' ? '#e5e7eb' : '',
                    color: pathname === '/transaction-manage' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-clock'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Danh sách giao dịch
                </span>
            </Link>

            <Link
                href='/transaction/customer'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/transaction/customer' ? '#e5e7eb' : '',
                    color:
                        pathname === '/transaction/customer' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-user'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Khách hàng
                </span>
            </Link>

            <Link
                href='/transaction/report'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/transaction/report' ? '#e5e7eb' : '',
                    color: pathname === '/transaction/report' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-signal-bars'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Thống kê
                </span>
            </Link>

            <Link
                href='/transaction/settlements'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/transaction/settlements'
                            ? '#e5e7eb'
                            : '',
                    color:
                        pathname === '/transaction/settlements'
                            ? '#00be00'
                            : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-sharp fa-solid fa-square-sliders'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Đối soát
                </span>
            </Link>

            <Link
                href='/transaction/emails'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/transaction/emails' ? '#e5e7eb' : '',
                    color: pathname === '/transaction/emails' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-envelope'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Email/SMS
                </span>
            </Link>

            <h2 className='font-medium text-[#647081] text-[15px] ml-2 tablet:hidden'>
                CÀI ĐẶT
            </h2>

            <Link
                href='/configurations'
                className='flex items-center gap-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-all duration-300 text-[#272b41]'
                style={{
                    backgroundColor:
                        pathname === '/configurations' ? '#e5e7eb' : '',
                    color: pathname === '/configurations' ? '#00be00' : '',
                }}
            >
                <div className=' w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full'>
                    <i className='fa-solid fa-gear'></i>
                </div>
                <span className='flex-1 text-sm font-medium tablet:hidden'>
                    Cài đặt
                </span>
            </Link>
        </nav>
    );
};

export default NavBar;
