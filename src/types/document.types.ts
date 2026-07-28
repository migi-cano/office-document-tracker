export interface ExtractedDocument {
  title: string;
  subject: string;
  documentType: string;
}

export const DOCUMENT_TYPES = [
  { label: "Memorandum", value: "Memorandum" },
  { label: "Letter", value: "Letter" },
  { label: "Office Order", value: "Office Order" },
  { label: "Purchase Order", value: "Purchase Order" },
  { label: "Invoice", value: "Invoice" },
  { label: "Delivery Receipt", value: "Delivery Receipt" },
  { label: "Certification", value: "Certification" },
  { label: "Contract", value: "Contract" },
  { label: "Report", value: "Report" },
  { label: "Others", value: "Others" },
];