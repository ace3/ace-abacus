const AnswerKeyPreview = ({ worksheetDoc, includeAnswerKey }) => {
  if (!worksheetDoc || !includeAnswerKey) {
    return null;
  }

  return (
    <section className="print-area answer-key-area" aria-labelledby="answer-key-title">
      <div className="answer-key-sheet">
        <header className="sheet-header">
          <h2 id="answer-key-title">Answer Key</h2>
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
