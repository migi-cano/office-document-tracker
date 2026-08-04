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

    class UserService {
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
  throw new Error(`No profile found for auth_id: ${authId}`);
}

return toUser(data[0]);
    }

    async getUsers(): Promise<UserManagement[]> {
  const { data } = await api.get("/users");

  return data;
}
    }

    export const userService = new UserService();