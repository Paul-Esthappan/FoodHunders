import React, { useEffect, useState } from 'react'
import { publicRequest } from '../../axios/axios'
import { useLocation } from 'react-router-dom'
import Post from '../../components/posts/Post'
import TopNav from '../../components/TopNav/TopNav'
import MainNavbar from '../../components/MainNavbar'

const Search = () => {
    const [videos, setvideos] = useState([])
    const query = useLocation().search

    useEffect(() => {
        const fetchVideo = async () => {
            const responce = await publicRequest.get(`/video/search${query}`)
            console.log("query", query);
            setvideos(responce.data)
            console.log("res video",responce.data);
        };
        fetchVideo();
    },[query])
  return (
    <div className="flex">
      <div>
        <TopNav />
      </div>

      <div className="md:mt-[5%] md:fixed ">
        <MainNavbar />
      </div>
      <div className="md:w-[85%] w-full right-0 absolute mt-[5%] flex flex-col justify-center items-center">
        <div className=" flex justify-center flex-col">
          {videos.map((video) => {
            return (
              <Post
                userId={video.userId}
                yourVideoId={video._id}
                videoTitle={video.title}
                videoDecription={video.decription}
                videoThumbnail={video.thumbnail}
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

          {/* {
                  videos.map(video => {
                      <Post
                          
                        userId={video.userId}
                        yourVideoId={video._id}
                        videoTitle={video.title}
                        videoDecription={video.decription}
                        videoThumbnail={video.thumbnail}
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
                      />;
                  })
              } */}
        </div>
      </div>
    </div>
  );
}

export default Search