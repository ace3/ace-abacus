import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultAudioSettings, sanitizeAudioSettings } from "../config/defaultAudioSettings.js";

const STORAGE_KEY = "abacus.practice.audio.v1";

const readStoredAudioSettings = () => {
  if (typeof window === "undefined") {
    return defaultAudioSettings;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultAudioSettings;
    }

    return sanitizeAudioSettings(JSON.parse(raw));
  } catch {
    return defaultAudioSettings;
  }
};

export const usePracticeAudioSettings = () => {
  const [audioSettings, setAudioSettings] = useState(readStoredAudioSettings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(audioSettings));
  }, [audioSettings]);

  const updateAudioSetting = useCallback((event) => {
    const { name, value, type, checked } = event.target;

    setAudioSettings((prev) => sanitizeAudioSettings({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, []);

  const resetAudioSettings = useCallback(() => {
    setAudioSettings(defaultAudioSettings);
  }, []);

  const snapshot = useMemo(() => audioSettings, [audioSettings]);

  return {
    audioSettings: snapshot,
    updateAudioSetting,
    resetAudioSettings
  };
};
