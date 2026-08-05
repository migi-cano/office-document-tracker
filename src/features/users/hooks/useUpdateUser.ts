import { useState } from "react";

import { userService } from "../services/user.service";

export function useUpdateUser() {
  const [loading, setLoading] =
    useState(false);

  async function updateUser(
    id: string,
    data: any
  ) {
    try {
      setLoading(true);

      await userService.updateUser(
        id,
        data
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    updateUser,
    loading,
  };
}