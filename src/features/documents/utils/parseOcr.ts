export interface ParsedDocument {
  title: string;
  subject: string;
}

export function parseOcr(text: string): ParsedDocument {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  let title = "";
  let subject = "";

  // Find document type
  const titleIndex = lines.findIndex(line =>
    /(OFFICE MEMORANDUM|MEMORANDUM|MEMO|LETTER|CIRCULAR)/i.test(line)
  );

  if (titleIndex !== -1) {
    title = lines[titleIndex];

    // Subject = consecutive uppercase lines after the title
    const subjectLines: string[] = [];

    for (let i = titleIndex + 1; i < lines.length; i++) {
      const line = lines[i];

      if (
        /^[A-Z0-9 ,.'()\-]+$/.test(line) &&
        line.length > 5
      ) {
        subjectLines.push(line);
      } else {
        break;
      }
    }

    subject = subjectLines.join(" ");
  }

  return {
    title,
    subject,
  };
}