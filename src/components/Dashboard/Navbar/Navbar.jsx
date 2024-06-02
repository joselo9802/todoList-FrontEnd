import React from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const route = useNavigate();

  function handleSignOut() {
    localStorage.removeItem("user");
    Cookie.remove("token");
    route("/");
  }

  return (
    <nav className="absolute w-full block lg:hidden py-3 px-5 bg-[#F4F6F7] opacity-80">
      <div className="flex m-0 justify-between items-center text-md">
        <div className="flex">
          <i className="ri-booklet-fill text-2xl"></i>
          <div className="flex">
            <button className="ml-5 text-sm px-2 rounded-md hover:bg-[#F6DDCC] hover:shadow-md duration-500 cursor-pointer xs:text-md" onClick={() => route("/dashboard")}>
              <i className="ri-arrow-right-double-line text-lg font-semibold mr-2"></i>
              Today
            </button>
            <button className="ml-5 text-sm px-2 rounded-md hover:bg-[#F6DDCC] hover:shadow-md duration-500 cursor-pointer xs:text-md" onClick={() => route("/dashboard/all")}>
              <i className="ri-list-check text-lg font-semibold mr-2"></i>
              All
            </button>
          </div>
        </div>
        <div className="flex">
          <button className="mr-5 px-2 py-1 rounded-full hover:bg-[#93a0a77b] hover:shadow-lg hover:scale-105 hover:text-gray-500 duration-1000 cursor-pointer" onClick={() => route("/dashboard/settings")}>
            <i className="ri-user-6-fill text-xl"></i>
          </button>
          <button className="px-2 py-1 rounded-full hover:bg-[#f79f5c6c] hover:scale-105 hover:text-gray-500 hover:shadow-lg duration-1000 cursor-pointer" onClick={handleSignOut}>
            <i className="ri-login-box-fill text-xl "></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
