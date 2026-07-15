import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://YOUR_IP:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});