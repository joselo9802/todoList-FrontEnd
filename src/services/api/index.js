const API = import.meta.env.VITE_API_BACKEND

const endPoints = {
    auth: {
        login: `${API}/login`,
        verifyUser: `${API}/verify`,
        getUser: (id) => `${API}/user/${id}`,
        signup: `${API}/signup`,
        updateUser: (id) => `${API}/user/${id}`,
        deleteUser: (id) => `${API}/user/${id}`,
      },
    categories: {
        addCategory: `${API}/tasks/category`,
        getUserCategories: `${API}/tasks/categories`,
        updatedUserCategory: (id) => `${API}/tasks/category/${id}`,
        deleteUserCategory: (id) => `${API}/tasks/category/${id}`,
    },
    user: {
        updatedUser: (id) => `${API}/user/${id}`,
        updatedUserPassword: (id) => `${API}/user/password/${id}`
    },
    tasks: {
        addUserTask: `${API}/task`,
        getUserTasks: `${API}/tasks`,
        getUserTask: (id) => `${API}/task/${id}`,
        updatedUserTask: (id) => `${API}/task/${id}`,
        deleteUserTask: (id) => `${API}/task/${id}`
    }
};

export default endPoints;