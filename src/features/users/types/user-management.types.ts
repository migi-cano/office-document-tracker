export interface UserManagement {
  id: string;
  auth_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "Admin" | "Staff";
  is_active: boolean;
}