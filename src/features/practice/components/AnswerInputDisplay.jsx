import { useTranslation } from "react-i18next";

const AnswerInputDisplay = ({ value }) => {
  const { t } = useTranslation();

  return (
    <div className="answer-display" role="status" aria-live="polite">
      <span className="answer-display-label">{t("practice.answerLabel")}</span>
      <strong>{value || "..."}</strong>
    </div>
  );
};

export default AnswerInputDisplay;
