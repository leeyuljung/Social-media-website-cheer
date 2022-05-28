import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Avatar from "boring-avatars";

const SideMenu = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="w-[300px] h-fit pb-2 shadow-md bg-[#ffffff91] rounded-lg tracking-wider">
      <div className="pt-4 pb-2 px-6">
        <div className="flex items-center">
          {/* 頭貼 */}
          <div>
            <Avatar size={80} name={user.username} variant="beam" />
          </div>
          {/* Username */}
          <div className="ml-3">
            <p className="text-base font-black text-[#676a8c]">
              {user ? user.username : "Nobody"}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <ul className="px-4">
        <li>
          <NavLink
            to="/"
            className="flex items-center text-base font-bold py-4 px-6 h-12 mb-1 text-[#676a8c] rounded hover:bg-[#c8c9dc] transition duration-300 ease-in-out translate-x-0 hover:translate-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/myPosts"
            className="flex items-center text-base font-bold py-4 px-6 h-12 mb-1 text-[#676a8c] rounded hover:bg-[#c8c9dc] transition duration-300 ease-in-out translate-x-0 hover:translate-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>My Posts</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cheeredPosts"
            className="flex items-center text-base font-bold py-4 px-6 h-12 mb-1 text-[#676a8c] rounded hover:bg-[#c8c9dc] transition duration-300 ease-in-out translate-x-0 hover:translate-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Cheered Posts</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
