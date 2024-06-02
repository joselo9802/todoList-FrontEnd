import React, { Fragment, useContext } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AppContext } from "@context/Context";

const ModalTasks = ({
  isOpenMessageTask,
  setIsOpenMessageTask,
  messageTask
}) => {
  const { setIsOpenTaskEdit, setIsOpenTask } = useContext(AppContext);

  function closeModalMessageTask() {
    setIsOpenMessageTask(false);
    messageTask.status != 400 && setIsOpenTask(false);
    messageTask.status != 400 && setIsOpenTaskEdit(false);
  }

  return (
    <>
      <Transition appear show={isOpenMessageTask} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModalMessageTask}
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
                    className="text-md font-medium leading-6 text-gray-900"
                  >
                    Message
                  </Dialog.Title>
                  <div className="mt-3">
                    <p className="text-sm">{messageTask.message}</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-300 shadow-lg px-4 py-2 text-sm font-medium text-black hover:bg-green-400 focus:outline-none"
                      onClick={closeModalMessageTask}
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

export { ModalTasks };
