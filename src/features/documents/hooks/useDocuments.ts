import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { documentService } from "../services/document.service";
import { Document } from "../types/document.types";

export function useDocuments(search: string) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = useCallback(async () => {
    console.log("Loading documents...");
    setLoading(true);

    try {
      const data = await documentService.getDocuments(search);
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  useFocusEffect(
    useCallback(() => {
      loadDocuments();
    }, [loadDocuments])
  );

  return {
    documents,
    loading,
    refresh: loadDocuments,
  };
}