import React from "react";
import { useQuery } from "@apollo/react-hooks";
import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const Home = () => {
  const { data: { getPosts: posts } = { getPosts: [] }, loading } =
    useQuery(FETCH_POSTS_QUERY);

  return (
    <div className="w-full 2xl:w-7/12 h-[100vh] 2xl:h-[800px] overflow-y-scroll overflow-x-hidden px-2 py-6 my-0 mx-auto 2xl:mx-4 rounded-xl bg-[#ffffff58]">
      {loading ? "loading..." : <PostCard posts={posts} />}
    </div>
  );
};

export default Home;
