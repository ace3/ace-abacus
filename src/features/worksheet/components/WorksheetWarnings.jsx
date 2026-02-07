import { useTranslation } from "react-i18next";

const formatWarning = (warning, t) => {
  if (!warning) {
    return "";
  }

  if (typeof warning === "string") {
    return warning;
  }

  if (warning.code === "fallback") {
    return t("worksheet.fallbackWarning", { index: warning.questionIndex });
  }

  return JSON.stringify(warning);
};

const WorksheetWarnings = ({ warnings }) => {
  const { t } = useTranslation();

  return (
    <section className="warnings no-print" role="status" aria-live="polite">
      {warnings.length > 0 ? (
        <div className="warning-card">
          <strong>{t("worksheet.generationNotes")}</strong>
          <ul>
            {warnings.map((warning, index) => (
              <li key={`${index}-${formatWarning(warning, t)}`}>{formatWarning(warning, t)}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};

export default WorksheetWarnings;
