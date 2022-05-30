import { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

const CheerButton = ({ user: { username }, post: { id, likes } }) => {
  const [cheered, setCheered] = useState(false);

  useEffect(() => {
    if (likes && likes.find((like) => like.username === username)) {
      setCheered(true);
    } else {
      setCheered(false);
    }
  }, [likes, username]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-8 w-8 inline-block text-[#676a8c] bg-[transparent] rounded-full cursor-pointer hover:bg-[#fdd540] hover:animate-[bounce_0.8s_ease-in_0.3s_infinite] ${
        cheered ? "active-btn" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      onClick={likePost}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default CheerButton;
