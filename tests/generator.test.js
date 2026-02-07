import { describe, expect, it } from "vitest";

import { calculateRunningTotals, generateWorksheet } from "../src/domain/worksheet/generator.js";
import { validateWorksheetConfig } from "../src/domain/worksheet/validation.js";

const baseConfig = {
  operationMode: "mixed",
  questionCount: 10,
  rowsPerQuestion: 4,
  digits: 3,
  paperSize: "letter",
  seed: "seed-123",
  allowNegativeIntermediate: true,
  allowNegativeFinal: true,
  includeAnswerKey: true
};

describe("generator and validation", () => {
  it("rejects out-of-range inputs", () => {
    const result = validateWorksheetConfig({
      ...baseConfig,
      questionCount: 0,
      rowsPerQuestion: 30,
      digits: 11
    });

    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes("questionCount"))).toBe(true);
    expect(result.errors.some((error) => error.includes("rowsPerQuestion"))).toBe(true);
    expect(result.errors.some((error) => error.includes("digits"))).toBe(true);
  });

  it("produces deterministic worksheet with same seed", () => {
    const a = generateWorksheet(baseConfig);
    const b = generateWorksheet(baseConfig);

    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
    expect(a.document.problems).toEqual(b.document.problems);
  });

  it("subtraction mode generates negative rows after first row", () => {
    const result = generateWorksheet({
      ...baseConfig,
      operationMode: "subtraction",
      questionCount: 10,
      seed: "subtraction-check"
    });

    expect(result.ok).toBe(true);

    result.document.problems.forEach((problem) => {
      expect(problem.rows[0]).toBeGreaterThanOrEqual(0);
      problem.rows.slice(1).forEach((value) => {
        expect(value).toBeLessThanOrEqual(0);
      });
    });
  });

  it("respects non-negative intermediate and final totals", () => {
    const result = generateWorksheet({
      ...baseConfig,
      operationMode: "mixed",
      questionCount: 10,
      rowsPerQuestion: 6,
      allowNegativeIntermediate: false,
      allowNegativeFinal: false,
      seed: "non-negative-check"
    });

    expect(result.ok).toBe(true);

    result.document.problems.forEach((problem) => {
      const totals = calculateRunningTotals(problem.rows);
      totals.forEach((total) => {
        expect(total).toBeGreaterThanOrEqual(0);
      });
      const finalAnswer = problem.rows.reduce((acc, value) => acc + value, 0);
      expect(finalAnswer).toBeGreaterThanOrEqual(0);
    });
  });

  it("enforces digits max absolute value", () => {
    const digits = 2;
    const result = generateWorksheet({
      ...baseConfig,
      digits,
      questionCount: 10,
      rowsPerQuestion: 8,
      seed: "digits-bound"
    });

    expect(result.ok).toBe(true);

    const maxAllowed = (10 ** digits) - 1;
    result.document.problems.forEach((problem) => {
      problem.rows.forEach((row) => {
        expect(Math.abs(row)).toBeLessThanOrEqual(maxAllowed);
      });
    });
  });
});
