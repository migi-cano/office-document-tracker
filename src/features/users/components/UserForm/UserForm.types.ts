import { UserFormData } from "../../validation/user.schema";
import { Switch, View } from "react-native";

export interface UserFormProps {
  loading?: boolean;

  defaultValues?: Partial<UserFormData>;

  submitTitle?: string;

  readOnlyEmail?: boolean;

  showPassword?: boolean;

  isActive?: boolean;

  onStatusChange?: (value: boolean) => void;

  onSubmit: (
    data: UserFormData
  ) => Promise<void>;
}