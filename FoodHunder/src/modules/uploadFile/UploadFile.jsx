import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import InputRadioButton from "../../components/Input/InputRadioButton";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { userRequest } from "../../axios/axios";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";


const UploadFile = ({ setopenUpload }) => {
  const [image, setimage] = useState(undefined);
  const [video, setvideo] = useState(undefined);
  const navigate = useNavigate()
  const [videofilename, setvideofilename] = useState('')
  const [thumbnailfilename, setthumbnailfilename] = useState('')
  const currentuserId = useSelector((state) => state.auth.user._id)
  console.log("current", currentuserId);

  const [imgPrec, setimgPrec] = useState(0);
  const [videoPrec, setvideoPrec] = useState(0);
const [inputs, setinputs] = useState({})
  
  const [tags, settags] = useState([])

  const handelChange = (e) => {
    setinputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleTags = (e) => {
    settags(e.target.value.split(","))
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + "-" + file.name;
  
    const storageRef = ref(storage, `${currentuserId}/` + fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (urlType === "thumbnailUrl") {
          setimgPrec(Math.round(progress));
          setinputs((prev) => {
            return { ...prev, thumbnailfilename: fileName };
          });
        } else {
          setvideoPrec(Math.round(progress));
          setinputs((prev) => {
            return { ...prev, videofilename: fileName };
          });
        }
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
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    image && uploadFile(image, "thumbnailUrl");
  }, [image]);

  const handleUploads = async(e) => {
    e.preventDefault();
    const res = await userRequest.post("/video", inputs,{
      
      tags,
      thumbnailfilename,
      videofilename,
    });
    setopenUpload(false)
    console.log("ressss ",res);
    
    navigate(`/SingleVideo/${res.data}`);
    
  }
  


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
            <Input
              label="Title"
              name="title"
              type="text"
              value={inputs.title}
              onChange={handelChange}
            />
            <Input
              label="Description"
              name="description"
              type="text"
              value={inputs.description}
              onChange={handelChange}
            />
            <Input
              label="Location"
              name="location"
              type="text"
              value={inputs.location}
              onChange={handelChange}
            />
            <div className="flex  p-3 ">
              <label className="pr-6 font-bold">Add Thumbnail :</label>
              {imgPrec > 0 ? (
                "Uploading:" + imgPrec + "%"
              ) : (
                <input
                  label="Thumbnail"
                  name="thumbnailUrl"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setimage(e.target.files[0])}
                />
              )}
            </div>
            <div className="flex  p-3">
              <label className="pr-14 font-bold">Add Video :</label>
              {videoPrec > 0 ? (
                "Uploading:" + videoPrec + "%"
              ) : (
                <input
                  label="video"
                  name="videoUrl"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setvideo(e.target.files[0])}
                />
              )}
            </div>

            <Input
              label="Tags"
              name="tags"
              type="tags"
              value={tags}
              onChange={handleTags}
            />

            <div className="flex flex-col ">
              <p>Recommendation :</p>
              <div className="flex ">
                <div className="ml-2">
                  <InputRadioButton
                    label="Good"
                    name="recommendation"
                    type="radio"
                    value="good"
                    onChange={handelChange}
                    checked={inputs.recommendation === "good"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Average"
                    name="recommendation"
                    type="radio"
                    value="average"
                    onChange={handelChange}
                    checked={inputs.recommendation === "average"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Bad"
                    name="recommendation"
                    type="radio"
                    value="bad"
                    onChange={handelChange}
                    checked={inputs.recommendation === "bad"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <p>Worth :</p>
              <div className="flex">
                <div className="ml-2">
                  <InputRadioButton
                    label="Good"
                    name="worth"
                    type="radio"
                    value="good"
                    onChange={handelChange}
                    checked={inputs.worth === "good"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Average"
                    name="worth"
                    type="radio"
                    value="average"
                    onChange={handelChange}
                    checked={inputs.worth === "average"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Bad"
                    name="worth"
                    type="radio"
                    value="bad"
                    onChange={handelChange}
                    checked={inputs.worth === "bad"}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p>Taste :</p>
              <div className="flex">
                <div className="ml-2">
                  <InputRadioButton
                    label="Good"
                    name="taste"
                    type="radio"
                    value="good"
                    onChange={handelChange}
                    checked={inputs.taste === "good"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Average"
                    name="taste"
                    type="radio"
                    value="average"
                    onChange={handelChange}
                    checked={inputs.taste === "average"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Bad"
                    name="taste"
                    type="radio"
                    value="bad"
                    onChange={handelChange}
                    checked={inputs.taste === "bad"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p>Service :</p>
              <div className="flex">
                <div className="ml-2">
                  <InputRadioButton
                    label="Good"
                    name="service"
                    type="radio"
                    value="good"
                    onChange={handelChange}
                    checked={inputs.service === "good"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Average"
                    name="service"
                    type="radio"
                    value="average"
                    onChange={handelChange}
                    checked={inputs.service === "average"}
                  />
                </div>
                <div className="ml-2">
                  <InputRadioButton
                    label="Bad"
                    name="service"
                    type="radio"
                    value="bad"
                    onChange={handelChange}
                    checked={inputs.service === "bad"}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                className="bg-gray-800 text-white"
                onClick={handleUploads}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UploadFile