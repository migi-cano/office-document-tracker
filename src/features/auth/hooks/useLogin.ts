import { useState } from "react";

import { authService } from "../services/auth.service";
import { LoginRequest } from "../types/auth.types";
import { useAuth } from "../../../providers/AuthProvider";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login: signIn } = useAuth();

  async function login(data: LoginRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await authService.login(data);

      signIn(response.user);

      return response;
    } catch (error) {
      console.error("Login error:", error);

      setError("Incorrect email or password.");

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}