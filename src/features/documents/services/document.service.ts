import { mockDocuments } from "../data/mockDocuments";
import { Document } from "../types/document.types";

class DocumentService {
  async getDocuments(): Promise<Document[]> {
    return [...mockDocuments];
  }

  async addDocument(document: Document): Promise<Document> {
    mockDocuments.unshift(document);
    return document;
  }
}

export const documentService = new DocumentService();