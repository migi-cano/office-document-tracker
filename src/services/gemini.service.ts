import { GoogleGenAI } from "@google/genai";
import { AiDocumentAnalysis } from "../features/documents/types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ExtractedDocument {
  title: string;
  subject: string;
}

export async function extractDocument(
  ocrText: string
): Promise<AiDocumentAnalysis> {
  const prompt = `
You are an AI assistant that extracts information from office documents.

Extract ONLY these fields.

Return ONLY valid JSON.

{
  "documentType": "",
  "title": "",
  "subject": ""
}

Rules:
- documentType is the classification of the document (e.g. Office Memorandum, Memorandum, Letter, Circular, Office Order).
- title is usually the same as documentType.
- If documentType is "Letter", set the title to "Letter to <recipient>" if the recipient can be identified.
- subject is the main topic or purpose of the document.
- Do not include explanations.
- Do not wrap the JSON in markdown.


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