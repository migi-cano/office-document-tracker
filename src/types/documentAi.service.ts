import { AiDocumentAnalysis } from "./ai-document-analysis.types";
import API_URL from "../config/api";

class DocumentAIService {
  async extractDocument(
    ocrText: string
  ): Promise<AiDocumentAnalysis> {
    const response = await fetch(
      `${API_URL}/api/ai/extract`,
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