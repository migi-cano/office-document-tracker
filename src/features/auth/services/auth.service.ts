import { supabase } from "../../../lib/supabase";
import { userService } from "../../users/services/user.service";

import {
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

export const authService = {
  async login(
  credentials: LoginRequest
): Promise<LoginResponse> {

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: credentials.username,
      password: credentials.password,
      
    });
    console.log("Auth User ID:", data.user?.id);
    console.log("Auth Email:", data.user?.email);

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("User not found.");
  }

  const profile =
    await userService.getCurrentUser(
      data.user.id
    );
    console.log("Loaded Profile:", profile);

    return {
    accessToken:
      data.session?.access_token ?? "",

    refreshToken:
      data.session?.refresh_token ?? "",

    user: profile,
  };
  
},

async logout() {
  await supabase.auth.signOut();
},
}