import axios from "axios";

const baseURL = process.env.ENVIRONMENT === "development" ? process.env.LOCAL_URL : process.env.BACKEND_URL

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})