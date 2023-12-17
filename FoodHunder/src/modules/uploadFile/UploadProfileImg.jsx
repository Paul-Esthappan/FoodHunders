import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../../firebase";
import { userRequest } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAndToken } from "../../redux/authSlice";

const UploadProfileImg = ({ setopenUpload }) => {
  const [image, setimage] = useState(undefined);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user._id);
  console.log("Userid", userId);
  const [imgPrec, setimgPrec] = useState(0);
  const [inputs, setinputs] = useState({});
    const dispatch = useDispatch();
    

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
  
    const storageRef = ref(storage, "profileimages/" + userId);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        urlType === "image";
        setimgPrec(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          setinputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
          console.log("inputs", inputs);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  useEffect(() => {
    image && uploadFile(image, "image");
  }, [image]);

  const handleUploads = async (e) => {
    e.preventDefault();
    const res = await userRequest.put(`/user/find/${userId}`, inputs);
    const user = res.data.user;
    const token = res.data.token;
    console.log("res", res, "user", user, "token", token);
    setopenUpload(false);
    console.log("resss", res);
    dispatch(setUserAndToken({ user, token }));

    navigate("/profile");
  };

    const deletephoto = async () => {
         const storage = getStorage(app);
         const respos = await userRequest.put(
           `/user/findanddeleteprofilepic/${userId}`,
           { image: undefined }
         );
       
         const user = respos.data.user;
         const token = respos.data.token;
         console.log("res", respos, "user", user, "token", token);
         setopenUpload(false);
         console.log("resss", respos);
         dispatch(setUserAndToken({ user, token }));

        
    

    // Create a reference to the file to delete
    const desertRef = ref(storage, "profileimages/" + userId);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("deleted");
        // File deleted successfully
      })
      .catch((error) => {
        console.error("cant delete");
      });
  };

  return (
    <div className="fixed top-0 right-[15%] left-[15%] m-auto  ">
      <div className="w-full h-full flex justify-center items-center mt-20  ">
        <div className="w-[600px] h-[600px] bg-gray-200 rounded-lg from-neutral-50 p-5 flex flex-col relative  overflow-scroll">
          <div className="flex justify-end text-white cursor-pointer">
            <button
              onClick={() => setopenUpload(false)}
              className="flex  from-neutral-50 "
            >
              X
            </button>
          </div>
          <div>
            {imgPrec > 0 ? (
              "Uploading:" + imgPrec + "%"
            ) : (
              <input
                label="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => setimage(e.target.files[0])}
              />
            )}
          </div>
          <div>
            <button className="bg-gray-800 text-white" onClick={handleUploads}>
              Upload
                      </button>
                      <button onClick={deletephoto}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProfileImg;
