export interface ExtractedDocument {
  imageUri: string;
  fullText: string;

  title?: string;
  subject?: string;
  destination?: string;
  processedBy?: string;
  receivedBy?: string;
  remarks?: string;
}