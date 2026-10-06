import { useState } from "react";

import { recipientService } from "../services/recipient.service";
import {
  CreateRecipientRequest,
  Recipient,
} from "../types/recipient.types";

export function useCreateRecipient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createRecipient = async (
    data: CreateRecipientRequest
  ): Promise<Recipient | null> => {
    try {
      setLoading(true);
      setError("");

      const recipient =
        await recipientService.createRecipient(data);

      return recipient;
    } catch (error) {
      console.error(
        "Failed to create recipient:",
        error
      );

      setError("Failed to create recipient.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createRecipient,
    loading,
    error,
  };
}