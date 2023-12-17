import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { userRequest } from '../axios/axios'
import { fetchSuccess } from '../redux/videoSlice'
import Post from './posts/Post'

export const Video = () => {

    const [channel, setchannel] = useState({})
    const  currentUser  = useSelector(state =>  state.auth.user )
    const  currentVideo  = useSelector(state =>  state.video.currentVideo );
    const dispatch = useDispatch();
   
    console.log("currentUser", currentUser, "2ns", currentVideo);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
              const videoRes = await userRequest.get(`video/find/${currentVideo._id}`)
              const channelRes = await userRequest.get(`video/find/${videoRes.userId}`);
              setchannel(channelRes.data)
              dispatch(fetchSuccess(videoRes.data))
          } catch (error) {
           console.log(error); 
          }
        }
        fetchData()
    }, [dispatch])
    

  return (
    <div>
      <div>
        <div>
          <Post
            id={currentVideo.userId}
            key={currentVideo._id}
            videoTitle={currentVideo.title}
            videoDescription={currentVideo.description}
            videoThumbnail={currentVideo.thumbnail}
            videoUrl={currentVideo.videoUrl}
            views={currentVideo.views}
            tags={currentVideo.tags}
            likes={currentVideo.likes}
            dislikes={currentVideo.dislikes}
            location={currentVideo.location}
            recommendation={currentVideo.recommendation}
            worth={currentVideo.worth}
            taste={currentVideo.taste}
            service={currentVideo.service}
            videoCreatedAt={currentVideo.createdAt}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
