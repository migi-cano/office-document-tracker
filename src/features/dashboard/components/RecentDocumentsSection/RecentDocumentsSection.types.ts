import { Document } from "../../../documents/types/document.types";

export interface RecentDocumentsSectionProps {
  documents: Document[];
  onViewAll?: () => void;
  onPressDocument?: (documentId: string) => void;
}