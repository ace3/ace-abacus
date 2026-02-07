import { useCallback, useEffect, useMemo, useState } from "react";
import {
  applySessionToProgress,
  buildMotivationSnapshot,
  createInitialProgress,
  getLocalDateKey,
  sanitizeProgress
} from "../domain/progressTracker.js";

const STORAGE_KEY = "abacus.practice.progress.v1";

const readStoredProgress = () => {
  if (typeof window === "undefined") {
    return createInitialProgress();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialProgress();
    }

    return sanitizeProgress(JSON.parse(raw));
  } catch {
    return createInitialProgress();
  }
};

export const usePracticeProgress = () => {
  const [progress, setProgress] = useState(readStoredProgress);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const recordSession = useCallback((session) => {
    setProgress((prev) => applySessionToProgress(prev, session));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(createInitialProgress());
  }, []);

  const snapshot = useMemo(() => buildMotivationSnapshot(progress, getLocalDateKey()), [progress]);

  return {
    snapshot,
    recordSession,
    resetProgress
  };
};
