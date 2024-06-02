import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {

  const tasksCategories  = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).tasksCategories : [];

  //Login
  const [isOpenWelcome, setIsOpenWelcome] = useState(false);

  //Signup
  const [statusSignup, setStatusSignup] = useState(null);

  //Dashboard
  const [isOpenConfirmCategory, setIsOpenConfirmCategory] = useState(false);
  const [isOpenConfirmTask, setIsOpenConfirmTask] = useState(false);

  //Dashboard User's categories
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
  const [userCategories, setUserCategories] = useState(tasksCategories);
  const [categoriesDashboard, setCategoriesDashboard] = useState(tasksCategories)
  const [idCategory, setIdCategory] = useState(null);

  //Dashboard User's settings
  const [isOpenUpdateUserData, setIsOpenUpdateUserData] = useState(false);
  const [isOpenUpdateUserPassword, setIsOpenUpdateUserPassword] = useState(false);
  const [messageDashboard, setMessageDashboard] = useState(null);

  //Dashboard User's Tasks
  const [tasks, setTasks] = useState([]);
  const [isOpenTask, setIsOpenTask] = useState(false);
  const [isOpenTaskEdit, setIsOpenTaskEdit] = useState(false);

  const [idTask, setIdTask] = useState(null);
  const [isOpenTaskInfo, setIsOpenTaskInfo] = useState(false);

  useEffect(() => {
    const categoriesRemasterized = userCategories.map((category) => {
      return {
        ...category,
        active: false,
      };
    });

    setCategoriesDashboard(categoriesRemasterized);
    
  }, [userCategories]);

  return (
    <AppContext.Provider
      value={{
        isOpenWelcome,
        setIsOpenWelcome,
        statusSignup,
        setStatusSignup,
        isOpenConfirmCategory,
        setIsOpenConfirmCategory,
        isOpenConfirmTask,
        setIsOpenConfirmTask,
        isOpenAddCategory,
        setIsOpenAddCategory,
        isOpenEditCategory,
        setIsOpenEditCategory,
        userCategories,
        setUserCategories,
        categoriesDashboard,
        setCategoriesDashboard,
        idCategory,
        setIdCategory,
        messageDashboard,
        setMessageDashboard,
        isOpenUpdateUserData,
        setIsOpenUpdateUserData,
        isOpenUpdateUserPassword,
        setIsOpenUpdateUserPassword,
        tasks,
        setTasks,
        isOpenTask,
        setIsOpenTask,
        isOpenTaskEdit,
        setIsOpenTaskEdit,
        idTask,
        setIdTask,
        isOpenTaskInfo,
        setIsOpenTaskInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
