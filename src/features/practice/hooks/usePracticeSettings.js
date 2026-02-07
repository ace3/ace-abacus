import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultPracticeSettings, sanitizePracticeSettings } from "../config/defaultPracticeSettings.js";

const STORAGE_KEY = "abacus.practice.settings.v1";

const readStoredSettings = () => {
  if (typeof window === "undefined") {
    return defaultPracticeSettings;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultPracticeSettings;
    }

    return sanitizePracticeSettings(JSON.parse(raw));
  } catch {
    return defaultPracticeSettings;
  }
};

export const usePracticeSettings = () => {
  const [settings, setSettings] = useState(readStoredSettings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setSettings((prev) =>
      sanitizePracticeSettings({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      })
    );
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultPracticeSettings);
  }, []);

  const applyPreset = useCallback((partialSettings) => {
    setSettings((prev) =>
      sanitizePracticeSettings({
        ...prev,
        ...partialSettings
      })
    );
  }, []);

  const snapshot = useMemo(() => settings, [settings]);

  return {
    settings: snapshot,
    updateSetting,
    resetSettings,
    applyPreset
  };
};
