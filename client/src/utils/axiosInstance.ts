import axios from "axios";
import toast from "react-hot-toast";

const _axios = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:3001/api/",
  withCredentials: true,
});

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const messages = error.response?.data?.errorMessage;

    if (messages) {
      if (Array.isArray(messages)) {
        messages.forEach((message: string) => {
          toast.error(message);
        });
      } else {
        toast.error(String(messages));
      }
    }

    return Promise.reject(error);
  },
);
export default _axios;
