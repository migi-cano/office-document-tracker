import { useCallback, useEffect, useState } from "react";

import { DocumentHistory } from "./documentHistory.types";
import { documentHistoryService } from "./documentHistory.service";

export function useDocumentHistory(
  documentId: string
) {
  const [history, setHistory] = useState<DocumentHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = useCallback(async () => {
    setLoading(true);

    try {
      const result =
        await documentHistoryService.getHistory(
          documentId
        );

      setHistory(result);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    history,
    loading,
    refresh: loadHistory,
  };
}