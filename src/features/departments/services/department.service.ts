import { supabase } from "../../../lib/supabase";
import { Department } from "../types/department.types";

class DepartmentService {
  async getDepartments(): Promise<Department[]> {
 const { data, error, status } = await supabase
  .from("departments")
  .select("*");

console.log("Status:", status);
console.log("Data:", data);
console.log("Error:", error);

  if (error) {
    throw error;
  }

  return data ?? [];
}
}

export default new DepartmentService();