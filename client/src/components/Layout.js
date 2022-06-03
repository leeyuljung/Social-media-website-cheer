import Header from "./Header";
import SideMenu from "./SideMenu";
import Notifications from "./Notifications";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="w-full 2xl:w-[1500px] 2xl:my-4 2xl:mt-8 mx-auto flex">
        <SideMenu />
        <Outlet />
        <Notifications />
      </div>
    </>
  );
};

export default Layout;
