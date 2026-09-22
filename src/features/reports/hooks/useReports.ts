import {
  useCallback,
  useEffect,
  useState,
} from "react";

import reportService from "../services/report.service";

import {
  ReportDepartment,
  ReportDocumentType,
  ReportMonthlyActivity,
  ReportPeriod,
  ReportSummary,
} from "../types/report.types";

export function useReports() {
  const [period, setPeriod] =
    useState<ReportPeriod>("month");

  const [summary, setSummary] = useState<ReportSummary>({
    total: 0,
    incoming: 0,
    outgoing: 0,
    pending: 0,
    released: 0,
    received: 0,
    completed: 0,
  });

  const [documentTypes, setDocumentTypes] =
    useState<ReportDocumentType[]>([]);

  const [departments, setDepartments] =
    useState<ReportDepartment[]>([]);

  const [monthlyActivity, setMonthlyActivity] =
    useState<ReportMonthlyActivity[]>([]);

  const [loading, setLoading] = useState(true);

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);

      const [
        summaryData,
        documentTypesData,
        departmentsData,
        monthlyActivityData,
      ] = await Promise.all([
        reportService.getSummary(period),
        reportService.getDocumentTypes(period),
        reportService.getDepartments(period),
        reportService.getMonthlyActivity(period),
      ]);

      setSummary(summaryData);
      setDocumentTypes(documentTypesData);
      setDepartments(departmentsData);
      setMonthlyActivity(monthlyActivityData);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  return {
    period,
    setPeriod,
    summary,
    documentTypes,
    departments,
    monthlyActivity,
    loading,
    refresh: loadReports,
  };
}