import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { dashboardService } from "../services/dashboard.service";

import { Document } from "../../documents/types/document.types";

export function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [totalDocuments, setTotalDocuments] = useState(0);
  const [receivedDocuments, setReceivedDocuments] = useState(0);
  const [pendingDocuments, setPendingDocuments] = useState(0);
  const [releasedDocuments, setReleasedDocuments] = useState(0);
  const [highPriorityDocuments, setHighPriorityDocuments] = useState(0);

  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);

  async function loadDashboard() {
    try {
      setLoading(true);

      const statistics =
        await dashboardService.getStatistics();

      const recent =
        await dashboardService.getRecentDocuments();

      setTotalDocuments(statistics.totalDocuments);
      setReceivedDocuments(statistics.receivedDocuments);
      setPendingDocuments(statistics.pendingDocuments);
      setReleasedDocuments(statistics.releasedDocuments);
      setHighPriorityDocuments(statistics.highPriorityDocuments);

      setRecentDocuments(recent);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  return {
    loading,

    totalDocuments,
    receivedDocuments,
    pendingDocuments,
    releasedDocuments,
    highPriorityDocuments,

    recentDocuments,

    refresh: loadDashboard,
  };
}