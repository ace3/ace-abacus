const intInRange = (value, min, max) => {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    return null;
  }

  return parsed;
};

const parseBoolean = (value) => {
  if (value === "true" || value === "1") {
    return true;
  }

  if (value === "false" || value === "0") {
    return false;
  }

  return null;
};

const allowedOperationModes = new Set(["addition", "subtraction", "mixed"]);
const allowedDurations = new Set([30, 60, 120]);

const applyCommonPracticeFields = (params, warnings) => {
  const prefill = {};

  const operationMode = params.get("operationMode");
  if (operationMode) {
    if (allowedOperationModes.has(operationMode)) {
      prefill.operationMode = operationMode;
    } else {
      warnings.push("operationMode");
    }
  }

  const digits = params.get("digits");
  if (digits) {
    const parsed = intInRange(digits, 1, 5);
    if (parsed === null) {
      warnings.push("digits");
    } else {
      prefill.digits = parsed;
    }
  }

  const rowsPerQuestion = params.get("rowsPerQuestion");
  if (rowsPerQuestion) {
    const parsed = intInRange(rowsPerQuestion, 2, 10);
    if (parsed === null) {
      warnings.push("rowsPerQuestion");
    } else {
      prefill.rowsPerQuestion = parsed;
    }
  }

  const allowNegativeIntermediate = params.get("allowNegativeIntermediate");
  if (allowNegativeIntermediate) {
    const parsed = parseBoolean(allowNegativeIntermediate);
    if (parsed === null) {
      warnings.push("allowNegativeIntermediate");
    } else {
      prefill.allowNegativeIntermediate = parsed;
    }
  }

  const allowNegativeFinal = params.get("allowNegativeFinal");
  if (allowNegativeFinal) {
    const parsed = parseBoolean(allowNegativeFinal);
    if (parsed === null) {
      warnings.push("allowNegativeFinal");
    } else {
      prefill.allowNegativeFinal = parsed;
    }
  }

  return prefill;
};

export const parseCurriculumPresetSearch = (searchParams, options = {}) => {
  if (searchParams.get("source") !== "curriculum") {
    return null;
  }

  const warnings = [];
  const lesson = searchParams.get("lesson") || "-";
  const prefill = applyCommonPracticeFields(searchParams, warnings);

  if (options.includeQuestionCount) {
    const questionCount = searchParams.get("questionCount");
    if (questionCount) {
      const parsed = intInRange(questionCount, 1, 200);
      if (parsed === null) {
        warnings.push("questionCount");
      } else {
        prefill.questionCount = parsed;
      }
    }
  }

  if (options.includeDuration) {
    const durationValue = searchParams.get("duration");
    if (durationValue) {
      const parsed = intInRange(durationValue, 30, 120);
      if (parsed === null || !allowedDurations.has(parsed)) {
        warnings.push("duration");
      } else {
        prefill.duration = parsed;
      }
    }
  }

  return {
    lesson,
    prefill,
    hasWarnings: warnings.length > 0
  };
};

const appendPresetFields = (params, preset) => {
  Object.entries(preset).forEach(([key, value]) => {
    params.set(key, String(value));
  });
};

export const buildCurriculumToolLink = ({ path, lessonId, preset }) => {
  const params = new URLSearchParams();
  params.set("source", "curriculum");
  params.set("lesson", lessonId);
  appendPresetFields(params, preset);
  return `${path}?${params.toString()}`;
};
