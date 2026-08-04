import { Department } from "../../types/department.types";

export interface DepartmentCardProps {
  department: Department;
  onEdit?: (department: Department) => void;
  onDelete?: (department: Department) => void;
}