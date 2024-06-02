import React, { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "@context/Context";
import { ModalUpdateUserData } from "@components/Dashboard/ModalsApi/UserData/ModalUpdateData";
import { ModalUpdateUserPassword } from "@components/Dashboard/ModalsApi/UserData/ModalUpdatePassword";
import MenuSidebar from "@components/Dashboard/MenuSidebar/MenuSidebar";
import Navbar from "@components/Dashboard/Navbar/Navbar";

const UserSettings = () => {
  const {
    isOpenUpdateUserData,
    setIsOpenUpdateUserData,
    isOpenUpdateUserPassword,
    setIsOpenUpdateUserPassword,
  } = useContext(AppContext);

  return (
    <div className="w-full h-full flex">
      <Navbar />
      <div className="hidden lg:block m-0 p-0">
        <MenuSidebar />
      </div>
      <div className="w-full mt-16 lg:mt-0 relative flex flex-col justify-center items-center">
        <h1 className="absolute top-5 left-10 font-semibold text-lg">
          Account Settings
        </h1>
        <div className=" bg-gray-200 rounded-full w-24 h-24 lg:h-32 lg:w-32 grid place-content-center">
          <i className="ri-user-line text-6xl"></i>
        </div>
        <div className="grid grid-rows-3 sm:grid-rows-2 sm:grid-flow-col sm:gap-x-8 w-10/12 lg:w-[30vw] py-10 place-content-around mt-15">
          <div className="my-2 w-[220px]">
            <p className="text-[12px] font-[500]">Names:</p>
            <input
              type="text"
              name="names"
              id="names"
              placeholder={
                JSON.parse(localStorage.getItem("user"))
                  ? JSON.parse(localStorage.getItem("user")).names
                  : ""
              }
              className=" w-full h-8 rounded-md text-[14px] placeholder-gray-700 capitalize"
              disabled
            />
          </div>
          <div className="my-2 w-[220px]">
            <p className="text-[12px] font-[500]">Last Names:</p>
            <input
              type="text"
              name="lastNames"
              id="lastNames"
              placeholder={
                JSON.parse(localStorage.getItem("user"))
                  ? JSON.parse(localStorage.getItem("user")).lastNames
                  : ""
              }
              className="w-full h-8 rounded-md text-[14px] placeholder-gray-700 capitalize"
              disabled
            />
          </div>
          <div className="my-2 w-[220px]">
            <p className="text-[12px] font-[500]">Username:</p>
            <input
              type="text"
              name="username"
              id="username"
              placeholder={
                JSON.parse(localStorage.getItem("user"))
                  ? JSON.parse(localStorage.getItem("user")).username
                  : ""
              }
              className="w-full h-8 rounded-md text-[14px] placeholder-gray-700"
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-5">
            <i className="ri-error-warning-line text-xl text-gray-700 mr-2 animate-pulse duration-700"></i>
            <p className="text-gray-700 font-semibold text-sm mr-2 animate-pulse duration-700">
              Update user's data
            </p>
          </div>
          <div className="flex">
            <button
              className="flex items-center bg-blue-200 px-2 py-1 rounded-md text-sm mx-2 shadow-lg hover:scale-105 duration-500"
              onClick={() => setIsOpenUpdateUserPassword(true)}
            >
              <i className="ri-lock-password-fill text-lg mr-2"></i>
              <p className="text-sm font-[500]">Password</p>
            </button>
            <button
              className="flex items-center bg-yellow-200 px-2 py-1 rounded-md text-sm mx-2 shadow-lg hover:scale-105 duration-500"
              onClick={() => setIsOpenUpdateUserData(true)}
            >
              <i className="ri-shield-user-fill text-lg mr-2"></i>
              <p className="text-sm font-[500]">Information</p>
            </button>
          </div>
        </div>
      </div>
      {isOpenUpdateUserData && (
        <ModalUpdateUserData />
      )}
      {isOpenUpdateUserPassword && (
        <ModalUpdateUserPassword />
      )}
    </div>
  );
};

export default UserSettings;
