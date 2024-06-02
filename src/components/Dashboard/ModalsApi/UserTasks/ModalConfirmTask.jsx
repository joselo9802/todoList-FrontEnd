import React, { Fragment, useContext, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AppContext } from "@context/Context";
import endPoints from "@services/api";
import axios from "@api/axios";

const ModalConfirmTask = () => {
  const { isOpenConfirmTask, setIsOpenConfirmTask, idTask, setTasks } =
    useContext(AppContext);

  async function closeModalConfirmRequest() {
    const { _id } = JSON.parse(localStorage.getItem("user"));

    const userId = {
      id_user: _id,
    };

    await axios
      .post(endPoints.tasks.deleteUserTask(idTask), userId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setTimeout(function () {
            setIsOpenConfirmTask(false);
          }, 100);
        }
      });

    async function saveTasks(userId) {
      await axios
        .post(endPoints.tasks.getUserTasks, userId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setTasks(res.data.body.tasks));
    }
    saveTasks(userId);
  }

  function closeModalConfirmTask() {
    setIsOpenConfirmTask(false);
  }

  return (
    <>
      <Transition appear show={isOpenConfirmTask} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModalConfirmTask}
        >
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
                    Message
                    <button
                      type="button"
                      className="h-8 w-8 cursor-pointer"
                      onClick={closeModalConfirmTask}
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </Dialog.Title>
                  <div className="mt-3">
                    <p className="text-sm">
                      Are you sure to delete this element?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-300 shadow-lg px-4 py-2 text-sm font-medium text-black hover:bg-green-400 focus:outline-none"
                      onClick={closeModalConfirmRequest}
                    >
                      Accept
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

export { ModalConfirmTask };
