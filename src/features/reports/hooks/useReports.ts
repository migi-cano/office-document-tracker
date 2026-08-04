import { useCallback, useEffect, useState } from "react";

import reportService from "../services/report.service";
import { ReportSummary } from "../types/report.types";

export function useReports() {
  const [summary, setSummary] =
    useState<ReportSummary>({
      incoming: 0,
      outgoing: 0,
      pending: 0,
      completed: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await reportService.getSummary();

      setSummary(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  return {
    summary,
    loading,
    refresh: loadReports,
  };
}