import { createRng } from "./random.js";
import { validateWorksheetConfig } from "./validation.js";

const MAX_RANDOM_ATTEMPTS = 300;
const DEBUG = false;

const randomInt = (rng, min, max) => Math.floor(rng() * (max - min + 1)) + min;
const maxValueForDigits = (digits) => (10 ** digits) - 1;
const maxDivisionDivisor = (digits) => Math.max(2, Math.min(12, maxValueForDigits(Math.max(1, digits - 1))));

const pickRowSign = (operationMode, rowIndex, rng) => {
  if (rowIndex === 0) {
    return 1;
  }
  if (operationMode === "addition") {
    return 1;
  }
  if (operationMode === "subtraction") {
    return -1;
  }
  return rng() < 0.5 ? 1 : -1;
};

const validateRunningTotals = (rows, allowNegativeIntermediate, allowNegativeFinal) => {
  let running = 0;
  for (let i = 0; i < rows.length; i += 1) {
    running += rows[i];
    if (!allowNegativeIntermediate && running < 0) {
      return false;
    }
  }

  if (!allowNegativeFinal && running < 0) {
    return false;
  }

  return true;
};

const tryGenerateProblem = (cfg, rng) => {
  const maxAbs = maxValueForDigits(cfg.digits);
  const rows = [];

  for (let i = 0; i < cfg.rowsPerQuestion; i += 1) {
    const sign = pickRowSign(cfg.operationMode, i, rng);
    const magnitudeMin = i === 0 ? 1 : 0;
    const magnitude = randomInt(rng, magnitudeMin, maxAbs);
    rows.push(sign * magnitude);
  }

  if (!validateRunningTotals(rows, cfg.allowNegativeIntermediate, cfg.allowNegativeFinal)) {
    return null;
  }

  return rows;
};

const fallbackProblem = (cfg, rng) => {
  const maxAbs = maxValueForDigits(cfg.digits);
  const rows = [];
  let running = randomInt(rng, 1, Math.max(1, maxAbs));
  rows.push(running);

  for (let i = 1; i < cfg.rowsPerQuestion; i += 1) {
    let sign = pickRowSign(cfg.operationMode, i, rng);

    if (!cfg.allowNegativeIntermediate && sign === -1 && running <= 0) {
      sign = 1;
    }

    const magnitudeUpperBound = sign === -1 && !cfg.allowNegativeIntermediate ? running : maxAbs;
    const magnitude = randomInt(rng, 0, Math.max(0, magnitudeUpperBound));
    const value = sign * magnitude;

    rows.push(value);
    running += value;
  }

  if (!cfg.allowNegativeFinal && running < 0) {
    rows[rows.length - 1] += Math.abs(running);
  }

  return rows;
};

const buildProblem = (cfg, rng) => {
  for (let attempt = 0; attempt < MAX_RANDOM_ATTEMPTS; attempt += 1) {
    const rows = tryGenerateProblem(cfg, rng);
    if (rows) {
      return { rows, usedFallback: false };
    }
  }

  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.warn("Falling back to safe generator after max attempts");
  }

  return { rows: fallbackProblem(cfg, rng), usedFallback: true };
};

const buildMultiplicationProblem = (cfg, rng) => {
  const maxAbs = maxValueForDigits(cfg.digits);
  const left = randomInt(rng, 1, Math.max(1, maxAbs));
  const right = randomInt(rng, 1, Math.max(1, maxDivisionDivisor(cfg.digits)));

  return {
    rows: [left, right],
    answer: left * right
  };
};

const buildDivisionProblem = (cfg, rng) => {
  const maxAbs = maxValueForDigits(cfg.digits);
  const divisor = randomInt(rng, 1, Math.max(1, maxDivisionDivisor(cfg.digits)));
  const maxQuotient = Math.max(1, Math.floor(maxAbs / divisor));
  const quotient = randomInt(rng, 1, maxQuotient);
  const dividend = divisor * quotient;

  return {
    rows: [dividend, divisor],
    answer: quotient
  };
};

export const generateWorksheet = (config) => {
  const validation = validateWorksheetConfig(config);
  if (!validation.valid) {
    return {
      ok: false,
      errors: validation.errors,
      warnings: [],
      document: null
    };
  }

  const cfg = validation.normalized;
  const rng = createRng(cfg.seed);
  const warnings = [];
  const problems = [];

  for (let i = 0; i < cfg.questionCount; i += 1) {
    if (cfg.operationMode === "multiplication") {
      problems.push(buildMultiplicationProblem(cfg, rng));
      continue;
    }

    if (cfg.operationMode === "division") {
      problems.push(buildDivisionProblem(cfg, rng));
      continue;
    }

    const { rows, usedFallback } = buildProblem(cfg, rng);
    const answer = rows.reduce((acc, value) => acc + value, 0);

    if (usedFallback) {
      warnings.push({ code: "fallback", questionIndex: i + 1 });
    }

    problems.push({ rows, answer });
  }

  return {
    ok: true,
    errors: [],
    warnings,
    document: {
      problems,
      meta: {
        generatedAt: new Date().toISOString(),
        configSnapshot: cfg
      }
    }
  };
};

export const calculateRunningTotals = (rows) => {
  let running = 0;
  return rows.map((value) => {
    running += value;
    return running;
  });
};
