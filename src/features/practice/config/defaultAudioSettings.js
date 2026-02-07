export const defaultAudioSettings = {
  bgmEnabled: false,
  masterVolume: 0.35,
  countdownVolume: 0.5,
  countdownThresholdSec: 10
};

const clampVolume = (value, fallback) => {
  const parsed = Number.parseFloat(String(value));
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(0, Math.min(1, parsed));
};

export const sanitizeAudioSettings = (value) => {
  const next = {
    ...defaultAudioSettings,
    ...(value || {})
  };

  next.bgmEnabled = Boolean(next.bgmEnabled);
  next.masterVolume = clampVolume(next.masterVolume, defaultAudioSettings.masterVolume);
  next.countdownVolume = clampVolume(next.countdownVolume, defaultAudioSettings.countdownVolume);

  const threshold = Number.parseInt(String(next.countdownThresholdSec), 10);
  next.countdownThresholdSec = Number.isInteger(threshold) && threshold >= 3 && threshold <= 30
    ? threshold
    : defaultAudioSettings.countdownThresholdSec;

  return next;
};
