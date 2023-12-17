import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TbSalt } from "react-icons/tb";
import { menuItems, userStatusData } from "../../src/modules/Home/userdata";
import loginimg2 from "../assets/loginimg2.jpg";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { GiFireworkRocket } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import NavItem from "./MainNavItem/NavItem";
import TopNav from "./TopNav/TopNav";
import UploadFile from "../modules/uploadFile/UploadFile";




const MainNavbar = () => {
  const navigate = useNavigate()
  
  const [openUpload, setopenUpload] = useState(false)
  return (
    <>
      <div className="fixed md:relative w-full bottom-0 md:bottom-auto  z-50 md:z-0 -translate-x-1/2 bg-white border-t md:border-r border-gray-200 left-1/2 md:left-0 dark:bg-gray-700 dark:border-gray-600 md:w-[0%] md:-translate-x-0">
        {/* <div class="w-full">
          <div
            class="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600 md:grid-cols-1"
            role="group"
          >
            <button
              type="button"
              class="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
            >
              New
            </button>
            <button
              type="button"
              class="px-5 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg"
            >
              Popular
            </button>
            <button
              type="button"
              class="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
            >
              Following
            </button>
          </div>
        </div> */}
        {/* <div className="grid max-w-lg md:max-w-sm grid-cols-5 md:grid-cols-1 md:grid-rows-5 mx-auto md:w-full "> */}
        <div className="md:pt-5 md:w-full md:px-3">
          <div className="bottom-0 md:bottom-auto md:w-full h-[5%] md:h-full grid grid-flow-col md:grid-flow-row ">
            <NavItem
              onClick={() => {
                navigate("/home");
              }}
              icon={
                <AiFillHome className="w-5 h-5 mb-1 text-gray-400   dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600" />
              }
              spanLabel="Home"
            />
            <NavItem
              onClick={() => {
                navigate("/trending");
              }}
              icon={
                <GiFireworkRocket className="w-5 h-5 mb-1 text-gray-400   dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600" />
              }
              spanLabel="Trendins"
            />
            <NavItem
              onClick={() => {
                navigate("/subscribed");
              }}
              icon={
                <GiFireworkRocket className="w-5 h-5 mb-1 text-gray-400   dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600" />
              }
              spanLabel="Subscribed"
            />
            <NavItem
              onClick={() => {
                setopenUpload(true);
      
              }}
              icon={
                <MdOutlineAddLocationAlt className="w-5 h-5 mb-1 text-gray-400   dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600" />
              }
              spanLabel="Spot"
            />
            <NavItem
              onClick={() => {
                navigate("/savedvideos");
              }}
              icon={
                <FaBookmark className="w-5 h-5 mb-1 text-gray-400   dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600" />
              }
              spanLabel="Saved"
            />
            <NavItem
              onClick={() => {
                navigate("/profile");
              }}
              icon={
                <VscSettings className="w-5 h-5 mb-1 text-gray-400   dark:text-gray-400 group-hover:text-stone-600 dark:group-hover:text-stone-600" />
              }
              spanLabel="Settings"
            />
          </div>
        </div>
      </div>
      {openUpload && <UploadFile setopenUpload={setopenUpload} />}

      {/* <div className="w-[20%] flex flex-col">
        <div className="h-[30%] bg-yellow-400 flex justify-center items-center border-b">
          <div className="flex flex-col justify-center items-center">
            <IoPersonCircleOutline className="w-[75px] h-[75px]" />
            <p className="my-4">Paul Est</p>
            <div className="border h-[50px] flex justify-around w-[300px] text-center">
              {userStatusData.map(({ id, name, stats }) => {
                return (
                  <div key={id}>
                    <h4 className="font-bold">{stats}</h4>
                    <p className="font-light text-sm">{name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-[55%] bg-red-300 flex flex-col justify-evenly pl-12">
          {}
          {menuItems.map(({ id, name }) => {
            return (
              <div key={id} className="flex cursor-pointer hover:text-white ">
                <h4 className="text-sm font-bold">{name}</h4>
              </div>
            );
          })}
        </div>
        <div className="h-[15%] bg-zinc-600">
          <div className="ml-12 cursor-pointer">Logout</div>
        </div>
      </div> */}
    </>
  );
};

export default MainNavbar;
