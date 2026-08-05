export interface RolePickerProps {
  value: "Admin" | "Staff";

  onChange: (
    value: "Admin" | "Staff"
  ) => void;
}