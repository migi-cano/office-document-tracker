import { supabase } from "../../../lib/supabase";

import {
  CreateRecipientRequest,
  Recipient,
  UpdateRecipientRequest,
} from "../types/recipient.types";

function toRecipient(row: any): Recipient {
  return {
    id: row.id,
    name: row.name,
    department: row.department,
    qrToken: row.qr_token,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class RecipientService {
  async getRecipients(): Promise<Recipient[]> {
    const { data, error } = await supabase
      .from("recipients")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(toRecipient);
  }

  async getRecipientById(
    id: string
  ): Promise<Recipient> {
    const { data, error } = await supabase
      .from("recipients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return toRecipient(data);
  }

  async getRecipientByQrToken(
    qrToken: string
  ): Promise<Recipient> {
    const { data, error } = await supabase
      .from("recipients")
      .select("*")
      .eq("qr_token", qrToken)
      .eq("is_active", true)
      .single();

    if (error) {
      throw error;
    }

    return toRecipient(data);
  }

  async createRecipient(
    recipient: CreateRecipientRequest
  ): Promise<Recipient> {
    const { data, error } = await supabase
      .from("recipients")
      .insert({
        name: recipient.name.trim(),
        department: recipient.department.trim(),
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return toRecipient(data);
  }

  async updateRecipient(
    id: string,
    recipient: UpdateRecipientRequest
  ): Promise<Recipient> {
    const { data, error } = await supabase
      .from("recipients")
      .update({
        name: recipient.name.trim(),
        department: recipient.department.trim(),
        is_active: recipient.isActive,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return toRecipient(data);
  }

  async deactivateRecipient(
    id: string
  ): Promise<void> {
    const { error } = await supabase
      .from("recipients")
      .update({
        is_active: false,
      })
      .eq("id", id);

    if (error) {
      throw error;
    }
  }
}

export const recipientService =
  new RecipientService();