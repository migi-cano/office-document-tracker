import {
  useCallback,
  useEffect,
  useState,
} from "react";

import notificationService from "../services/notification.service";

import { Notification } from "../types/notification.types";

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(false);

    const markAsRead = async (id: string) => {
        await notificationService.markAsRead(id);
        await loadNotifications();
        };

        const markAllAsRead = async () => {
        await notificationService.markAllAsRead();
        await loadNotifications();
        };

  const loadNotifications =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await notificationService.getNotifications();

        setNotifications(data);
      } finally {
        setLoading(false);
      }
    }, []);


  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount =
    notifications.filter(
      (notification) => !notification.isRead
    ).length;

 return {
  notifications,
  unreadCount,
  loading,
  refresh: loadNotifications,
  markAsRead,
  markAllAsRead,
};
}