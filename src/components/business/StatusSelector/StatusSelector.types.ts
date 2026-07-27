import {
  DocumentDirection,
  DocumentStatus,
} from "../../../features/documents/types/document.types";

export interface StatusSelectorProps {
  value: DocumentStatus;
  direction: DocumentDirection;
  onChange: (status: DocumentStatus) => void;
}