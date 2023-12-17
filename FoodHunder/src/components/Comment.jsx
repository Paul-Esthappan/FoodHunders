import React, { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../axios/axios";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment, userId, key }) => {
  // State for storing the user details associated with the comment
  const [commentUser, setCommentUser] = useState([]);
  // State for handling the comment description in the form
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Fetch user details associated with the comment
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await publicRequest.get(`/user/find/${userId}`);
        setCommentUser(response.data);
        console.log("commentUser", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  console.log("cmd id", comment._id);
  const handleDelete = async () => {
    // try {
      const res = await userRequest.delete(`/comments/delete/${comment._id}`)
      // console.log("res delete ", res.data);
      // console.log("res dele", comment._id);
      navigate("/home"); // Move navigation here if you want to navigate after successful deletion
    // } catch (error) {
    //   console.error("can't delete", error);
    // }
  };

  // Handle comment edit
  const handleComments = async () => {
    console.log("id comment", comment._id);
    try {
      const response = await userRequest.put(`/comments/${comment._id}`, {
        description: description,
        videoId: comment.videoId,
      });

      console.log("res", response.data); // Corrected to log response.data
    } catch (error) {
      console.error("can't edit", error);
    }
    navigate("/home");
  };


  return (
    <div key={key} className="comment-container bg-gray-100 rounded-lg mb-1">
      <div className="flex items-center">
        {!commentUser.image ? (
          <CgProfile className="w-10 h-10 rounded-full mx-2 text-gray-600 font-thin" />
        ) : (
          <img
            className="w-8 h-8 rounded-full"
            src={commentUser.image}
            alt="Profile"
          />
        )}
        <h3 className="px-1">{commentUser.username}</h3>
      </div>
      <div className="w-full p-1">
        <form className="mb-2">
          <input
            className="rounded w-full bg-gray-100 p-1"
            id="addcomment"
            placeholder={comment.description}
            name="addcomment"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end mx-3">
            <button className="bg-green-300 px-3 mx-3" onClick={handleComments}>
              Edit
            </button>
            <button className="bg-red-300 px-3 mx-3" onClick={handleDelete}>
          Delete
        </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Comment;
