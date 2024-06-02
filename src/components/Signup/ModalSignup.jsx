import React, { Fragment, useContext } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AppContext } from "@context/Context";
import { useNavigate } from "react-router-dom";

const ModalSignUp = ({isOpenSignup, setIsOpenSignup, messageSignup, setMessageSignup}) => {
  const { statusSignup } =
    useContext(AppContext);
  const route = useNavigate();

  function closeModal() {
    setIsOpenSignup(false);
    statusSignup === 200 && route("/");
    setMessageSignup(null);
  }

  return (
    <>
      <Transition appear show={isOpenSignup} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto opacity-95">
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
                    className="text-sm mb-5 font-medium leading-6 text-gray-900"
                  >
                    Message
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-black">{messageSignup}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-black hover:bg-green-400 focus:outline-none"
                      onClick={() => closeModal()}
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

export { ModalSignUp };
