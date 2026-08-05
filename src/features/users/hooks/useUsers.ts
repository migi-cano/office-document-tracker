import { useCallback, useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { UserManagement } from "../types/user-management.types";

export function useUsers() {
  const [users, setUsers] = useState<UserManagement[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);

    try {
      const data = await userService.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    refresh: loadUsers,
  };
}