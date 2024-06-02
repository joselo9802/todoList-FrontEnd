import React, { Fragment, useContext, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AppContext } from "@context/Context";
import SpinnerDashboard from "@components/Dashboard/SpinnerDashboard";
import endPoints from "@services/api";
import axios from "@api/axios";

const ModalEditCategory = () => {
  const {
    isOpenEditCategory,
    setIsOpenEditCategory,
    setUserCategories,
    idCategory,
  } = useContext(AppContext);

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(null);

  function closeModalEditCategory() {
    setIsOpenEditCategory(false);
  }

  async function handleEditCategory() {
    const { _id } = JSON.parse(localStorage.getItem("user"));

    const editCategory = {
      id_user: _id,
      category: category,
    };

    await axios
      .put(endPoints.categories.updatedUserCategory(idCategory), editCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoading(true);
        setWarning(null);
        if (res.status === 200) {
          setTimeout(function () {
            setCategory("");
            setIsOpenEditCategory(false);
            localStorage.setItem("user", JSON.stringify(res.data.body.body));
            setUserCategories(
              JSON.parse(localStorage.getItem("user")).tasksCategories
            );
          }, 3000);
        } else {
          setWarning(res.data.body.message);
          setIsOpenEditCategory(true);
        }
      })
      .catch((error) => {
        const errorProcess = error.response.data.body.message;
        setWarning(errorProcess);
        setIsOpenEditCategory(true);
        if (!category) {
          setCategory(category);
        }
      });
  }

  useEffect(() => {
    async function loadUserCategories() {
      const { _id } = JSON.parse(localStorage.getItem("user"));
      const userId = {
        id_user: _id,
      };
      const options = {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      };
      await axios
        .post(endPoints.categories.getUserCategories, userId, options)
        .then((res) => setUserCategories(res.data.body.categories));
    }
    loadUserCategories();
  }, []);

  return (
    <>
      <Transition appear show={isOpenEditCategory} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModalEditCategory}
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
                    className="text-md font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    Edit Category
                    <button
                      type="button"
                      className="h-8 w-8 cursor-pointer"
                      onClick={closeModalEditCategory}
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="border-b-[1.5px] border-black mx-1 hover:scale-[102%] duration-500 shadow-sm">
                      <input
                        className="w-full text-sm capitalize border-none"
                        placeholder="Write your category"
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex justify-center mt-2">
                      {warning && (
                        <p className="bg-red-300 text-center py-1 rounded-md w-[50%] text-sm">
                          {warning}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="flex justify-center items-center rounded-md border border-transparent bg-yellow-200 shadow-lg px-3 py-1 text-sm font-medium text-black"
                      onClick={handleEditCategory}
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
    </>
  );
};

export { ModalEditCategory };
