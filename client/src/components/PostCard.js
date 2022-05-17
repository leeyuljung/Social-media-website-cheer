import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import moment from 'moment';

const PostCard = ({ posts }) => {
    const showComments = (id) => {
        console.log(`Show comments of post(${id})`);
    }

    return( 
        <VerticalTimeline lineColor='#ffffffa6'>
        {
            posts.map(post => (
                <VerticalTimelineElement
                    key={ post.id }
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#fff', color: '#676a8c' }}
                    contentArrowStyle={{ borderRight: '7px solid #fff' }}
                    date={moment(post.createdAt).format('LT')}
                    iconStyle={{ background: 'transparent', color: '#fff' }}
                    icon={<img src="https://i.imgur.com/u2xDgkr.jpg" alt="test" className='rounded-full bg-white'/>}
                >
                    <h4 className="vertical-timeline-element-subtitle">{ moment(post.createdAt).format('L') }</h4>
                    <p>{ post.body }</p>
                    <div className="flex justify-between items-center border-t border-dashed pt-3 mt-4">
                        <div className="flex p-1 rounded-md cursor-pointer bg-white hover:bg-[#e7e8f8] transition" onClick={ (e) => showComments(post.id) }>
                            <div className="flex items-center mr-3 pr-3 border-r border-[#dad9dc] border-dashed">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{ post.likeCount }</span>
                            </div>
                            <div className="flex items-center mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#676a8c] inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>{ post.commentCount }</span>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block text-[#676a8c] bg-[#fff] rounded-full cursor-pointer hover:bg-[#fdd540] hover:animate-[bounce_0.8s_ease-in_0.3s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </VerticalTimelineElement>
            ))
        }
        </VerticalTimeline>
    )
}

export default PostCard;