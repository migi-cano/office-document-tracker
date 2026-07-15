export type StatusType =
  | "Received"
  | "Pending"
  | "Released";

export interface StatusBadgeProps {
  status: StatusType;
}