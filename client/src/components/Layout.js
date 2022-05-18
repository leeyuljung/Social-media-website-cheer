import Header from './Header';
import SideMenu from './SideMenu';
import Notifications from './Notifications';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return(
        <>
            <Header />
            <div className='w-[1500px] mt-8 mx-auto flex'>
                <SideMenu />
                <Outlet />
                <Notifications />
            </div>
        </>
    )
}

export default Layout;