import React, { useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { AppContext } from "@context/Context";
import CategoriesRender from "@components/Dashboard/ModalsApi/UserCategories/CategoriesRender";
import { ModalAddCategory } from "@components/Dashboard/ModalsApi/UserCategories/ModalAddCategory";
import { ModalConfirmCategory } from "@components/Dashboard/ModalsApi/UserCategories/ModalConfirmCategory";
import { ModalEditCategory } from "@components/Dashboard/ModalsApi/UserCategories/ModalEditCategory";
import { useNavigate } from "react-router-dom";

const MenuSidebar = () => {
  const route = useNavigate();

  const {
    isOpenAddCategory,
    setIsOpenAddCategory,
    isOpenConfirmCategory,
    setIsOpenConfirmCategory,
    isOpenEditCategory,
  } = useContext(AppContext);

  function handleSignOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    route("/");
  }

  function handleAddCategory() {
    setIsOpenAddCategory(true);
  }

  return (
    <aside className=" lg:w-[220px] h-full bg-[rgba(115,203,203,0.4)] flex flex-col justify-between py-10 px-5">
      <div className="flex flex-col h-[80%]">
        <div className="flex flex-col ">
          <h1 className="text-lg font-semibold">Menu</h1>
        </div>
        <div className="flex flex-col mt-10 mb-5">
          <p className="text-xs font-bold mb-2">TASKS</p>
          <button
            className="text-left mb-3 text-sm px-5 py-1 hover:scale-105 duration-500"
            onClick={() => route("/dashboard/all")}
          >
            <i className="ri-arrow-right-double-line mr-2"></i> All
          </button>
          <button
            className="text-left mb-2 text-sm px-5 py-1 hover:scale-105 duration-500"
            onClick={() => route("/dashboard")}
          >
            <i className="ri-list-check mr-2"></i> Today
          </button>
        </div>
        <p className="text-xs font-bold mb-2">CATEGORIES</p>
        <div className="flex flex-col items-center">
          <button className="btn-add-category" onClick={handleAddCategory}>
            <i className="ri-add-line text-xl mr-2"></i>
            <p className="text-xs text-gray-800 font-semibold">Category</p>
          </button>
          <div className="flex flex-col w-full  h-[130px] overflow-y-scroll">
            <CategoriesRender
              setIsOpenConfirmCategory={() => setIsOpenConfirmCategory()}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-[20%]">
        <button
          className="btn-user-settings"
          onClick={() => route("/dashboard/settings")}
        >
          <i className="ri-settings-2-line mr-2 text-xl"></i>
          <p className="font-[500]">Settings</p>
        </button>
        <button className="btn-logout" onClick={handleSignOut}>
          <i className="ri-logout-box-fill mr-2 text-xl"></i>
          <p className="font-[500]">Log out</p>
        </button>
      </div>
      {isOpenAddCategory && <ModalAddCategory />}
      {isOpenEditCategory && <ModalEditCategory />}
      {isOpenConfirmCategory && <ModalConfirmCategory />}
    </aside>
  );
};

export default MenuSidebar;
