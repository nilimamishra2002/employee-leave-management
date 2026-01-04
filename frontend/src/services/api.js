import axios from "axios";

const api = axios.create({
  baseURL: "https://employee-leave-management-0yia.onrender.com/api",
  withCredentials: true
});

export default api;
