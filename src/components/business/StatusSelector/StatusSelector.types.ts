import { DocumentStatus } from "../../../features/documents/types/document.types";

export interface StatusSelectorProps {
  value: DocumentStatus;
  onChange: (status: DocumentStatus) => void;
}