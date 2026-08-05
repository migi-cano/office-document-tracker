import { useState } from "react";

import {
  CreateUserRequest,
  userService,
} from "../services/user.service";

export function useCreateUser() {
  const [loading, setLoading] =
    useState(false);

  async function createUser(
    data: CreateUserRequest
  ) {
    try {
      setLoading(true);

      await userService.createUser(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    createUser,
    loading,
  };
}