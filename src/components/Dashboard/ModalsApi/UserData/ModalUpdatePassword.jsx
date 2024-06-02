import React, { Fragment, useContext, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AppContext } from "@context/Context";
import SpinnerDashboard from "@components/Dashboard/SpinnerDashboard";
import endPoints from "@services/api";
import axios from "@api/axios";

const ModalUpdateUserPassword = () => {
  const {
    isOpenUpdateUserPassword,
    setIsOpenUpdateUserPassword,
    messageDashboard,
    setMessageDashboard,
  } = useContext(AppContext);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  function closeModalUserPassword() {
    setIsOpenUpdateUserPassword(false);
    setMessageDashboard("");
  }

  async function handleUpdateUserPassword() {
    setMessageDashboard(null);

    const { _id } = JSON.parse(localStorage.getItem("user"));

    const userPassword = {
      password,
      newPassword,
      newPasswordRepeat,
    };
    
    await axios
      .put(endPoints.user.updatedUserPassword(_id), userPassword, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoading(true);
        if (res.status === 200) {
          setTimeout(function () {
            setMessageDashboard(res.data.body.message);
            setLoading(false);
            setIsOpenUpdateUserPassword(false);
            setMessageDashboard(null);
            loadUser();
          }, 2000);
        } else {
          setMessageDashboard(res.data.body.message);
          setIsOpenUpdateUserData(true);
        }
      })
      .catch((error) => {
        const errorData = error.response.data.body.message;
        setMessageDashboard(errorData);
        setIsOpenUpdateUserPassword(true);
      });
  }

  return (
    <div>
      <Transition appear show={isOpenUpdateUserPassword} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModalUserPassword}
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
                <Dialog.Panel className="w-96 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-md font-medium leading-6 text-gray-900 flex justify-between mx-3"
                  >
                    Update Password
                    <button
                      type="button"
                      className="h-8 w-8 cursor-pointer"
                      onClick={closeModalUserPassword}
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </Dialog.Title>
                  <section className="mt-2 mx-5">
                    <div className="my-2">
                      <p className="text-sm mb-1">Current password:</p>
                      <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
                        <input
                          type="password"
                          name="current-password"
                          id="current-password"
                          className="h-8 rounded-sm w-72 text-sm capitalize border-none"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <p className="text-sm mb-1">New password:</p>
                      <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
                        <input
                          type="password"
                          name="new-password"
                          id="new-password"
                          className="h-8 rounded-sm w-72 text-sm capitalize border-none"
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <p className="text-sm mb-1">Confirm new password:</p>
                      <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
                        <input
                          type="password"
                          name="new-password-repeat"
                          id="new-password-repeat"
                          className="h-8 rounded-sm w-72 text-sm border-none"
                          onChange={(e) => setNewPasswordRepeat(e.target.value)}
                        />
                      </div>
                    </div>
                    {messageDashboard && (
                      <div className="flex justify-center mt-5">
                        <p className="bg-red-200 px-2 py-1 rounded-md text-sm">
                          {messageDashboard}
                        </p>
                      </div>
                    )}
                  </section>

                  <div className="mt-4 flex justify-end mx-5">
                    <button
                      type="button"
                      className="flex justify-center items-center rounded-md border border-transparent bg-yellow-200 shadow-lg px-3 py-1 text-sm font-medium text-black"
                      onClick={handleUpdateUserPassword}
                    >
                      {loading ? (
                        <SpinnerDashboard />
                      ) : (
                        <div className="flex items-center">
                          <i className="ri-save-fill text-lg mr-2"></i>{" "}
                          <p>Save</p>
                        </div>
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export { ModalUpdateUserPassword };
