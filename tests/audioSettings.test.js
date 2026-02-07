import { describe, expect, it } from "vitest";
import { defaultAudioSettings, sanitizeAudioSettings } from "../src/features/practice/config/defaultAudioSettings.js";

describe("audio settings", () => {
  it("defaults to disabled bgm", () => {
    expect(defaultAudioSettings.bgmEnabled).toBe(false);
  });

  it("sanitizes invalid values", () => {
    const next = sanitizeAudioSettings({
      bgmEnabled: "yes",
      masterVolume: 99,
      countdownVolume: -5,
      countdownThresholdSec: 100
    });

    expect(next.bgmEnabled).toBe(true);
    expect(next.masterVolume).toBe(1);
    expect(next.countdownVolume).toBe(0);
    expect(next.countdownThresholdSec).toBe(10);
  });
});
