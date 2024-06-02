import React, { useContext, useState } from "react";
import SpinnerDashboard from "@components/Dashboard/SpinnerDashboard";
import { AppContext } from "@context/Context";
import { ModalTasks } from "@components/Dashboard/ModalsApi/UserTasks/ModalTasks";
import axios from "@api/axios";
import endPoints from "@services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTaskSidebar = () => {
  const { userCategories, setTasks } = useContext(AppContext);

  const [isOpenMessageTask, setIsOpenMessageTask] = useState(false);
  const [messageTask, setMessageTask] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [dueDateFull, setDueDateFull] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(null);
  const date = new Date();
  let currentDay = date.getDate();
  let dueDay = dueDateFull.getDate();

  if (currentDay < 10) {
    currentDay = `0${currentDay}`;
  }

  if (dueDay < 10) {
    dueDay = `0${dueDay}`;
  }

  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${currentDay}`;

  const dueDate = `${dueDateFull.getFullYear()}-${
    dueDateFull.getMonth() + 1
  }-${dueDay}`;

  async function handleAddTask() {
    const { _id } = JSON.parse(localStorage.getItem("user"));

    const userId = {
      id_user: _id,
    };

    const newTask = {
      id_user: _id,
      title,
      body,
      category,
      create_date: currentDate,
      due_date: dueDate,
      status: "Progress",
    };

    if (dueDate < currentDate) {
      setWarning("Invalid due date");
    } else {
      await axios
        .post(endPoints.tasks.addUserTask, newTask, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setWarning(null);
          setLoading(true);
          if (res.status === 200) {
            setTimeout(function () {
              setMessageTask(res.data.body);
              setLoading(false);
              setTitle("");
              setBody("");
              setCategory("");
              setIsOpenMessageTask(true);
            }, 3000);
          }
        })
        .catch((error) => {
          const errorData = error.response.data.body;
          setMessageTask(errorData);
          setIsOpenMessageTask(true);
          setLoading(false);
          if (!title || !body || !category || !dueDate) {
            setTitle(title);
            setBody(body);
            setCategory(category);
          }
        });

      await axios
        .post(endPoints.tasks.getUserTasks, userId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setTimeout(function () {
              setTasks(res.data.body.tasks);
            }, 3000);
          }
        });
    }
  }

  return (
    <>
      <aside className="w-full h-4/5 flex flex-col justify-around p-10 mt-40 xs:w-[40vw] sm:w-[35vw] md:w-[30vw] lg:w-[27vw] lg:mt-0 xl:w-[25vw] lg:h-full bg-[rgba(115,203,203,0.1)]">
        <section className="flex justify-between">
          <h2 className="text-xl font-[500]">Task</h2>
          <button
            type="button"
            className="h-8 w-8 shadow-sm rounded-full cursor-pointer"
            onClick={() => setIsOpenTask(false)}
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </section>

        <section className="mt-2">
          <div className="flex items-center">
            <p className="text-[13px] font-[500] mb-1 mr-3">Title:</p>
            <div className="border-b-[1.5px] w-full border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
              <input
                name="task-title"
                id="task-title"
                type="text"
                className="w-full border-2 border-black h-8 text-sm bg-inherit border-none capitalize"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <p className="text-[13px] font-[500] mt-5 mb-1">Description:</p>
          <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
            <textarea
              name="task-body"
              id="task-body"
              type="text"
              className="w-full text-sm bg-inherit border-none capitalize h-[50px]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div className="flex items-center mt-5">
            <p className="text-[13px] font-[500] mb-1 mr-3">Category:</p>
            <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
              <select
                className="h-8 bg-inherit border-none text-sm capitalize cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="text-sm" value={"-"}>
                  -
                </option>
                {userCategories.map((category) => {
                  return (
                    <option
                      key={category._id}
                      className="text-sm capitalize"
                      value={category.category}
                    >
                      {category.category}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className=" flex mt-5">
            <p className="text-[13px] font-[500] mt-3 mb-1 mr-2">Due date:</p>
            <div className=" w-[130px] flex justify-around items-center border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
              <DatePicker
                selected={dueDateFull}
                onChange={(date) => setDueDateFull(date)}
                className="h-8 w-[110px] text-sm text-center border-none bg-inherit cursor-pointer"
              />
              <i className="ri-calendar-fill"></i>
            </div>
          </div>
          {warning && (
            <div className="flex justify-center items-center mt-5 mx-10 rounded-md bg-red-200 px-2 py-1">
              <p className="text-sm">{warning}</p>
            </div>
          )}
        </section>
        <section>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="flex justify-center items-center rounded-md border border-transparent bg-yellow-200 shadow-lg px-3 py-1 text-sm font-medium text-black hover:scale-[102%] duration-500"
              onClick={handleAddTask}
            >
              {loading ? (
                <SpinnerDashboard />
              ) : (
                <div className="flex items-center">
                  <i className="ri-save-fill text-lg mr-2"></i> <p>Save</p>
                </div>
              )}
            </button>
          </div>
        </section>
      </aside>
      {isOpenMessageTask && (
        <ModalTasks
          isOpenMessageTask={isOpenMessageTask}
          setIsOpenMessageTask={() => setIsOpenMessageTask()}
          messageTask={messageTask}
        />
      )}
    </>
  );
};

export default AddTaskSidebar;
