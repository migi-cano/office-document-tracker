import { Document } from "../../../features/documents/types/document.types";

export interface DocumentCardProps {
  document: Document;
  onPress?: () => void;
}