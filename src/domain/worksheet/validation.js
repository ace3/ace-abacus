const LIMITS = {
  questionCount: { min: 1, max: 10 },
  rowsPerQuestion: { min: 1, max: 10 },
  digits: { min: 1, max: 10 }
};

const asInteger = (value) => Number.parseInt(String(value), 10);

const validateIntegerRange = (key, value) => {
  const parsed = asInteger(value);
  if (!Number.isInteger(parsed)) {
    return `${key} harus berupa bilangan bulat.`;
  }

  const range = LIMITS[key];
  if (parsed < range.min || parsed > range.max) {
    return `${key} harus di antara ${range.min} dan ${range.max}.`;
  }

  return null;
};

export const validateWorksheetConfig = (config) => {
  const errors = [];
  const allowedModes = ["addition", "subtraction", "mixed"];
  const allowedPaper = ["letter", "a4"];

  if (!allowedModes.includes(config.operationMode)) {
    errors.push("operationMode harus addition, subtraction, atau mixed.");
  }

  if (!allowedPaper.includes(config.paperSize)) {
    errors.push("paperSize harus letter atau a4.");
  }

  ["questionCount", "rowsPerQuestion", "digits"].forEach((key) => {
    const error = validateIntegerRange(key, config[key]);
    if (error) {
      errors.push(error);
    }
  });

  if (typeof config.allowNegativeIntermediate !== "boolean") {
    errors.push("allowNegativeIntermediate harus boolean.");
  }

  if (typeof config.allowNegativeFinal !== "boolean") {
    errors.push("allowNegativeFinal harus boolean.");
  }

  if (typeof config.includeAnswerKey !== "boolean") {
    errors.push("includeAnswerKey harus boolean.");
  }

  if (config.seed && String(config.seed).length > 60) {
    errors.push("seed maksimal 60 karakter.");
  }

  return {
    valid: errors.length === 0,
    errors,
    normalized: {
      ...config,
      questionCount: asInteger(config.questionCount),
      rowsPerQuestion: asInteger(config.rowsPerQuestion),
      digits: asInteger(config.digits),
      seed: String(config.seed || "").trim()
    }
  };
};

export { LIMITS };
