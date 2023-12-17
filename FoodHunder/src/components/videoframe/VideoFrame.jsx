import React, { useEffect, useState } from "react";
import { publicRequest } from "../../axios/axios";
import { getStorage } from "firebase/storage";

const VideoFrame = ({ videoUrl, thumbnailUrl, videoTitle, yourVideoId }) => {
  const storage = getStorage();
  const [videoToggle, setVideoToggle] = useState(true);

  const handleVideoToggle = async () => {
    const res = await publicRequest.put(`/video/view/${yourVideoId}`);
    console.log("res.data", res.data);
    setVideoToggle(!videoToggle);
  };

  useEffect(() => {
    const iframe = document.getElementById("videoFrame");
    let isScrolling;

    const handleScroll = () => {
      console.log("Scrolling");
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        console.log("Checking iframe visibility");
        const rect = iframe.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          console.log("Iframe is in the viewport");
          console.log("Iframe ContentWindow:", iframe.contentWindow);
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      }, 200); // Adjust the delay as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`flex w-full h-full justify-center`}>
      {videoToggle ? (
        <div onClick={handleVideoToggle}>
          <img src={thumbnailUrl} alt={videoTitle} className="w-full h-full" />
        </div>
      ) : (
        <div className={`flex w-full h-full justify-center`}>
          <iframe
            id="videoFrame"
            className="h-full w-full flex"
            title="Embedded Video"
            src={videoUrl}
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
      )}
    </div>
  );
};

export default VideoFrame;
