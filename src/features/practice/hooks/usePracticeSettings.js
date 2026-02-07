import { useEffect, useMemo, useState } from "react";
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

  const updateSetting = (event) => {
    const { name, value, type, checked } = event.target;
    setSettings((prev) =>
      sanitizePracticeSettings({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      })
    );
  };

  const resetSettings = () => {
    setSettings(defaultPracticeSettings);
  };

  const snapshot = useMemo(() => settings, [settings]);

  return {
    settings: snapshot,
    updateSetting,
    resetSettings
  };
};
