import { useCallback, useEffect, useState } from "react";

import { recipientService } from "../services/recipient.service";
import { Recipient } from "../types/recipient.types";

export function useRecipients() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecipients = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await recipientService.getRecipients();

      setRecipients(data);
    } catch (error) {
      console.error("Failed to load recipients:", error);
      setError("Failed to load recipients.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients]);

  return {
    recipients,
    loading,
    error,
    refresh: loadRecipients,
  };
}