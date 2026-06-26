import axios from "axios";

export const API = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
})