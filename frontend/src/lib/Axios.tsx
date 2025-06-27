import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API}/api`,
  withCredentials: true, // send the cookie with every request
});
