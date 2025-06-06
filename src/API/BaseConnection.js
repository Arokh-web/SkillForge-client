import axios from "axios";

axios.defaults.withCredentials = true;

const axiosConnection = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
});

export default axiosConnection;
