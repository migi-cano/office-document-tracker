export interface Notification {
  id: string;

  title: string;

  message: string;

  documentId?: string;

  isRead: boolean;

  createdAt: string;
}