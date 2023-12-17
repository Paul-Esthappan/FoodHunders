import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { PiHamburgerFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserAndToken } from "../../redux/authSlice";
import  profileimage  from "../../assets/profileimage.jpg";
import Avatar from "../Avater/Avatar";


const TopNav = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchToggle, setSearchToggle] = useState(true);
  const [isHovered, setHovered] = useState(false);
  const [searchHovered, setsearchHovered] = useState(false);
  const [q, setq] = useState('')

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleSearchMouseEnter = () => {
    setsearchHovered(true);
  };

  const handleSearchMouseLeave = () => {
    setsearchHovered(false);
  };



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${q}`);
  };

  const handleLogout = () => {
    dispatch(clearUserAndToken());
    navigate("/account/signin");
  };

  const currentUser = useSelector((state) => state.auth.user);
  const userProfilImage = currentUser?.image;

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[8%] flex ">
      <div className="w-full h-full justify-between items-center flex ">
        <div className="w-full h-full items-center grid grid-cols-2 ">
          <div className="flex items-center h-full">
            <PiHamburgerFill
              onClick={() => navigate("/profile")}
              className="h-10 w-10 ml-3 md:hidden"
            />
            <a href="/" className="flex justify-center items-center mx-4 ">
              <Avatar userimage={profileimage} className={"h-9 w-9"} />
              <span className="self-center text-gray-700 font-semibold font-serif sm:text-2xl whitespace-nowrap dark:text-white pl-2">
                Food Hunters
              </span>
            </a>
          </div>
          <div className="flex items-center h-full justify-end px-7">
            <form
              onSubmit={handleSubmit}
              className=" flex justify-center items-center px-10 w-auto"
            >
              <IoIosSearch
                onMouseEnter={handleSearchMouseEnter}
                onMouseLeave={handleSearchMouseLeave}
              />

              {searchHovered && (
                <input
                  onMouseEnter={handleSearchMouseEnter}
                  onMouseLeave={handleSearchMouseLeave}
                  className={`rounded bg-gray-100 p-1 `}
                  id="search"
                  key="search"
                  placeholder="Search here"
                  type="text"
                  name="search"
                  onChange={(e) => setq(e.target.value)}
                />
              )}
              <button type="submit" className="mx-1"></button>
            </form>

            <div className="flex items-center  m-auto absolute">
              <div
                className="cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Avatar userimage={userProfilImage} className={"w-9 h-9"} />
              </div>
              {isHovered && (
                <div
                  className="absolute top-full right-0 bg-white border border-gray-300 p-2"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {currentUser?.username}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {currentUser?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        to="/earnings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </Link>
                    </li> */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
