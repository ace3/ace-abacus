import { useTranslation } from "react-i18next";

const AnswerKeyPreview = ({ worksheetDoc, includeAnswerKey }) => {
  const { t } = useTranslation();

  if (!worksheetDoc || !includeAnswerKey) {
    return null;
  }

  return (
    <section className="print-area answer-key-area" aria-labelledby="answer-key-title">
      <div className="answer-key-sheet">
        <header className="sheet-header">
          <h2 id="answer-key-title">{t("worksheet.answerKeyTitle")}</h2>
        </header>
        <ol className="answer-key-list">
          {worksheetDoc.problems.map((problem, index) => (
            <li key={`a-${index + 1}`}>
              <span>Q{index + 1}</span>
              <strong>{problem.answer}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AnswerKeyPreview;
