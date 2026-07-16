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

  async getDocumentById(id: string): Promise<Document | undefined> {
  return mockDocuments.find((document) => document.id === id);
}

async updateDocument(
  id: string,
  data: Partial<Document>
): Promise<Document | undefined> {
  const index = mockDocuments.findIndex(
    document => document.id === id
  );

  if (index === -1) {
    return undefined;
  }

  mockDocuments[index] = {
    ...mockDocuments[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return mockDocuments[index];
}

}

export const documentService = new DocumentService();