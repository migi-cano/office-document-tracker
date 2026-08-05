import { supabase } from "../../../lib/supabase";
import { User } from "../../auth/types/user.types";
import api from "../../../services/api";
import { UserManagement } from "../types/user-management.types";

const toUser = (row: any): User => ({
  id: row.id,
  authId: row.auth_id,
  username: row.email,
  firstName: row.first_name,
  lastName: row.last_name,
  email: row.email,
  departmentId: "",
  role: row.role,
  isActive: row.is_active,
});

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "Admin" | "Staff";
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  role: "Admin" | "Staff";
  isActive: boolean;
}

class UserService {
  async getUserById(
  id: string
): Promise<UserManagement> {
  const { data } = await api.get(
    `/users/${id}`
  );

  return data;
}
  async createUser(user: CreateUserRequest) {
    const { data } = await api.post(
      "/users",
      user
    );

    return data;
  }

  async getCurrentUser(
    authId: string
  ): Promise<User> {
    console.log("Looking for auth_id:", authId);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", authId);

    console.log("Supabase Data:", data);
    console.log("Supabase Error:", error);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error(
        `No profile found for auth_id: ${authId}`
      );
    }

    return toUser(data[0]);
  }

  async getUsers(): Promise<UserManagement[]> {
    const { data } = await api.get("/users");

    return data;
  }

  async updateUser(
    id: string,
    user: UpdateUserRequest
  ) {
    const { data } = await api.put(
      `/users/${id}`,
      user
    );

    return data;
  }
}

export const userService = new UserService();