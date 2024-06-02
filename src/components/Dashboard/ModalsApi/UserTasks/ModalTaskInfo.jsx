import React, { Fragment, useContext, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AppContext } from "@context/Context";
import endPoints from "@services/api";
import axios from "@api/axios";

const ModalTaskInfo = () => {
  const { isOpenTaskInfo, setIsOpenTaskInfo, idTask } = useContext(AppContext);

  const [task, setTask] = useState([]);

  useEffect(() => {
    async function loadTask(id) {
      await axios
        .get(endPoints.tasks.getUserTask(id), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setTask(res.data.body.userTask);
          }
        });
    }

    loadTask(idTask);
  }, []);

  function closeModalTaskInfo() {
    setIsOpenTaskInfo(false);
  }

  return (
    <>
      <Transition appear show={isOpenTaskInfo} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalTaskInfo}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between items-center text-md font-medium leading-6 text-gray-900"
                  >
                    Task Information
                  </Dialog.Title>
                  <div className="mt-3">
                    <div className="my-2">
                      <p className="text-sm mb-1">Title:</p>
                      <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
                        <input
                          type="text"
                          className="h-8 rounded-sm w-72 text-sm capitalize border-none"
                          placeholder={task.title}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <p className="text-sm mb-1">Description:</p>
                      <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
                        <input
                          type="text"
                          className="h-12 rounded-sm w-72 text-sm capitalize border-none"
                          placeholder={task.body}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-200 shadow-lg px-4 py-2 text-sm font-medium text-black hover:bg-red-300 focus:outline-none"
                      onClick={closeModalTaskInfo}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export { ModalTaskInfo };
