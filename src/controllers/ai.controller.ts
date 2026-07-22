import { Request, Response } from "express";
import { extractDocument } from "../services/gemini.service";

export async function extractDocumentController(
  req: Request,
  res: Response
) {
  try {
    const { ocrText } = req.body;

    if (!ocrText) {
      return res.status(400).json({
        message: "ocrText is required.",
      });
    }

    const result = await extractDocument(ocrText);

    return res.json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Document extraction failed.",
    });
  }
}