export type UserRole =
  | "ADMIN"
  | "STAFF"
  | "VIEWER";

export interface UserProfile {
  id: string;

  fullName: string;

  department?: string;

  role: UserRole;

  createdAt: string;
}