import axios from "axios";

const API = import.meta.env.VITE_API_BACKEND

const instance = axios.create({
    baseURL: API,
    withCredentials: true
})

export default instance;