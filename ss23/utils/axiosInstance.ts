import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://192.168.1.224/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});