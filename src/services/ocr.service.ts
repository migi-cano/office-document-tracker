import * as FileSystem from "expo-file-system/legacy";
import { documentParser } from "../features/scanner/services/documentParser.service";
import { ExtractedDocument } from "../features/scanner/types/ocr.types";
import * as ImageManipulator from "expo-image-manipulator";

class OCRService {
  async extractDocument(
    imageUri: string
  ): Promise<ExtractedDocument> {
    const apiKey = process.env.EXPO_PUBLIC_OCR_SPACE_API_KEY;
    console.log(process.env.EXPO_PUBLIC_OCR_SPACE_API_KEY);

    if (!apiKey) {
      throw new Error("OCR.Space API key is missing.");
    }
console.log("Image URI:", imageUri);

const compressed = await ImageManipulator.manipulateAsync(
  imageUri,
  [],
  {
    compress: 0.6,
    format: ImageManipulator.SaveFormat.JPEG,
  }
);

imageUri = compressed.uri;

const info = await FileSystem.getInfoAsync(imageUri);
console.log("Image Info:", info);
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = new FormData();

    formData.append(
      "base64Image",
      `data:image/jpeg;base64,${base64}`
    );
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("OCREngine", "2");

    const response = await fetch(
      "https://api.ocr.space/parse/image",
      {
        method: "POST",
        headers: {
          apikey: apiKey,
        },
        body: formData,
      }
    );

    if (!response.ok) {
  const errorText = await response.text();

   console.error("OCR Status:", response.status);
  console.error("OCR Response:", errorText);

   throw new Error(
    `OCR request failed (${response.status})`
  );}

    const json = await response.json();
console.log("OCR JSON:", JSON.stringify(json, null, 2));  
    const fullText =
      json?.ParsedResults?.[0]?.ParsedText ?? "";

    return documentParser.parse(
  imageUri,
  fullText
);
  }
}

export const ocrService = new OCRService();