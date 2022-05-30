import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Dialog } from "@headlessui/react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DeleteButton = ({ postId, callback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(cache, result) {
      if (callback) {
        callback();
      }
      const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
      const newData = {
        getPosts: [...data.getPosts].filter((post) => post.id !== postId),
      };
      cache.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      setIsOpen(false);
    },
    variables: { postId },
  });

  return (
    <>
      <button
        className={`right-0 top-full w-[20px] h-[20px] p-2 scale-100 bg-[#ffd7a9] transition duration-300 hover:bg-[#ffc1c1] hover:scale-105 rounded-full !box-content  ${
          callback
            ? "shadow-none border-0"
            : "absolute mt-2 shadow-md border-2 border-white"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm rounded bg-[#fdf1e6] p-2 shadow-lg border-[5px] border-[#fff]">
            <Dialog.Title className="text-center bg-[#fddd9b] p-2 text-[#6e6c8b] font-bold tracking-wider">
              Delete
            </Dialog.Title>
            <Dialog.Description className="px-4 py-8 text-[#737595] text-center tracking-wide">
              Are you sure to delete this post?
            </Dialog.Description>
            <div className="flex justify-center mb-3">
              <button
                className="bg-[#fff] text-[#686a8c] px-4 py-2 rounded-md mx-2 hover:bg-[#f8f8f8]"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#d9dae3] text-[#686a8c] px-4 py-2 rounded-md mx-2 hover:bg-[#c8cadd]"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteButton;
