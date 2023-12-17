import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav/TopNav";
import MainNavbar from "../../components/MainNavbar";
import { useSelector } from "react-redux";
import { userRequest } from "../../axios/axios";
import Post from "../../components/posts/Post";


import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avater/Avatar";
import UploadProfileImg from "../uploadFile/UploadProfileImg";
import { FaUserEdit } from "react-icons/fa";
import Edit from "./Edit";

const ProfilePage = () => {
   
  const   userData = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [Videos, setVideos] = useState([]);
  const navigate = useNavigate();
  console.log("userdata", userData);
  const [openUpload, setopenUpload] = useState(false)
  
 
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await userRequest.get(`/video/findUserVideos`);

        console.log("resdata", response.data);

        if (Array.isArray(response.data)) {
          setVideos(response.data);
        } else {
          console.error("Invalid response data format");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  console.log("Videos", Videos); // Log the Videos array for debugging


  return (
    <div className="w-screen h-screen ">
      <div>
        <div className="w-full h-[8%] bg-gray-200">
          <TopNav />
        </div>
        <div className=" w-screen h-[95%] bottom-0 ">
          <div className="w-screen h-full   flex flex-col md:flex-row overflow-hidden ">
            <div className="md:w-[18%] md:h-full overflow-hidden ">
              <MainNavbar />
            </div>
            <div className="overflow-scroll w-screen h-screen">
              <div className="w-full mt-[5%] ">
                <div className="w-full md:w-full md:right-0 ">
                  <div className="bg-gray-200 rounded-lg my-2">
                    <div className="p-10 flex justify-center ">
                      <div className="p-5 flex flex-col justify-center items-center ">
                        <div className="w-28 h-28">
                          <Avatar
                            userimage={userData.image}
                            className="w-28 h-28"
                            showEditIcon={true}
                          />
                        </div>

                        <div>
                          <h1 className="text-lg font-extrabold font-mono p-4">
                            {userData.username}
                          </h1>
                        </div>
                        <div className="flex justify-center items-center ">
                          <div className="flex flex-col justify-center items-center">
                            <h3 className="text-base font-normal font-mono px-2">
                              Subscribers
                            </h3>
                            <h3 className="text-base font-normal font-mono">
                              {" "}
                              {userData.subscribers
                                ? userData.subscribers.length
                                : 0}
                            </h3>
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <h3 className="text-base font-normal font-mono">
                              Subscribed
                            </h3>
                            <h3 className="text-base font-normal font-mono">
                              {" "}
                              {userData.subscribedUsers
                                ? userData.subscribedUsers.length
                                : 0}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 flex flex-col justify-center ">
                        <h3 className="text-base font-normal font-mono">
                          {userData.email}
                        </h3>
                        <h3 className="text-base font-normal font-mono">
                          {userData.phonenumber}
                        </h3>
                        <h3 className="text-base font-normal font-mono">
                          {userData.dob}
                        </h3>
                        <h3 className="text-base font-normal font-mono">
                          {userData.gender}
                        </h3>
                        <h3 className="text-base font-normal font-mono">
                          {userData.country}
                        </h3>
                      </div>
                    </div>
                    <div className="flex justify-end px-10 py-5">
                      <button
                        className="bg-gray-600 px-10 rounded-lg text-white"
                        onClick={() => {
                          setopenUpload(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-[40%] w-full bg-slate-50 overflow-scroll ">
                  <div>
                    <h1>Videos</h1>
                  </div>
                  <div className="flex flex-col">
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      Videos.map((video) => (
                        <div key={video._id} className="bg-white flex flex-col justify-center mx-auto my-1">
                          <div className="flex justify-end">
                            <button
                              className="bg-red-500 mx-4 px-4 flex justify-end mt-4"
                              onClick={() => {
                                navigate(`/singleVideo/${video._id}`);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                          <div className="flex justify-center">
                            <Post
                              userId={video.userId}
                              yourVideoId={video._id}
                              videoTitle={video.title}
                              videoDescription={video.description}
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
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div>comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="w-full h-[5%] bg-gray-200 ">
        <div className="bg-gray-200"></div>
        <div className="w-full h-[95%] mt-[4%]">
          <div className="md:w-[10%] h-full md:left-0 md:absolute  ">
            <MainNavbar />
          </div>
          <div className="md:w-[85%] h-full md:right-0 md:absolute  bg-white p-8 rounded shadow-md">
            
            <div className="p-10 flex justify-center mt-5 bg-gray-200  ">
              <div className="p-5 flex flex-col bg-gray-300 rounded-lg my-2">
                <div>
                  <h1>Videos</h1>
                </div>
                <div className="grid grid-col-2 grid-flow-col">
                  
                </div>
              </div>
              <div className="p-5 flex flex-col bg-gray-200 rounded-lg my-2">
                Comment
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {openUpload ? <Edit setopenUpload={setopenUpload} /> : ""}
    </div>
  );
};

export default ProfilePage;
