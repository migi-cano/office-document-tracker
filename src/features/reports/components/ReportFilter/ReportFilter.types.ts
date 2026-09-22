import { ReportPeriod } from "../../types/report.types";

export interface ReportFilterProps {
  value: ReportPeriod;
  onChange: (period: ReportPeriod) => void;
}