import { useEffect, useState } from "react";

import departmentService from "../services/department.service";
import { Department } from "../types/department.types";

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartments();
  }, []);

  async function loadDepartments() {
    try {
      const data =
        await departmentService.getDepartments();

      setDepartments(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    departments,
    loading,
    refresh: loadDepartments,
  };
}