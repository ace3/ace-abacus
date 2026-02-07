import { useTranslation } from "react-i18next";
import { formatWorksheetRow } from "../../../shared/format/worksheetFormatters.js";

const WorksheetPreview = ({ worksheetDoc, generatedAtText }) => {
  const { t } = useTranslation();

  if (!worksheetDoc) {
    return null;
  }

  const modeKey = `common.mode.${worksheetDoc.meta.configSnapshot.operationMode}`;

  return (
    <section className="print-area worksheet-area" aria-labelledby="worksheet-title">
      <div className="worksheet-sheet">
        <header className="sheet-header">
          <h2 id="worksheet-title">{t("worksheet.previewTitle")}</h2>
          <div className="sheet-meta">{t("worksheet.generatedAt")}: {generatedAtText}</div>
          <div className="student-lines">
            <span>{t("worksheet.name")}: ____________________</span>
            <span>{t("worksheet.date")}: ____________________</span>
            <span>{t("worksheet.class")}: ____________________</span>
          </div>
          <div className="config-note">
            {t("worksheet.modeLabel")}: {t(modeKey)} | {t("worksheet.questionLabel")}: {worksheetDoc.meta.configSnapshot.questionCount} | {t("worksheet.rowsLabel")}: {worksheetDoc.meta.configSnapshot.rowsPerQuestion} | {t("worksheet.digitsLabel")}: {worksheetDoc.meta.configSnapshot.digits}
          </div>
        </header>

        <section className="problem-grid">
          {worksheetDoc.problems.map((problem, index) => (
            <article className="problem-card" key={`p-${index + 1}`}>
              <header className="problem-title">Q{index + 1}</header>
              <ol className="row-list">
                {problem.rows.map((row, rowIndex) => (
                  <li className="problem-row" key={`p-${index + 1}-r-${rowIndex + 1}`}>
                    {formatWorksheetRow(row)}
                  </li>
                ))}
              </ol>
              <div className="answer-line" aria-hidden="true" />
            </article>
          ))}
        </section>
      </div>
    </section>
  );
};

export default WorksheetPreview;
