import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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
        username
      }
      commentCount
      likeCount
    }
  }
`;

const Home = () => {
  const { data: { getPosts: posts } = { getPosts: [] }, loading } =
    useQuery(FETCH_POSTS_QUERY);

  return (
    <div className="w-8/12 h-[800px] overflow-y-scroll overflow-x-hidden px-2 py-6 mx-4 rounded-xl bg-[#ffffff58]">
      {loading ? "loading..." : <PostCard posts={posts} />}
    </div>
  );
};

export default Home;
