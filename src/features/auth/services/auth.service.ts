import { LoginRequest, LoginResponse } from "../types/auth.types";

export const authService = {
  async login(
    credentials: LoginRequest
  ): Promise<LoginResponse> {

    console.log("Logging in...", credentials);

    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      accessToken: "sample-access-token",
      refreshToken: "sample-refresh-token",

      user: {
        id: "1",
        username: credentials.username,
        firstName: "Juan",
        lastName: "Dela Cruz",
        email: "juan@example.com",

        departmentId: "admin",
        role: "Admin",
        isActive: true,
      },
    };
  },
};