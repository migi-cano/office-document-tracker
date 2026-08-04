import { useState } from "react";

import { authService } from "../services/auth.service";
import { LoginRequest } from "../types/auth.types";
import { useAuth } from "../../../providers/AuthProvider";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const { login: signIn } = useAuth();

  async function login(data: LoginRequest) {
    try {
      setLoading(true);

      const response = await authService.login(data);

      console.log("Login Response:", response);

      signIn(response.user);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
  };
}