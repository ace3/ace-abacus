import { describe, expect, it } from "vitest";
import {
  applySessionToProgress,
  buildMilestones,
  buildMotivationSnapshot,
  createInitialProgress,
  getLocalDateKey
} from "../src/features/practice/domain/progressTracker.js";

describe("progressTracker", () => {
  it("tracks streak and totals across consecutive days", () => {
    const day1 = new Date("2026-02-01T10:00:00");
    const day2 = new Date("2026-02-02T10:00:00");

    const afterFirst = applySessionToProgress(createInitialProgress(), {
      mode: "anki",
      attempted: 10,
      correct: 8
    }, day1);

    const afterSecond = applySessionToProgress(afterFirst, {
      mode: "timeAttack",
      attempted: 12,
      correct: 10
    }, day2);

    expect(afterSecond.currentStreak).toBe(2);
    expect(afterSecond.bestStreak).toBe(2);
    expect(afterSecond.totalSessions).toBe(2);
    expect(afterSecond.totalAttempted).toBe(22);
    expect(afterSecond.totalCorrect).toBe(18);
    expect(afterSecond.bestTimeAttackCorrect).toBe(10);
  });

  it("does not mutate progress for empty sessions", () => {
    const base = createInitialProgress();
    const next = applySessionToProgress(base, { mode: "anki", attempted: 0, correct: 0 });

    expect(next).toEqual(base);
  });

  it("builds milestones and today snapshot", () => {
    const today = new Date("2026-02-07T09:00:00");
    const progress = applySessionToProgress(createInitialProgress(), {
      mode: "timeAttack",
      attempted: 15,
      correct: 12
    }, today);

    const snapshot = buildMotivationSnapshot(progress, getLocalDateKey(today));
    const milestones = buildMilestones(progress);

    expect(snapshot.today.attempted).toBe(15);
    expect(snapshot.totals.accuracy).toBe(80);
    expect(milestones.firstSession).toBe(true);
    expect(milestones.accuracyAce).toBe(true);
    expect(milestones.speedRunner).toBe(true);
  });
});
