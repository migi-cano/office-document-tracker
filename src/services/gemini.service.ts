import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ExtractedDocument {
  title: string;
  subject: string;
}

export async function extractDocument(
  ocrText: string
): Promise<ExtractedDocument> {
  const prompt = `
You are an AI assistant that extracts information from office documents.

Extract ONLY these fields.

Return ONLY valid JSON.

{
  "title": "",
  "subject": ""
}

Rules:
- Title is the document type (e.g. Office Memorandum, Memorandum, Letter, Circular, Office Order).
- Subject is the main topic of the document.
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