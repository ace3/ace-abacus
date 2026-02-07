import { useCallback, useEffect, useMemo, useState } from "react";

const IOS_USER_AGENT = /iPad|iPhone|iPod/;

const isIosSafariBrowser = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent || "";
  const isTouchMac = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  const isIosDevice = IOS_USER_AGENT.test(userAgent) || isTouchMac;

  if (!isIosDevice) {
    return false;
  }

  const isWebkit = /WebKit/i.test(userAgent);
  const isSafari = /Safari/i.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);

  return isWebkit && isSafari;
};

const isStandaloneMode = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const standaloneMedia = window.matchMedia?.("(display-mode: standalone)")?.matches;
  const standaloneNavigator = typeof navigator.standalone === "boolean" ? navigator.standalone : false;
  return Boolean(standaloneMedia || standaloneNavigator);
};

const usePwaInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(() => isStandaloneMode());

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const mediaQuery = window.matchMedia?.("(display-mode: standalone)");
    const handleDisplayModeChange = () => {
      setIsStandalone(isStandaloneMode());
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    mediaQuery?.addEventListener?.("change", handleDisplayModeChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      mediaQuery?.removeEventListener?.("change", handleDisplayModeChange);
    };
  }, []);

  const isIosSafari = useMemo(() => isIosSafariBrowser(), []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) {
      return { outcome: "unavailable" };
    }

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return choiceResult;
  }, [deferredPrompt]);

  return {
    canPromptInstall: Boolean(deferredPrompt) && !isStandalone,
    isIosManualInstallVisible: isIosSafari && !isStandalone,
    isInstalled: isStandalone,
    promptInstall
  };
};

export default usePwaInstall;
