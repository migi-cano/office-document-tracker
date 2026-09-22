export type ReportPeriod =
  | "day"
  | "week"
  | "month"
  | "year";

export interface ReportPeriodOption {
  label: string;
  value: ReportPeriod;
}

export interface ReportSummary {
  total: number;
  incoming: number;
  outgoing: number;
  pending: number;
  released: number;
  received: number;
  completed: number;
}

export interface ReportDocumentType {
  type: string;
  count: number;
}

export interface ReportDepartment {
  name: string;
  count: number;
  direction: "IN" | "OUT";
}

export interface ReportMonthlyActivity {
  month: string;
  incoming: number;
  outgoing: number;
  total: number;
}