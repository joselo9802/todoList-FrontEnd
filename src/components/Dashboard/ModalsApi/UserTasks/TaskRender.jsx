import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/Context";
import { useLocation } from "react-router-dom";
import endPoints from "@services/api";
import axios from "@api/axios";

const TaskRender = ({ tasks }) => {
  const {
    setIsOpenTaskEdit,
    setIsOpenConfirmTask,
    setIdTask,
    setIsOpenTaskInfo,
    setTasks,
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

  const location = useLocation();

  function handleActive(id) {
    const taskTurn = tasks.map((task) => {
      if (task._id === id) {
        return {
          ...task,
          active: !task.active,
        };
      } else {
        return {
          ...task,
        };
      }
    });
    setTasks(taskTurn);
  }

  function handleTaskDetail(id) {
    setIdTask(id);
    setIsOpenTaskInfo(true);
  }

  function handleEditTask(id) {
    setIdTask(id);
    setIsOpenTaskEdit(true);
  }

  function handleDeleteTask(id) {
    setIdTask(id);
    setIsOpenConfirmTask(true);
  }

  function handleStatusTask(isChecked, idTask) {
    const statusTask = isChecked ? "Completed" : "Progress";

    async function loadTask(id) {
      await axios
        .get(endPoints.tasks.getUserTask(id), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const updatedTaskStatus = [res.data.body.userTask];
            const taskStatus = {
              id_user: updatedTaskStatus[0].id_user,
              title: updatedTaskStatus[0].title,
              body: updatedTaskStatus[0].body,
              category: updatedTaskStatus[0].category,
              create_date: updatedTaskStatus[0].create_date,
              due_date: updatedTaskStatus[0].due_date,
              status: statusTask,
            };
            async function handleChangeStatusTask(idTask) {
              await axios.put(
                endPoints.tasks.updatedUserTask(idTask),
                taskStatus,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
            }
            handleChangeStatusTask(id);

            const tasksModified = tasks.map((task) => {
              if (task._id === idTask) {
                return {
                  ...task,
                  status: statusTask,
                };
              } else {
                return {
                  ...task,
                };
              }
            });
            setTasks(tasksModified);
          }
        });
    }
    loadTask(idTask);
  }

  const taskRender = tasks.map((task) => (
    <div
      key={task._id}
      className={`relative xl:w-11/12 flex items-center justify-between mt-2 mb-10 py-2 px-5 rounded-md hover:scale-[101%] duration-1000 shadow-md 
      ${task.status === "Completed" ? "bg-green-50" : "bg-pink-100"}
      ${
        location.pathname === "/dashboard"
          ? currentDate != task.create_date.split("").slice(0, 10).join("") &&
            "hidden"
          : "block"
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-4 w-4 rounded-sm decoration-0 cursor-pointer"
          onClick={(e) => handleStatusTask(e.target.checked, task._id)}
          defaultChecked={task.status === "Completed" ? true : false}
        />
        <h3 className="mt-[3px] text-sm capitalize font-[700]">{task.title}</h3>
      </div>
      <div className="flex items-center">
        <div className={`flex ${task.active ? "block" : "hidden"}`}>
          <button
            className="flex justify-center items-center h-6 w-6 rounded-full shadow-md bg-yellow-50 mx-2 cursor-pointer"
            onClick={() => handleEditTask(task._id)}
          >
            <i className="ri-edit-box-line"></i>
          </button>
          <button
            className="flex justify-center items-center h-6 w-6 rounded-full shadow-md bg-red-300 mx-2 cursor-pointer"
            onClick={() => handleDeleteTask(task._id)}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>

        <button
          className={`flex justify-center items-center h-5 w-5 ${
            task.active ? "block" : "hidden"
          } rounded-full shadow-lg cursor-pointer`}
          onClick={() => handleActive(task._id)}
        >
          <i className="ri-arrow-drop-right-line text-xl font[300]"></i>
        </button>
        <button
          className={`${!task.active ? "block" : "hidden"} mr-5 cursor-pointer`}
          onClick={() => handleTaskDetail(task._id)}
        >
          <i className="ri-eye-fill"></i>
        </button>
        <button
          className={`flex justify-center items-center h-5 w-5 ${
            !task.active ? "block" : "hidden"
          } rounded-full shadow-lg cursor-pointer`}
          onClick={() => handleActive(task._id)}
        >
          <i className="ri-arrow-down-s-line"></i>
        </button>
      </div>
      <div className="absolute top-10 px-2 py-1 flex items-center justify-center bg-teal-100 rounded-md shadow-md">
        <div className="flex items-center mr-5">
          <span className="text-xs mr-2">
            {task.due_date.split("").slice(0, 10).join("")}
          </span>
          <i className="ri-calendar-2-fill"></i>
        </div>
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse mr-2"></span>
          <p className="text-xs capitalize font-[500]">{task.category}</p>
        </div>
      </div>
    </div>
  ));

  return taskRender;
};

export default TaskRender;
