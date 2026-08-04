import axios from "axios";

const api = axios.create({
  // Android Emulator
  // baseURL: "http://10.0.2.2:3000/api",

  // Physical Android phone
  baseURL: "http://192.168.103.102:3000/api",

  // iOS Simulator
  // baseURL: "http://localhost:3000/api",
});

export default api;