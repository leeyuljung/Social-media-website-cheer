import React, { useContext } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import moment from "moment";
import { AuthContext } from "../context/auth";
import Avatar from "boring-avatars";

const PostCard = ({ posts }) => {
  const { user } = useContext(AuthContext);
  const showComments = (id) => {
    console.log(`Show comments of post(${id})`);
  };

  const deletePost = () => {
    console.log("Delete Post");
  };

  return (
    <VerticalTimeline lineColor="#ffffffa6">
      {posts.map((post) => (
        <VerticalTimelineElement
          key={post.id}
          className="vertical-timeline-element--work relative"
          contentStyle={{ background: "#fff", color: "#676a8c" }}
          contentArrowStyle={{ borderRight: "7px solid #fff" }}
          date={moment(post.createdAt).format("LT")}
          iconStyle={{
            background: "transparent",
            color: "#fff",
          }}
          icon={<Avatar name={post.username} variant="beam" />}
        >
          {/* Post Date */}
          <h4 className="vertical-timeline-element-subtitle">
            {moment(post.createdAt).format("L")}
          </h4>

          {/* Post Body */}
          <p>{post.body}</p>

          {/* Post like and comment counts */}
          <div className="flex justify-between items-center border-t border-dashed pt-3 mt-4">
            <div
              className="flex p-1 rounded-md cursor-pointer bg-white hover:bg-[#e7e8f8] transition"
              onClick={(e) => showComments(post.id)}
            >
              {/* like counts */}
              <div className="flex items-center mr-3 pr-3 border-r border-[#dad9dc] border-dashed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 inline-block"
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
                <span>{post.likeCount}</span>
              </div>
              {/* comment counts */}
              <div className="flex items-center mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-[#676a8c] inline-block"
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
                <span>{post.commentCount}</span>
              </div>
            </div>

            {/* Like Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 inline-block text-[#676a8c] bg-[#fff] rounded-full cursor-pointer hover:bg-[#fdd540] hover:animate-[bounce_0.8s_ease-in_0.3s_infinite]"
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
          </div>

          {/* Delete Button */}
          {user.username === post.username ? (
            <button
              className="absolute right-0 top-full mt-2 w-[20px] h-[20px] p-2 scale-100 bg-[#ffd7a9] transition duration-300 hover:bg-[#ffc1c1] hover:scale-105 border-2 border-white rounded-full !box-content shadow-md"
              onClick={deletePost}
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
          ) : null}
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default PostCard;
