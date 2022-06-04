import { useState, useContext } from "react";
import { useForm } from "../utils/useForm";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { Dialog } from "@headlessui/react";

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

const PostForm = ({ isAddPostModal, setIsAddPostModal }) => {
  const { logout } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { values, loading, onChange, onSubmit, setLoading } = useForm(
    createPostCallback,
    {
      body: "",
    }
  );

  if (!isAddPostModal) {
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
      setIsAddPostModal(false);
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
    <Dialog
      open={isAddPostModal}
      onClose={() => setIsAddPostModal(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-[#3d405b57]">
        <Dialog.Panel className="w-[90%] 2xl:w-[750px] rounded bg-[#fdf1e6] p-2 shadow-lg border-[5px] border-[#fff]">
          <Dialog.Title className="text-center bg-[#fddd9b] p-2 text-[#6e6c8b] font-bold tracking-wider">
            ADD POST
          </Dialog.Title>
          <Dialog.Description className="px-1 2xl:px-4 py-2 2xl:py-8 text-[#737595] text-center tracking-wide">
            <form onSubmit={onSubmit}>
              <textarea
                className={`mb-5 mt-2 py-2 h-[200px] 2xl:h-[300px] min-h-[44px] max-h-[200px] 2xl:max-h-[300px] text-gray-600 focus:outline-none focus:border-2 focus:border-[#b6bafb] font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border ${
                  error ? "border-[#ffa718]" : ""
                }`}
                placeholder="Share something..."
                name="body"
                onChange={onChange}
                value={values.body}
              />

              {error && (
                <ul className="bg-[#fcb09b94] px-8 py-2 2xl:py-4 my-6 rounded-lg opacity-100 transition duration-500 text-[#585a79] border-2 border-solid border-[#ffffff85] shadow-md text-sm 2xl:text-base">
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
                    <span className="text-sm 2xl:text-base">
                      {loading ? "LOADING..." : "Submit"}
                    </span>
                  </div>
                </button>
              </div>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PostForm;
