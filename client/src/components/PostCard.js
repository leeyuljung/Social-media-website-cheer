import React, { useContext } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import moment from "moment";
import { AuthContext } from "../context/auth";
import Avatar from "boring-avatars";
import CheerButton from "./CheerButton";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

const PostCard = ({ posts }) => {
  const { user } = useContext(AuthContext);

  return (
    <VerticalTimeline lineColor="#ffffffa6">
      {posts.map(
        ({ id, username, createdAt, body, likeCount, commentCount, likes }) => (
          <VerticalTimelineElement
            key={id}
            className="vertical-timeline-element--work relative"
            contentStyle={{ background: "#fff", color: "#676a8c" }}
            contentArrowStyle={{ borderRight: "7px solid #fff" }}
            date={moment(createdAt).format("LT")}
            iconStyle={{
              background: "transparent",
              color: "#fff",
            }}
            icon={<Avatar name={username} variant="beam" />}
          >
            {/* Post Date */}
            <h4 className="vertical-timeline-element-subtitle">
              {moment(createdAt).format("L")}
            </h4>

            {/* Post Body */}
            <p>{body}</p>

            <div className="flex justify-between items-center border-t border-dashed pt-3 mt-4">
              {/* Post like and comment counts */}
              <Link
                className="flex p-1 rounded-md cursor-pointer bg-white hover:bg-[#e7e8f8] transition"
                to={`/post/${id}`}
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
                  <span>{likeCount}</span>
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
                  <span>{commentCount}</span>
                </div>
              </Link>

              {/* Like Button */}
              <CheerButton user={user} post={{ id, likes }} />
            </div>

            {/* Delete Button */}
            {user.username === username ? <DeleteButton postId={id} /> : null}
          </VerticalTimelineElement>
        )
      )}
    </VerticalTimeline>
  );
};

export default PostCard;
