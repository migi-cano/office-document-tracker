import { Document } from "../../../documents/types/document.types";

export interface RecentDocumentCardProps {
  document: Document;
  onPress?: () => void;
}