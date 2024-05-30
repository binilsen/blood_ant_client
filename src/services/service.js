import axios from "axios";
import { useLoader } from "../stores/loader";

const newAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Add a request interceptor
newAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("ba-token");
    if (token) config.headers.Authorization = token;
    config.headers["Content-Type"] = "application/json";
    useLoader.getState().show();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
newAxios.interceptors.response.use(
  function (response) {
    useLoader.getState().hide();

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    useLoader.getState().hide();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default newAxios;
