export type UserRole = "Admin" | "Staff";

export interface User {
  id: string;

  authId: string;

  username: string;

  firstName: string;

  lastName: string;

  email: string;

  departmentId: string;

  role: UserRole;

  isActive: boolean;
}