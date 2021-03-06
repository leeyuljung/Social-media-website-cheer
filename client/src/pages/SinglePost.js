import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import CheerButton from "../components/CheerButton";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import Skeleton from "react-loading-skeleton";

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const { data: { getPost: post } = { getPost: {} } } = useQuery(
    FETCH_POST_QUERY,
    {
      variables: {
        postId: postId,
      },
    }
  );

  const { data: { getPosts: posts } = { getPosts: [] } } =
    useQuery(FETCH_POSTS_QUERY);

  const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(cache, result) {
      setComment("");
    },
    variables: { postId, body: comment },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  useEffect(() => {
    if (!posts.find((post) => post.id === postId)) {
      navigate("/");
    }
  }, [navigate, postId, posts]);

  function deleteCallback() {
    navigate("/");
  }

  let postMarkup;
  if (Object.keys(post).length === 0) {
    postMarkup = (
      <div className="mt-2">
        <Skeleton
          className="mt-2"
          count={3}
          baseColor="#a3a5c0"
          highlightColor="#fddd9b"
        />
      </div>
    );
  } else {
    const {
      id,
      username,
      body,
      createdAt,
      likes,
      likeCount,
      comments,
      commentCount,
    } = post;

    postMarkup = (
      <>
        {/* Post Content */}
        <div className="flex flex-col 2xl:flex-row items-center 2xl:items-start rounded-lg rounded-b-none border border-gray-200/80 bg-[#dadbea] p-6">
          {/* User Avatar */}
          <div className="relative">
            <Avatar size={60} name={username} variant="beam" />
          </div>

          <div className="flex flex-col flex-grow p-0 2xl:px-6 w-full 2xl:w-auto items-center 2xl:items-start">
            {/* Created Time */}
            <div className="my-2 mx-auto text-center 2xl:mx-[unset]">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-500/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm">
                  <span className="mr-3 text-[#686a8c]">
                    {moment(createdAt).format("L")}
                  </span>
                  <span className="text-gray-500/80">
                    {moment(createdAt).format("LTS")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 pb-4 flex flex-row items-center space-x-2 border-b border-dashed border-[#aaa]">
              {/* Cheers Count */}
              <div className="flex py-1 px-3 2xl:py-2 2xl:px-4 items-center justify-center rounded-md bg-white">
                <div className="flex flex-row items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 2xl:h-6 2xl:w-6 inline-block mr-2 text-gray-500/95"
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
                  <span className="font-bold text-[#686a8c] text-sm 2xl:text-base">
                    {likeCount}
                  </span>
                  <div className="ml-2 text-sm text-gray-400 hidden 2xl:inline-block">
                    Cheers
                  </div>
                </div>
              </div>
              {/* Comments Count */}
              <div className="flex py-1 px-3 2xl:py-2 2xl:px-4 items-center justify-center rounded-md bg-white">
                <div className="flex flex-row items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 2xl:h-6 2xl:w-6 mr-2 text-gray-500/95 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>

                  <span className="font-bold text-[#686a8c] text-sm 2xl:text-base">
                    {commentCount}
                  </span>
                </div>

                <div className="ml-2 text-sm text-gray-400 hidden 2xl:inline-block">
                  Comments
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="my-4 text-[#676a8c] self-start 2xl:self-auto break-all text-sm 2xl:text-base">
              {body}
            </div>
          </div>

          <div className="flex flex-col items-end justify-start">
            <div className="flex flex-row items-center space-x-3">
              {/* Cheer Button */}
              <CheerButton user={user} post={{ id, likes }} />

              {/* Delete Button */}
              {user.username === username && (
                <DeleteButton postId={id} callback={deleteCallback} />
              )}
            </div>
          </div>
        </div>

        {/* Create Comment Form */}
        <div>
          <form onSubmit={onSubmit} className="flex">
            <textarea
              type="text"
              name="comment"
              rows={1}
              placeholder="Leave your comments ..."
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full py-2 px-2 text-[#3d405b] border-2 border-transparent transition duration-500 min-h-[44px] max-h-[100px] focus:outline-none focus:border-[#b7a8e8] text-sm 2xl:text-base"
            />
            <button
              type="submit"
              className="px-3 bg-[#fddd9b] text-[#686a8c] hover:bg-[#ffcd69] transition duration-300 text-xs 2xl:text-base"
              disabled={comment.trim() === ""}
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Comments Area */}
        <div className="bg-[#686a8c] text-black px-4 py-4 pb-12 2xl:pb-4 rounded-lg rounded-t-none h-fit 2xl:max-h-[470px] overflow-y-auto">
          {commentCount === 0 && (
            <p className="text-[#dfdfdf] text-center">No comment yet</p>
          )}
          {comments &&
            comments.map((comment) => (
              <div className="flex my-3" key={comment.id}>
                <div className="w-[40px] mr-3">
                  <Avatar size={40} name={comment.username} variant="beam" />
                </div>
                <div className="mr-2">
                  <p className="bg-[#fcf1e8] rounded-lg px-4 py-2 text-[#676a8c] w-fit text-sm 2xl:text-base">
                    {comment.body}
                  </p>
                  <div className="text-sm mt-2">
                    <span className="mr-3 text-[#9395ae] 2xl:text-[#fddd9b]">
                      {moment(comment.createdAt).format("L")}
                    </span>
                    <span className="text-[#a9b3cb]">
                      {moment(comment.createdAt).format("LTS")}
                    </span>
                  </div>
                </div>
                {user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
              </div>
            ))}
        </div>
      </>
    );
  }

  return (
    <div className="w-full 2xl:w-7/12 px-4 py-4 mx-0 2xl:mx-4 rounded-xl bg-[#ffffff58] box-border h-[100vh] 2xl:h-fit overflow-auto">
      {postMarkup}
    </div>
  );
};

export default SinglePost;
