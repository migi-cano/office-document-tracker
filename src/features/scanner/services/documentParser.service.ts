import { ExtractedDocument } from "../types/ocr.types";

class DocumentParserService {
  parse(
    imageUri: string,
    fullText: string
  ): ExtractedDocument {
    const text = fullText.replace(/\r/g, "");

    return {
      imageUri,
      fullText,

      title: this.extractTitle(text),
      subject: this.extractSubject(text),
      destination: this.extractDestination(text),
      processedBy: "",
      receivedBy: "",
      remarks: "",
    };
  }

  private extractTitle(text: string): string {
    const match = text.match(/OFFICE\s+MEMORANDUM/i);

    return match ? match[0].toUpperCase() : "";
  }

  private extractDestination(text: string): string {
    const match = text.match(
      /To\s*:?\s*([\s\S]*?)\n\d+\./i
    );

    if (!match) return "";

    return match[1]
      .replace(/\n/g, ", ")
      .replace(/\s+/g, " ")
      .trim();
  }

  private extractSubject(text: string): string {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const titleIndex = lines.findIndex((line) =>
      /OFFICE\s+MEMORANDUM/i.test(line)
    );

    if (titleIndex === -1) return "";

    for (let i = titleIndex + 1; i < lines.length; i++) {
      const line = lines[i];

      if (
        line.length > 20 &&
        line === line.toUpperCase()
      ) {
        return line;
      }
    }

    return "";
  }
}

export const documentParser =
  new DocumentParserService();