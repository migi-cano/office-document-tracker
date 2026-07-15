export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;

  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;

    departmentId: string;
    role: "Admin" | "Staff";

    isActive: boolean;
  };
}