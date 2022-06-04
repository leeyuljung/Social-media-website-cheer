import { useState, useContext, Fragment, useEffect } from "react";
import { Popover, Transition, Dialog } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "../context/auth";
import { Link, NavLink } from "react-router-dom";
import PostForm from "../components/PostForm";
import Avatar from "boring-avatars";

const menu = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "My Posts",
    href: "/myPosts",
  },
  {
    name: "Cheered Posts",
    href: "/cheeredPosts",
  },
];

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAddPostModal, setIsAddPostModal] = useState(false);
  const [showTokenExpiredNotify, setShowTokenExpiredNotify] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowTokenExpiredNotify(true);
    }
  }, [logout, user]);

  const onClick = () => {
    logout();
  };

  return (
    <Popover className="bg-[#3d405b]">
      <div className="max-w-7xl mx-auto px-6 sm:px-6">
        <div className="flex justify-between items-center border-gray-100 py-4 2xl:justify-start 2xl:space-x-10">
          {/* Logo */}
          <div className="">
            <NavLink to="/" className="!bg-transparent">
              <span className="text-[#ffd46f] hover:text-[#ffca4e] font-bold text-xl tracking-widest">
                Cheer :)
              </span>
            </NavLink>
          </div>

          <div className="flex items-center">
            {/* Mobile Add Post Button */}
            <button
              type="button"
              className=" inline-block 2xl:hidden px-1 pt-1 pb-1 mr-3 text-[#8b8eac] rounded hover:bg-[#ffd46f] hover:scale-105 active:bg-[#ffd46f] active:shadow-lg transition duration-200 ease-in-out scale-100 relative"
              onClick={() => setIsAddPostModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>

            {/* Mobile Menu Button */}
            <div className="-mr-2 -my-2 2xl:hidden">
              <Popover.Button className="bg-white rounded p-1 2xl:p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" />
              </Popover.Button>
            </div>
          </div>

          {/* Add Post Button & Log out */}
          <div className="hidden 2xl:flex items-center justify-end 2xl:flex-1 lg:w-0">
            <button
              type="button"
              className="px-3 pt-1 pb-1 mr-3 bg-[#dadbea] text-[#676a8c] font-bold text-sm leading-normal uppercase rounded hover:bg-[#ffd46f] hover:scale-105 active:bg-[#ffd46f] active:shadow-lg transition duration-200 ease-in-out flex align-center items-center scale-100 relative"
              onClick={() => setIsAddPostModal(true)}
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

            <PostForm
              isAddPostModal={isAddPostModal}
              setIsAddPostModal={setIsAddPostModal}
            />

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

      <Dialog
        open={showTokenExpiredNotify}
        onClose={() => setShowTokenExpiredNotify(false)}
        className="relative z-50"
      >
        <div className="fixed inset-x-7 inset-y-0 2xl:inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm rounded bg-[#fdf1e6] p-2 shadow-lg border-[5px] border-[#fff]">
            <Dialog.Title className="text-center bg-[#fddd9b] p-2 text-[#6e6c8b] font-bold tracking-wider">
              Notify
            </Dialog.Title>
            <Dialog.Description className="px-4 py-8 text-[#737595] text-center tracking-wide">
              Token is expired.
              <br />
              Please login again.
            </Dialog.Description>
            <div className="flex justify-center mb-3">
              <button
                className="bg-[#fff] text-[#686a8c] px-4 py-2 rounded-md mx-2 hover:bg-[#f8f8f8]"
                onClick={onClick}
              >
                OK
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Mobile Menu */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 left-auto right-0 w-[430px] max-w-full p-2 pt-16 transition transform origin-top-right 2xl:hidden z-50"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-0 pb-0 px-5">
              <div className="flex items-center justify-end">
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 w-8 h-8 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-0">
                <nav className="grid gap-y-8"></nav>
              </div>
            </div>
            <div className="flex items-center justify-center py-2">
              {/* 頭貼 */}
              <div>
                <Avatar size={50} name={user.username} variant="beam" />
              </div>
              {/* Username */}
              <div className="ml-3">
                <p className="text-base font-black text-[#676a8c]">
                  {user ? user.username : "Nobody"}
                </p>
              </div>
            </div>
            <div className="py-4 px-5 space-y-6">
              <div className="grid grid-cols-1 gap-y-2 gap-x-4">
                {menu.map((item) => (
                  <Popover.Button
                    key={item.name}
                    to={item.href}
                    as={NavLink}
                    className="text-base text-center text-[#63658f] py-1 rounded"
                  >
                    {item.name}
                  </Popover.Button>
                ))}
              </div>
              <div>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#63658f] hover:bg-[#3d405b]"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
