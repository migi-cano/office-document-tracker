import { useMemo } from "react";

import { useDocuments } from "../../documents/hooks/useDocuments";

export function useDashboard() {
  const { documents, loading, refresh } = useDocuments();

  const stats = useMemo(() => {
    const totalDocuments = documents.length;

    const receivedDocuments = documents.filter(
      (document) => document.status === "Received"
    ).length;

    const pendingDocuments = documents.filter(
      (document) => document.status === "Pending"
    ).length;

    const releasedDocuments = documents.filter(
      (document) => document.status === "Released"
    ).length;

    const highPriorityDocuments = documents.filter(
      (document) => document.priority === "High"
    ).length;

    const recentDocuments = [...documents]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    return {
      totalDocuments,
      receivedDocuments,
      pendingDocuments,
      releasedDocuments,
      highPriorityDocuments,
      recentDocuments,
    };
  }, [documents]);

  return {
    ...stats,
    loading,
    refresh,
  };
}