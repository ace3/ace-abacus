import { formatWorksheetRow } from "../../../shared/format/worksheetFormatters.js";

const WorksheetPreview = ({ worksheetDoc, generatedAtText }) => {
  if (!worksheetDoc) {
    return null;
  }

  return (
    <section className="print-area worksheet-area" aria-labelledby="worksheet-title">
      <div className="worksheet-sheet">
        <header className="sheet-header">
          <h2 id="worksheet-title">Abacus Worksheet</h2>
          <div className="sheet-meta">Generated: {generatedAtText}</div>
          <div className="student-lines">
            <span>Name: ____________________</span>
            <span>Date: ____________________</span>
            <span>Class: ____________________</span>
          </div>
          <div className="config-note">
            Mode: {worksheetDoc.meta.configSnapshot.operationMode} | Questions: {worksheetDoc.meta.configSnapshot.questionCount} | Rows: {worksheetDoc.meta.configSnapshot.rowsPerQuestion} | Digits: {worksheetDoc.meta.configSnapshot.digits}
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
