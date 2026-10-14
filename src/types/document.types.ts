export interface ExtractedDocument {
  title: string;
  subject: string;
  documentType: string;
  remarks: string;
}

export const DOCUMENT_TYPES = [
  { label: "Regional Memorandum", value: "Regional Memorandum" },
  { label: "Letter", value: "Letter" },
  { label: "Office Memorandum", value: "Office Memorandum" },
  { label: "Purchase Order", value: "Purchase Order" },
  { label: "Invoice", value: "Invoice" },
  { label: "Delivery Receipt", value: "Delivery Receipt" },
  { label: "Certification", value: "Certification" },
  { label: "Contract", value: "Contract" },
  { label: "Report", value: "Report" },
  { label: "Others", value: "Others" },
];