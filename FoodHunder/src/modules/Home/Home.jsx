import React, { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {menuItems, userStatusData} from './userdata'
import MainNavbar from '../../components/MainNavbar';
import TopNav from '../../components/TopNav/TopNav';
import Post from '../../components/posts/Post';
import axios from 'axios';
import {  userRequest } from '../../axios/axios';

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  

useEffect(() => {
  const fetchVideos = async () => {
    try {
      setLoading(true); 
      const response = await userRequest.get(`/video/${type}`);
      // Your existing code...

      if (response.data) {
        setVideos(response.data);
        console.log("resdaaa",response.data);
      } else {
        console.error("Response data is undefined");
      }
    } catch (error) {
      // Your existing error handling...
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  fetchVideos();
}, [type]);
  console.log(videos,"===============================");
  return (
    <div className="h-screen bg-white  w-screen  ">
      <div className="flex flex-col h-screen ">
        <div className="h-[5%] w-screen">
          <TopNav />
        </div>
        {/* <div className="h-[95%]  sticky grid grid-flow-row md:grid-flow-col"> */}
        <div className="h-[95%] flex  flex-col md:flex-row sticky overflow-scroll scrollbar-hide">
          <div className="w-0 md:w-[15%] md:h-full md:border-r md:border-gray-200 ">
            <MainNavbar />
          </div>
          <div className="mx-auto">
            <div className="h-full w-full bg-white overflow-scroll scrollbar-hide">
              {videos.map((video) => {
                return (
                  <Post
                    key={video._id}
                    userId={video.userId}
                    yourVideoId={video._id}
                    videoTitle={video.title}
                    videoDecription={video.decription}
                    thumbnailUrl={video.thumbnailUrl}
                    videoUrl={video.videoUrl}
                    views={video.views}
                    tags={video.tags}
                    likes={video.likes}
                    dislikes={video.dislikes}
                    location={video.location}
                    recommendation={video.recommendation}
                    worth={video.worth}
                    taste={video.taste}
                    service={video.service}
                    videoCreatedAt={video.createdAt}
                  />
                );
              })}
              {/* <video src={videos.videoUrl} controls autoPlay></video> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home