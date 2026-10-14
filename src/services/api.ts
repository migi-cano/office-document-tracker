import axios from "axios";
import { supabase } from "../lib/supabase";
import API_URL from "../config/api";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization =
        `Bearer ${session.access_token}`;
    }

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log(
      "API BASE URL:",
      API_URL
    );

    console.log(
      "SUPABASE SESSION:",
      session ? "EXISTS" : "MISSING"
    );

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;