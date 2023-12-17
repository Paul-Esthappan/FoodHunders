import React, { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { publicRequest, userRequest } from '../../axios/axios';
import ReactTimeago, { } from 'react-timeago'
import ToggleButton from '../toggleIcons/ToggleButton ';
import { useDispatch, useSelector } from 'react-redux';
import { dislike, like, nullLike } from '../../redux/videoSlice';
import VideoFrame from '../videoframe/videoFrame';
import Comments from '../Comments';
import Rating from './Rating';
import Avatar from '../Avater/Avatar';



const Post = ({
  userId,
  yourVideoId,
  videoTitle,
  videoDescription,
  thumbnailUrl,
  videoUrl,
  views,
  tags,
  likes,
  dislikes,
  location,
  recommendation,
  worth,
  taste,
  service,
  videoCreatedAt,
}) => {
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState("");
  const [loading, setLoading] = useState("");
  const [subbutton, setSubbutton] = useState("");
  const dispatch = useDispatch();
  const [Userlikes, setUserlikes] = useState(undefined);
  const [Userdislikes, setUserdislikes] = useState(undefined);
  const [commentUser, setcommentUser] = useState([]);
  const [videoIdis, setvideoIdis] = useState("");
  console.log("likess", likes, "diss", dislikes);

  const [saveToggle, setsaveToggle] = useState('')

  const currentLogedUser = useSelector((state) => state.auth.user._id);

  const handleVideoClick = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get(`/video/${yourVideoId}`);
      if (response.data) {
        setVideos(response.data);
      } else {
        // Handle error case
      }
    } catch (error) {
      // Handle error case
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (actionType, yourVideoId) => {
    try {
      if (actionType === "like") {
        await userRequest.put(`user/like/${yourVideoId}`);
        dispatch(like());
      } else if (actionType === "dislike") {
        await userRequest.put(`user/dislike/${yourVideoId}`);
        dispatch(dislike());
      } else if (actionType === "null") {
        await userRequest.put(`user/nullLikeVideo/${yourVideoId}`);
        dispatch(nullLike());
      }
    } catch (error) {
      // Handle error case
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await publicRequest.get(`/user/find/${currentLogedUser}`);
        setSubbutton(res.data.subscribedUsers.includes(userId));
        setsaveToggle(res.data.savedVideos.includes(yourVideoId));
        setUserlikes(likes.includes(currentLogedUser));
        setUserdislikes(dislikes.includes(currentLogedUser));
      } catch (error) {
        // Handle error case
      }
    };

    fetchCurrentUser();
  }, [userId, currentLogedUser, likes, dislikes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userRequest.get(`/user/find/${userId}`);
        setUser(response.data);
        setvideoIdis(yourVideoId);
      } catch (error) {
        // Handle error case
      }
    };

    fetchUser();
  }, [userId, yourVideoId]);

  const handleSubscribe = async () => {
    try {
      await userRequest.put(`/user/subscribe/${userId}`);
      setSubbutton(!subbutton);
    } catch (error) {
      // Handle error case
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await userRequest.put(`/user/unsubscribe/${userId}`);
      setSubbutton(!subbutton);
    } catch (error) {
      // Handle error case
    }
  };


  
  const saveVideo = async () => {
    try {
      await userRequest.put(`/user/save/${yourVideoId}`);
      setsaveToggle(!saveToggle);
    } catch (error) {
      // Handle error case
    }
  };

  
  const UnsaveVideo = async () => {
    try {
      await userRequest.put(`/user/unsave/${yourVideoId}`);
      setsaveToggle(!saveToggle);
    } catch (error) {
      // Handle error case
    }
  };
  return (
    <div key={yourVideoId} className={`w-full `}>
      <div className="bg-white w-full  md:w-full mx-auto p-1 md:p-8">
        <div className="border-b flex items-center">
          <Avatar className={"w-8 h-8"} userimage={user.image} />
          <div className="ml-4">
            <h2>{user.username}</h2>
            <p className="text-xs">
              {views} Views - <ReactTimeago date={videoCreatedAt} />
            </p>
          </div>
        </div>
        <div
          className="border-b pb-4 mb-4 w-[340px] h-[660px] "
          onClick={handleVideoClick}
        >
          <VideoFrame
            videoUrl={videoUrl}
            thumbnailUrl={thumbnailUrl}
            yourVideoId={yourVideoId}
            videoTitle={videoTitle}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <h3 className="font-bold px-2">
              {videoTitle} - {location}
            </h3>
            {!subbutton ? (
              <button
                onClick={handleSubscribe}
                className="bg-red-600 px-2 rounded-lg text-white "
              >
                Subscribe
              </button>
            ) : (
              <button
                onClick={handleUnsubscribe}
                className="bg-gray-200 px-2 rounded-lg text-white "
              >
                UnSubscribe
              </button>
            )}
            {!saveToggle ? (
              <button
                onClick={saveVideo}
                className="bg-green-300 px-2 rounded-lg text-white "
              >
                Save
              </button>
            ) : (
              <button
                onClick={UnsaveVideo}
                className="bg-green-300 px-2 rounded-lg text-white "
              >
                Unsave
              </button>
            )}
          </div>

          <p className="text-sm">{videoDescription}</p>
        </div>

        <div className="flex justify-evenly mt-1">
          <div className="flex flex-col justify-center items-center">
            <div>
              <ToggleButton
                currentVideoId={yourVideoId}
                onAction={handleAction}
                liked={Userlikes}
                disliked={Userdislikes}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-xs font-extralight">Likes - Dislike</p>
            <div>
              {Userlikes ? (
                <span className="text-green-500">{likes?.length}</span>
              ) : (
                likes?.length
              )}{" "}
              -{" "}
              {Userdislikes ? (
                <span className="text-red-500">{dislikes?.length}</span>
              ) : (
                dislikes?.length
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-xs font-extralight">Recommend</p>

            <div>
              <Rating rating={recommendation} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xs font-extralight">Worth</p>

            <div>
              <Rating rating={worth} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xs font-extralight">Taste</p>

            <div>
              <Rating rating={taste} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xs font-extralight">Service</p>

            <div>
              <Rating rating={service} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <Comments yourVideoId={videoIdis} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post