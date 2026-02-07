import { generateWorksheet } from "../../../domain/worksheet/generator.js";

const baseGeneratorConfig = {
  questionCount: 1,
  paperSize: "letter",
  seed: "",
  includeAnswerKey: false
};

export const buildPracticeQuestion = (settings, seed = "") => {
  const result = generateWorksheet({
    ...baseGeneratorConfig,
    ...settings,
    seed
  });

  if (!result.ok || !result.document || result.document.problems.length === 0) {
    return {
      ok: false,
      error: result.errors?.[0] || "Unable to generate a practice question."
    };
  }

  const [problem] = result.document.problems;

  return {
    ok: true,
    question: {
      rows: problem.rows,
      answer: problem.answer,
      operationMode: settings.operationMode
    }
  };
};

export const formatSignedRow = (value, index, operationMode = "addition") => {
  if (operationMode === "multiplication") {
    return index === 0 ? String(value) : `× ${value}`;
  }

  if (operationMode === "division") {
    return index === 0 ? String(value) : `÷ ${value}`;
  }

  if (index === 0) {
    return String(value);
  }

  return `${value >= 0 ? "+" : "-"} ${Math.abs(value)}`;
};
