import { useEffect, useState } from "react";

import { documentService } from "../services/document.service";
import { Document } from "../types/document.types";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);

      const data = await documentService.getDocuments();

      setDocuments(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    documents,
    loading,
    refresh: loadDocuments,
  };
}