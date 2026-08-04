import { Notification } from "../../types/notification.types";

export interface NotificationPopoverProps {
  visible: boolean;

  notifications: Notification[];

  unreadCount: number;

  onClose: () => void;

  onViewAll: () => void;

  onPressNotification: (
    notification: Notification
  ) => void;
}