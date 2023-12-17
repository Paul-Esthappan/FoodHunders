import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { publicRequest, userRequest } from "../axios/axios";
import Avatar from "./Avater/Avatar";

const Comments = ({ yourVideoId }) => {
  const [Commentin, setCommentin] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const [addcomment, setaddcomment] = useState("");
  const [showcomment, setshowcomment] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userRequest.post("/comments", {
        description: addcomment,
        videoId: yourVideoId,
      });
    

    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setaddcomment(""); 
  };

  const handleshowcomment = () => {
    setshowcomment(!showcomment);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await publicRequest.get(`/comments/${yourVideoId}`);
        setCommentin(response.data);
    
      } catch (error) {
        console.error("nocomments ",error)
      }
    };
    fetchUser();
  }, [yourVideoId]);

  return (
    <div key={currentUser._id}>
      <div  className="flex flex-col p-1">
        <div className="flex pb-1">
          <Avatar className={"w-5 h-5"} userimage={currentUser.image}/>
          
          <h1 className="px-2">{currentUser.username}</h1>
        </div>
        <form onSubmit={handleSubmit} className="mb-2">
          <input
            className="rounded w-full bg-gray-100 p-1"
            id="addcomment"
            key="aacomment"
            placeholder="Add your comment here (press Enter to submit)"
            name="addcomment"
            value={addcomment}
            onChange={(e) => setaddcomment(e.target.value)}
          />
          <div className="flex justify-end mx-3">
            <button
              type="submit"
              className="text-xs font-extralight flex justify-end bg-gray-300 px-2 hover:bg-gray-400"
            >
              Sent
            </button>
          </div>
        </form>
      </div>
      <button onClick={handleshowcomment} className="flex items-center">
        Comments...
        {showcomment ? (
          <RiArrowDropUpLine className="text-xl font-extrabold" />
        ) : (
          <RiArrowDropDownLine className=" text-xl font-extrabold" />
        )}
      </button>
      {showcomment ? (
        <div>
          {Commentin.map((dis) => (
            <Comment comment={dis} userId={dis.userId} key={dis._id} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comments;
