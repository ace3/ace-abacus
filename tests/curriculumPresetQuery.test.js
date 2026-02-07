import { describe, expect, it } from "vitest";

import { buildCurriculumToolLink, parseCurriculumPresetSearch } from "../src/shared/presets/curriculumPresetQuery.js";

describe("curriculumPresetQuery", () => {
  it("parses valid curriculum preset", () => {
    const params = new URLSearchParams("source=curriculum&lesson=J1-L1&operationMode=addition&digits=2&rowsPerQuestion=4&questionCount=10");

    const parsed = parseCurriculumPresetSearch(params, { includeQuestionCount: true });

    expect(parsed.lesson).toBe("J1-L1");
    expect(parsed.prefill).toEqual({
      operationMode: "addition",
      digits: 2,
      rowsPerQuestion: 4,
      questionCount: 10
    });
    expect(parsed.hasWarnings).toBe(false);
  });

  it("ignores invalid values and marks warning", () => {
    const params = new URLSearchParams("source=curriculum&lesson=J1-L1&operationMode=invalid&digits=99&rowsPerQuestion=0");

    const parsed = parseCurriculumPresetSearch(params);

    expect(parsed.prefill).toEqual({});
    expect(parsed.hasWarnings).toBe(true);
  });

  it("builds tool link with query", () => {
    const link = buildCurriculumToolLink({
      path: "/anki",
      lessonId: "F2-L1",
      preset: { operationMode: "mixed", digits: 3 }
    });

    expect(link).toContain("/anki?");
    expect(link).toContain("source=curriculum");
    expect(link).toContain("lesson=F2-L1");
    expect(link).toContain("operationMode=mixed");
    expect(link).toContain("digits=3");
  });
});
