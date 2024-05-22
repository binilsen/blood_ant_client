import axios from "axios";

const newAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Add a request interceptor
newAxios.interceptors.request.use(
  function (config) {
    const token = `Token ${localStorage.getItem("ba-token")}`;
    config.headers.Authorization = token;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default newAxios;
