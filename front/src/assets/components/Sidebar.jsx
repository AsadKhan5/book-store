import React, { useState, useEffect } from "react";
import { RiDashboard2Fill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSunny, IoMoon } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";

const Sidebar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "black");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [darkMode]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="drawer-side ">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex flex-col justify-between gap-5 menu p-1 w-60 min-h-full border-l-0 bg-neutral-200 border-gray-300 border-t-0 border-r-2 border-b-0  text-base dark:border-base-200 transition-all h-screen z-50 relative">
        <div className="flex flex-col gap-1 justify-center items-center pt-10 ">
          <h1 className="text-5xl font-light font-mono">Book</h1>
          <h2 className="text-xl font-semibold font-mono">Managewment Store</h2>
        </div>

        <ul className="p-5 flex flex-col gap-2 overflow-y-auto h-[calc(100vh-350px)] custom-scrollbar ">
          <li>
            <NavLink
              to="BookDashboard"
              className="text-lg  flex gap-2 items-center"
            >
              <RiDashboard2Fill /> view Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="create-book"
              className="text-lg  flex gap-2 items-center"
            >
              <FaCircleUser /> Create Book
            </NavLink>
          </li>
        </ul>

        <div className="flex gap-2 p-5">
          <button
            onClick={logoutHandler}
            className=" btn text-md w-3/4 z-10"
            href=""
          >
            <CiLogout className="font-bold" /> Logout
          </button>

          <label className="swap swap-rotate btn w-1/4">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={() => setDarkMode((prevMode) => !prevMode)}
            />

            {/* sun icon */}
            <IoSunny className="swap-on h-10 w-5 fill-current" />

            {/* moon icon */}
            <IoMoon className="swap-off h-10 w-5 fill-current" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
