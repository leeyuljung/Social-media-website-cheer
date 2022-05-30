import { useState, useContext } from "react";
import { useForm } from "../utils/useForm";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

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

const PostForm = ({ showModal, setShowModal }) => {
  const { logout } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { values, loading, onChange, onSubmit, setLoading } = useForm(
    createPostCallback,
    {
      body: "",
    }
  );

  if (!showModal) {
    values.body = "";
    if (error) {
      setError("");
    }
  }

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(cache, result) {
      const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
      const newData = { getPosts: [result.data.createPost, ...data.getPosts] };
      cache.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      setLoading(false);
      setShowModal(false);
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
      setLoading(false);
      if (err.graphQLErrors[0].message === "Invalid/Expired token") {
        logout();
      }
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return (
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
              className={`mb-5 mt-2 py-2 h-[300px] text-gray-600 focus:outline-none focus:border-2 focus:border-[#b6bafb] font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border ${
                error ? "border-[#ffa718]" : ""
              }`}
              placeholder="Share something..."
              name="body"
              onChange={onChange}
              value={values.body}
            />

            {error && (
              <ul className="bg-[#fcb09b94] px-8 py-4 my-6 rounded-lg opacity-100 transition duration-500 text-[#585a79] border-2 border-solid border-[#ffffff85] shadow-md">
                <li>{error}</li>
              </ul>
            )}

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
  );
};

export default PostForm;
