// components/Video.js
import React from "react";

const Video = ({ video }) => {
  return (
    <div className="video-container">
      <video controls width="100%">
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{video.title}</p>
    </div>
  );
};

export default Video;
