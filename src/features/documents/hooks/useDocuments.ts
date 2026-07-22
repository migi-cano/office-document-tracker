import { useEffect, useState } from "react";

import { documentService } from "../services/document.service";
import { Document } from "../types/document.types";

export function useDocuments(search: string) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = async () => {
    setLoading(true);

    try {
      const data = await documentService.getDocuments(search);
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [search]);

  return {
    documents,
    loading,
    refresh: loadDocuments,
  };
}