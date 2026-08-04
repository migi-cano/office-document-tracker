import { useCallback, useEffect, useState } from "react";

import departmentService from "../services/department.service";
import { Department } from "../types/department.types";

export function useDepartmentsScreen() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDepartments = useCallback(async () => {
    try {
      setLoading(true);

      const data = await departmentService.getDepartments();

      setDepartments(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  return {
    departments,
    loading,
    refresh: loadDepartments,
  };
}