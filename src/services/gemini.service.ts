import { GoogleGenAI } from "@google/genai";
import { AiDocumentAnalysis } from "../features/documents/types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ExtractedDocument {
  title: string;
  subject: string;
  remarks: string;
}

export async function extractDocument(
  ocrText: string
): Promise<AiDocumentAnalysis> {
  const prompt = `
You are an AI assistant that extracts structured information from office documents.

Extract ONLY these fields.

Return ONLY valid JSON.

{
  "documentType": "",
  "title": "",
  "subject": "",
  "remarks": ""
}

Rules:

- documentType is the classification of the document.
  Examples:
  - Office Memorandum
  - Regional Memorandum
  - Letter
  - Circular
  - Office Order
  - Request
  - Notice
  - Resolution

- title is usually the same as documentType.
- If documentType is "Letter", set the title to "Letter to <recipient>" if the recipient can be identified.
- subject is the main topic or purpose of the document.

REMARks / MONETARY INFORMATION:

- remarks is ONLY for important monetary information found in the document.
- If the document contains a "Total Amount", "Total Cost", "Total Project Cost", "Total Budget", "Total Allocation", "Grand Total", "Overall Amount", or equivalent wording, ALWAYS prioritize and include the total amount in remarks.
- Clearly identify it as the total amount.

- If a total amount exists, use this format when appropriate:
  "Total amount: <amount>."

- If the document contains a total amount AND other important monetary amounts that explain the total, include them concisely.

- Example:
  If the document says:
  "The total project cost is PHP 150,000, with PHP 100,000 allocated for materials and PHP 50,000 for labor."

  Return:
  "remarks": "Total amount: PHP 150,000; PHP 100,000 for materials; PHP 50,000 for labor."

- If there is no total amount but there are other important monetary amounts, extract those amounts and briefly state what they are for.

- Example:
  If the document says:
  "An amount of ₱50,000.00 is allocated for the purchase of office equipment."

  Return:
  "remarks": "₱50,000.00 allocated for the purchase of office equipment."

- Preserve the currency and amount exactly as written whenever possible.
- Include multiple monetary amounts only when they are relevant.
- If a total amount exists, do NOT omit it even when other monetary amounts are present.
- Do NOT invent, estimate, calculate, or infer monetary amounts.
- Do NOT calculate a total from individual amounts unless the document explicitly states the total.
- Do NOT put general document information in remarks.
- Do NOT put the subject in remarks unless it is directly related to a monetary amount.
- Keep remarks concise and useful for a document tracker.
- If there is NO monetary information, set remarks to "".

Examples:

Example 1:
Document:
"Total amount requested: ₱250,000.00."

Return:
"remarks": "Total amount: ₱250,000.00."

Example 2:
Document:
"Total project cost is PHP 150,000, consisting of PHP 100,000 for materials and PHP 50,000 for labor."

Return:
"remarks": "Total amount: PHP 150,000; PHP 100,000 for materials; PHP 50,000 for labor."

Example 3:
Document:
"Budget allocation for the activity is PHP 75,000."

Return:
"remarks": "PHP 75,000 allocated as budget."

Example 4:
Document contains no monetary information.

Return:
"remarks": ""

Do not include explanations.
Do not wrap the JSON in markdown.

OCR Text:
${ocrText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  const text =
    response.text
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim() ?? "{}";

  return JSON.parse(text);
}