import { useState, useContext, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import { useForm } from "../utils/useForm";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

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

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      commentCount
      likeCount
    }
  }
`;

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const { values, loading, onChange, onSubmit, setLoading } = useForm(
    createPostCallback,
    {
      body: "",
    }
  );

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(cache, result) {
      const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
      const newData = { getPosts: [result.data.createPost, ...data.getPosts] };
      cache.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      values.body = "";
      setLoading(false);
      setShowModal(false);
    },
    onError(err) {
      values.body = "";
      console.log(err);
      setLoading(false);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

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

            {/* ADD POST Modal */}
            <div
              className={`py-12 bg-[#3d405b57] transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 animated ${
                showModal ? "flex fadeIn" : "hidden"
              }`}
            >
              <div className="mx-auto mt-12">
                <div className="relative w-[600px] py-8 px-5 md:px-10 bg-[#ffd46f] shadow-md rounded-xl border-[3px] border-[#ffffffc7]">
                  <h1 className="text-[#585a79] text-lg font-bold leading-tight mb-4 text-center tracking-wider">
                    ADD POST
                  </h1>
                  <form onSubmit={onSubmit}>
                    <textarea
                      className="mb-5 mt-2 py-2 h-[300px] text-gray-600 focus:outline-none focus:border-2 focus:border-[#b6bafb] font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="Share something..."
                      name="body"
                      onChange={onChange}
                      value={values.body}
                    />

                    {/* Submit button */}
                    <div className="flex items-center justify-center w-full">
                      <button
                        type="submit"
                        className={`focus:outline-none focus:ring-offset-2 transition duration-150 ease-in-out bg-[#585a79] rounded text-[#d9d9d9] px-8 py-2 text-md hover:bg-[#3e405b]`}
                        disabled={loading}
                      >
                        <div className="flex justify-center gap-2">
                          <span
                            className={`h-6 w-6 block rounded-full border-4 border-[#88819e] border-t-[#ffd46f] animate-spin ${
                              loading ? "" : "hidden"
                            }`}
                          ></span>
                          <span>{loading ? "LOADING..." : "Submit"}</span>
                        </div>
                      </button>
                    </div>
                  </form>

                  {/* Close button */}
                  <button
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

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
