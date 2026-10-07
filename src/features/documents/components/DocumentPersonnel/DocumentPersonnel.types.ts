import { Document } from "../../types/document.types";
import { Recipient } from "../../../recipients/types/recipient.types";

export interface DocumentPersonnelProps {
  document: Document;
  recipient?: Recipient;
}