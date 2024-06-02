import React, { useContext } from "react";
import { AppContext } from "@context/Context";

const CategoriesRender = () => {
  const {
    tasks,
    categoriesDashboard,
    setCategoriesDashboard,
    setIsOpenAddCategory,
    setIsOpenEditCategory,
    setIsOpenConfirmCategory,
    setIdCategory
  } = useContext(AppContext);

  async function handleDeleteCategory(id) {
    setIdCategory(id);
    setIsOpenConfirmCategory(true);
  }

  function handleEditCategory(id) {
    setIdCategory(id);
    setIsOpenEditCategory(true);
  }

  function handleAddCategory() {
    setIsOpenAddCategory(true);
  }

  function handleActive(id) {
    const categoryTurn = categoriesDashboard.map((category) => {
      if (category._id === id) {
        return {
          ...category,
          active: !category.active,
        };
      } else {
        return {
          ...category,
        };
      }
    });

    setCategoriesDashboard(categoryTurn);
  }

  return (
    <div className={`flex ${categoriesDashboard.length < 3 && 'justify-center'} items-center lg:flex-col`}>
      <div className="w-20">
        <button
          className="flex w-8 h-8 mx-5 justify-center items-center rounded-full bg-[rgba(117,169,169,0.34)] shadow-lg hover:scale-[105%] hover:bg-[rgba(117,169,169,0.6)] duration-1000 lg:hidden"
          onClick={handleAddCategory}
        >
          <i className="ri-add-line text-xl"></i>
        </button>
      </div>
      {categoriesDashboard.map((userCategory) => (
        <div
          key={userCategory._id}
          className="lg:w-full my-1 py-1 flex justify-between items-center lg:border-b-2 lg:border-gray-400 cursor-pointer"
        >
          <p className="w-20 text-xs font-[500] my-1 ml-3 capitalize ">
            {userCategory.category}
          </p>
          <div className="flex justify-center items-center ml-1">
            <div
              className={`${
                userCategory.active ? "block" : "hidden"
              } flex mr-2`}
            >
              <button
                className="w-6 h-6 flex justify-center items-center rounded-full bg-orange-300 shadow-md hover:scale-105 mr-2"
                onClick={() => handleEditCategory(userCategory._id)}
              >
                <i className="ri-edit-line text-md"></i>
              </button>
              <button
                className="w-6 h-6 flex justify-center items-center rounded-full bg-red-300 shadow-md hover:scale-105"
                onClick={() => handleDeleteCategory(userCategory._id)}
              >
                <i className="ri-delete-bin-7-line text-md"></i>
              </button>
            </div>

            <div className="flex items-center">
              <div
                className={`h-5 w-5 flex justify-center items-center text-xs font-semibold text-gray-600 bg-blue-100 rounded-md shadow-md mr-2 ${
                  !userCategory.active ? "block" : "hidden"
                }`}
              >
                {
                  tasks.filter(
                    (task) => userCategory.category === task.category
                  ).length
                }
              </div>
              <button
                className={`${userCategory.active ? "block" : "hidden"}`}
                onClick={() => handleActive(userCategory._id)}
              >
                <i className="ri-arrow-drop-right-line text-xl font[300]"></i>
              </button>
              <button
                className={`${!userCategory.active ? "block" : "hidden"}`}
                onClick={() => handleActive(userCategory._id)}
              >
                <i className="ri-arrow-down-s-line"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesRender;
