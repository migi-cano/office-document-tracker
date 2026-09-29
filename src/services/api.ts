import axios from "axios";
import { supabase } from "../lib/supabase";

const api = axios.create({
  // Android Emulator
  // baseURL: "http://10.0.2.2:3000/api",

  // Physical Android phone
  baseURL: "http://192.168.101.111:3000/api",

  // iOS Simulator
  // baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log(
      "SUPABASE SESSION:",
      session ? "EXISTS" : "MISSING"
    );

    console.log(
      "ACCESS TOKEN:",
      session?.access_token
        ? "EXISTS"
        : "MISSING"
    );

    if (session?.access_token) {
      config.headers.Authorization =
        `Bearer ${session.access_token}`;
    }

    console.log(
      "AUTH HEADER:",
      config.headers.Authorization
        ? "SET"
        : "MISSING"
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;