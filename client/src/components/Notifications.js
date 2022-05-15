import React from 'react';

const Notifications = () => {
	return(
		<div className="w-[450px] h-fit pb-4 shadow-md bg-[#ffffff91] rounded-lg tracking-wider">
      <div className="pt-4 pb-2 px-6">
        <div>
          <div className="ml-3">
            <p className=" text-lg text-center font-black text-[#676a8c]">Notifications</p>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="mx-4">
        <div className="px-3 py-2 mb-1 rounded bg-[#ffd36da8] border border-[#ccc] border-dashed">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-[#676a8c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#787b9c] text-base mb-4">Someone is cheering for you!</span>
          </div>
          <p className=" text-gray-400 text-xs">2 mins ago</p>
        </div>
        <div className="px-3 py-2 mb-1 rounded bg-[#dadbea] border border-[#ccc] border-dashed">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-[#676a8c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-[#787b9c] text-base mb-4">Someone replied to your post!</span>
          </div>
          <p className=" text-gray-400 text-xs">3 mins ago</p>
        </div>
        <div className="px-3 py-2 mb-1 rounded bg-[#ffd36da8] border border-[#ccc] border-dashed">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-[#676a8c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#787b9c] text-base mb-4">Someone is cheering for you!</span>
          </div>
          <p className=" text-gray-400 text-xs">10 mins ago</p>
        </div>
      </div>
    </div>
	)
}

export default Notifications;