import { ReactNode } from 'react';
import Header from '../header';
import NavBar from '../navbar';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

export default DefaultLayout;

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header className='w-full h-[50px] fixed top-0 right-0 left-0 flex items-center shadow-sm px-5 z-50 bg-white'>
                <Header />
            </header>
            <section className='flex items-start max-h-screen w-full'>
                <div className='w-[22%] tablet:w-auto'>
                    <aside className='pt-[64px] pl-2 border-r pr-3 fixed overflow-auto h-full w-[22%] tablet:w-auto bg-white'>
                        <NavBar />
                    </aside>
                </div>
                <article className='flex-1 pt-[64px] p-4 tablet:pl-[75px]'>
                    {children}
                </article>
            </section>
        </>
    );
};

export { MainLayout };
