import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import usePwaInstall from "../hooks/usePwaInstall.js";

const DISMISS_KEY = "abacus.install.prompt.dismissed.v1";
const readDismissed = () => {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch (error) {
    console.warn("Could not read install prompt preference.", error);
    return false;
  }
};

const persistDismissed = () => {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch (error) {
    console.warn("Could not persist install prompt preference.", error);
  }
};

const InstallPromptCard = () => {
  const { t } = useTranslation();
  const { canPromptInstall, isIosManualInstallVisible, promptInstall } = usePwaInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setIsDismissed(readDismissed());
  }, []);

  const isVisible = useMemo(
    () => !isDismissed && (canPromptInstall || isIosManualInstallVisible),
    [canPromptInstall, isDismissed, isIosManualInstallVisible]
  );

  if (!isVisible) {
    return null;
  }

  const dismiss = () => {
    persistDismissed();
    setIsDismissed(true);
  };

  const handleInstall = async () => {
    await promptInstall();
  };

  return (
    <section className="install-card" aria-label={t("pwa.installTitle")}>
      <h2>{t("pwa.installTitle")}</h2>
      <p>{t("pwa.installDescription")}</p>

      {canPromptInstall ? (
        <div className="action-row">
          <button type="button" className="btn btn-primary" onClick={handleInstall}>
            {t("pwa.installNow")}
          </button>
          <button type="button" className="btn btn-ghost" onClick={dismiss}>
            {t("pwa.dismiss")}
          </button>
        </div>
      ) : null}

      {isIosManualInstallVisible ? (
        <>
          <ol className="install-steps">
            <li>{t("pwa.iosSteps.share")}</li>
            <li>{t("pwa.iosSteps.addToHome")}</li>
            <li>{t("pwa.iosSteps.openAsWebApp")}</li>
          </ol>
          <div className="action-row">
            <button type="button" className="btn btn-ghost" onClick={dismiss}>
              {t("pwa.dismiss")}
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default InstallPromptCard;
