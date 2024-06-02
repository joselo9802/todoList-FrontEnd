import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/Context";
import MenuSidebar from "@components/Dashboard/MenuSidebar/MenuSidebar";
import Navbar from "@components/Dashboard/Navbar/Navbar";
import CategoriesRender from "@components/Dashboard/ModalsApi/UserCategories/CategoriesRender";
import AddTaskSidebar from "@components/Dashboard/ModalsApi/UserTasks/AddTaskSidebar";
import EditTaskSidebar from "@components/Dashboard/ModalsApi/UserTasks/EditTaskSidebar";
import TaskRender from "@components/Dashboard/ModalsApi/UserTasks/TaskRender";
import { ModalConfirmTask } from "@components/Dashboard/ModalsApi/UserTasks/ModalConfirmTask";
import { ModalTaskInfo } from "@components/Dashboard/ModalsApi/UserTasks/ModalTaskInfo";
import { ModalWelcome } from "@components/Login/ModalWelcome";
import axios from "@api/axios";
import endPoints from "@services/api";

const Dashboard = () => {
  const {
    tasks,
    setTasks,
    isOpenTask,
    setIsOpenTask,
    userCategories,
    isOpenTaskEdit,
    isOpenConfirmTask,
    isOpenTaskInfo,
    isOpenWelcome,
  } = useContext(AppContext);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  const currentDate = `${date.getFullYear()}-${month}-${day}`;

  useEffect(() => {
    const { _id } = JSON.parse(localStorage.getItem("user"));

    const userId = {
      id_user: _id,
    };

    async function loadTasks() {
      await axios
        .post(endPoints.tasks.getUserTasks, userId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const tasksRes = res.data.body.tasks;
          const tasksModified = tasksRes.map((task) => {
            return {
              ...task,
              active: false,
            };
          });
          setTasks(tasksModified);
        });
    }
    loadTasks();
  }, [userCategories]);

  return (
    <div className="w-full h-full flex">
      <Navbar />
      <div className="absolute top-20 w-11/12 left-2 px-5 overflow-x-scroll lg:hidden">
        <CategoriesRender />
      </div>
      <div className="hidden lg:block m-0 p-0">
        <MenuSidebar />
      </div>
      <div
        className={`${
          isOpenTask || isOpenTaskEdit ? "hidden xs:block" : "block"
        } w-[100vw] mt-24 lg:mt-0 sm:w-[65vw] md:w-[70vw] lg:w-[55vw] xl:w-[60vw] p-10 lg:h-full`}
      >
        <section className="mx-5">
          <h1 className="text-3xl font-[500]">Today</h1>
          <button className="btn-add-task" onClick={() => setIsOpenTask(true)}>
            <i className="ri-add-line text-xl mr-2"></i>
            <p className="text-xs text-gray-800 font-semibold">Task</p>
          </button>
        </section>

        <section className="relative mt-5 h-3/4 overflow-y-scroll">
          {tasks.filter(
            (task) =>
              task.create_date.split("").slice(0, 10).join("") === currentDate
          ).length > 0 ? (
            <TaskRender
              tasks={tasks.filter(
                (task) =>
                  task.create_date.split("").slice(0, 10).join("") ===
                  currentDate
              )}
            />
          ) : (
            <div className="h-full flex justify-center items-center opacity-50">
              <i className="ri-folder-5-line text-2xl mr-2"></i>
              <h2 className="text-2xl">There's no tasks today</h2>
            </div>
          )}
        </section>
      </div>
      {isOpenTask && <AddTaskSidebar />}
      {isOpenTaskEdit && <EditTaskSidebar />}
      {isOpenConfirmTask && <ModalConfirmTask />}
      {isOpenTaskInfo && <ModalTaskInfo />}
      {isOpenWelcome && <ModalWelcome />}
    </div>
  );
};

export default Dashboard;
