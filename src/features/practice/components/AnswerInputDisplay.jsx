const AnswerInputDisplay = ({ value }) => (
  <div className="answer-display" role="status" aria-live="polite">
    <span className="answer-display-label">Your answer</span>
    <strong>{value || "..."}</strong>
  </div>
);

export default AnswerInputDisplay;
