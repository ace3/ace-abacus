export const defaultPracticeSettings = {
  operationMode: "addition",
  digits: 3,
  rowsPerQuestion: 4,
  allowNegativeIntermediate: false,
  allowNegativeFinal: false
};

export const allowedOperationModes = ["addition", "subtraction", "mixed", "multiplication", "division"];

export const sanitizePracticeSettings = (value) => {
  const next = {
    ...defaultPracticeSettings,
    ...(value || {})
  };

  if (!allowedOperationModes.includes(next.operationMode)) {
    next.operationMode = defaultPracticeSettings.operationMode;
  }

  const digits = Number.parseInt(String(next.digits), 10);
  next.digits = Number.isInteger(digits) && digits >= 1 && digits <= 10 ? digits : defaultPracticeSettings.digits;

  const rows = Number.parseInt(String(next.rowsPerQuestion), 10);
  next.rowsPerQuestion = Number.isInteger(rows) && rows >= 1 && rows <= 10 ? rows : defaultPracticeSettings.rowsPerQuestion;

  next.allowNegativeIntermediate = Boolean(next.allowNegativeIntermediate);
  next.allowNegativeFinal = Boolean(next.allowNegativeFinal);

  return next;
};
