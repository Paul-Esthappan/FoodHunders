import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import UploadProfileImg from "../../modules/uploadFile/UploadProfileImg";


const Avatar = ({ userimage, className, showEditIcon }) => {
  


  const [openUpload, setopenUpload] = useState(false);
  return (
    <div>
      <div>
        {showEditIcon && (
          <div className="flex  ">
            <button
              onClick={() => {
                setopenUpload(true);
              }}
            >
              <div className="flex justify-end w-32 ">
                <FaUserEdit className="w-5 h-5  text-gray-400 dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600" />
              </div>
            </button>
          </div>
        )}
        <div className="flex justify-center items-center">
          {userimage ? (
            <img src={userimage} className={`rounded-full ${className}`} />
          ) : (
            <CgProfile className={`rounded-full ${className}`} />
          )}
        </div>
      </div>
      {openUpload && <UploadProfileImg setopenUpload={setopenUpload} />}
    </div>
  );
};

export default Avatar;
