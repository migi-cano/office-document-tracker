import { Notification } from "../../types/notification.types";

export interface NotificationCardProps {
  notification: Notification;
  onPress: () => void;
}