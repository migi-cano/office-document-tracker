export interface DashboardGreetingProps {
  greeting: string;
  name: string;
  unreadCount?: number;
  onNotificationPress: () => void;
}