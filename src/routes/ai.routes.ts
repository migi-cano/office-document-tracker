import { Router } from "express";
import { extractDocument } from "../services/gemini.service.js";

const router = Router();

router.get("/test", async (req, res) => {
  try {
    const sampleText = `
OFFICE MEMORANDUM

STRICT ENFORCEMENT OF CONTROL AND ACCOUNTABILITY MEASURES
FOR OFFICE, INSTRUCTIONAL AND CONSTRUCTION MATERIALS

To:
All Employees
`;

    const result = await extractDocument(sampleText);

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Test failed."
    });
  }
});

router.post("/extract-document", async (req, res) => {
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
});

export default router;