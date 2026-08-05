import { useEffect, useState } from "react";

import { userService } from "../services/user.service";
import { UserManagement } from "../types/user-management.types";

export function useUser(id: string) {
  const [user, setUser] =
    useState<UserManagement>();

  const [loading, setLoading] =
    useState(true);

  async function loadUser() {
    setLoading(true);

    try {
      const data =
        await userService.getUserById(id);

      setUser(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, [id]);

  return {
    user,
    loading,
    refresh: loadUser,
  };
}