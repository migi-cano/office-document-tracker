import { UserManagement } from "../../types/user-management.types";

export interface UserCardProps {
  user: UserManagement;
  onPress: () => void;
}