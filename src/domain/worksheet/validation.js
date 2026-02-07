const LIMITS = {
  questionCount: { min: 1, max: 200 },
  rowsPerQuestion: { min: 2, max: 10 },
  digits: { min: 1, max: 5 }
};

const asInteger = (value) => Number.parseInt(String(value), 10);

const validateIntegerRange = (key, value) => {
  const parsed = asInteger(value);
  if (!Number.isInteger(parsed)) {
    return `${key} must be an integer.`;
  }

  const range = LIMITS[key];
  if (parsed < range.min || parsed > range.max) {
    return `${key} must be between ${range.min} and ${range.max}.`;
  }

  return null;
};

export const validateWorksheetConfig = (config) => {
  const errors = [];
  const allowedModes = ["addition", "subtraction", "mixed"];
  const allowedPaper = ["letter", "a4"];

  if (!allowedModes.includes(config.operationMode)) {
    errors.push("operationMode must be addition, subtraction, or mixed.");
  }

  if (!allowedPaper.includes(config.paperSize)) {
    errors.push("paperSize must be letter or a4.");
  }

  ["questionCount", "rowsPerQuestion", "digits"].forEach((key) => {
    const error = validateIntegerRange(key, config[key]);
    if (error) {
      errors.push(error);
    }
  });

  if (typeof config.allowNegativeIntermediate !== "boolean") {
    errors.push("allowNegativeIntermediate must be boolean.");
  }

  if (typeof config.allowNegativeFinal !== "boolean") {
    errors.push("allowNegativeFinal must be boolean.");
  }

  if (typeof config.includeAnswerKey !== "boolean") {
    errors.push("includeAnswerKey must be boolean.");
  }

  if (config.seed && String(config.seed).length > 60) {
    errors.push("seed must be 60 characters or less.");
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
