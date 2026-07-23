import { AiDocumentAnalysis } from "./ai-document-analysis.types";

class DocumentAIService {
    
  async extractDocument(
  ocrText: string
): Promise<AiDocumentAnalysis> {
    const response = await fetch(
      "http://192.168.102.70:3000/api/ai/extract",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ocrText,
        }),
      }
    );
    

    if (!response.ok) {
  const error = await response.text();

  console.log("===== AI SERVER ERROR =====");
  console.log(error);

  throw new Error(error);
}

    return (await response.json()) as AiDocumentAnalysis;
  }
}

export const documentAIService = new DocumentAIService();