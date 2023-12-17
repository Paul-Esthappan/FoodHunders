import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { publicRequest, userRequest } from "../axios/axios";
import { fetchSuccess } from "../redux/videoSlice";
import Post from "./posts/Post";
import EditVideo from "../modules/uploadFile/EditVideo";




export const SingleVideo = () => {
  const [channel, setChannel] = useState({});
  const [videoRes, setVideoRes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate=useNavigate()

  const currentuser = useSelector((state) => state.auth.user._id)
  const [opensetUpload, setopensetUpload] = useState(false);
 

  const { id } = useParams();
  console.log("videoid", id);
  
  const videoid = id
  console.log("v iidd ",videoid);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const videoResponse = await publicRequest.get(`video/find/${videoid}`);
        console.log("idd",id);
        const channelResponse = await publicRequest.get(
          `user/find/${videoResponse.data.userId}`
        );

        setChannel(channelResponse.data);
          if (currentuser === channelResponse) {
            setdeleteButtonToggle(true);
          }
        setVideoRes(videoResponse.data);
        console.log("videores",videoRes);
        dispatch(fetchSuccess(videoResponse.data));
      } catch (error) {
        console.error(error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handelEdit = () => {
    setopensetUpload(!opensetUpload)
  }


  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-end">
        <button className="p-4" onClick={()=>{navigate('/')}}>close X</button>
      </div>
      <div className="flex justify-center">
        {videoRes && (
          <div>
            {currentuser ? (
              <div className="mt-5 flex justify-end ">
                <button
                  onClick={handelEdit}
                  className="bg-gray-400 flex justify-end mx-10 px-5"
                >
                  Edit
                </button>
              </div>
            ) : (
              ""
            )}
            <Post
              id={videoRes.userId}
              userId={videoRes.userId}
              key={videoRes._id}
              yourVideoId={videoRes.userId}
              videoTitle={videoRes.title}
              videoDescription={videoRes.description}
              thumbnailUrl={videoRes.thumbnailUrl}
              videoUrl={videoRes.videoUrl}
              views={videoRes.views}
              tags={videoRes.tags}
              likes={videoRes.likes}
              dislikes={videoRes.dislikes}
              location={videoRes.location}
              recommendation={videoRes.recommendation}
              worth={videoRes.worth}
              taste={videoRes.taste}
              service={videoRes.service}
              videoCreatedAt={videoRes.createdAt}
            />
          </div>
        )}
        {opensetUpload ? (
          <EditVideo
            setopensetUpload={setopensetUpload}
            id={id}
            videofilename={videoRes.videofilename}
            thumbnailfilename={videoRes.thumbnailfilename}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
