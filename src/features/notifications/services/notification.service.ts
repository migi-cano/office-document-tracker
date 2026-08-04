import { supabase } from "../../../lib/supabase";

import { Notification } from "../types/notification.types";

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      message: item.message,
      documentId: item.document_id,
      isRead: item.is_read,
      createdAt: item.created_at,
    }));
  }

  async createNotification(data: {
    title: string;
    message: string;
    documentId?: string;
  }) {
    const { error } = await supabase
      .from("notifications")
      .insert({
        title: data.title,
        message: data.message,
        document_id: data.documentId,
      });

    if (error) {
      throw error;
    }
  }

  async markAsRead(id: string) {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    if (error) {
      throw error;
    }
  }

  async markAllAsRead() {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("is_read", false);

    if (error) {
      throw error;
    }
  }
}

export default new NotificationService();