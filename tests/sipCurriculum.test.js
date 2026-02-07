import { describe, expect, it } from "vitest";

import { getLessonById, sipCurriculumStages } from "../src/domain/curriculum/sipCurriculum.js";

describe("sipCurriculum", () => {
  it("contains all planned levels from J1 to G3", () => {
    const levelCodes = sipCurriculumStages.flatMap((stage) => stage.levels.map((level) => level.code));

    ["J1", "J2", "J3", "J4", "F1", "F2", "F3", "F4", "A1", "A2", "A3", "A4", "G1", "G2", "G3"].forEach((code) => {
      expect(levelCodes).toContain(code);
    });
  });

  it("returns lesson details by lesson id", () => {
    const found = getLessonById("J1-L1");

    expect(found).not.toBeNull();
    expect(found.stageId).toBe("junior");
    expect(found.levelCode).toBe("J1");
    expect(found.lesson.title.id.length).toBeGreaterThan(0);
    expect(found.lesson.title.en.length).toBeGreaterThan(0);
  });
});
