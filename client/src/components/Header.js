import { useState, useContext, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";

// const menu = [
//   {
//     name: "Home",
//     href: "#",
//   },
//   {
//     name: "Add Post",
//     href: "#",
//   },
//   {
//     name: "My Posts",
//     href: "#",
//   },
//   {
//     name: "Liked Posts",
//     href: "#",
//   },
// ];

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <Popover className="bg-[#3d405b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-gray-100 py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <button>
              <span className="text-[#ffd46f] font-bold text-xl tracking-widest">
                Cheer :)
              </span>
            </button>
          </div>
          {/* 手機 Menu 按鈕 */}
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              type="button"
              className="px-3 pt-1 pb-1 mr-3 bg-[#dadbea] text-[#676a8c] font-bold text-sm leading-normal uppercase rounded hover:bg-[#ffd46f] hover:scale-105 active:bg-[#ffd46f] active:shadow-lg transition duration-200 ease-in-out flex align-center items-center scale-100 relative"
              onClick={() => setShowModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add Post
            </button>

            <PostForm showModal={showModal} setShowModal={setShowModal} />

            <Link
              to="/login"
              className="whitespace-nowrap text-base font-medium text-gray-400 hover:text-gray-300"
              onClick={logout}
            >
              Log out
            </Link>
          </div>
        </div>
      </div>

      {/* <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-0 px-5">
              <div className="flex items-center justify-end">
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-4">
                <nav className="grid gap-y-8">
                </nav>
              </div>
            </div>
            <div className="py-4 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {menu.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className=" text-lg font-bold text-center text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#63658f] hover:bg-[#3d405b]" >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition> */}
    </Popover>
  );
};

export default Header;
