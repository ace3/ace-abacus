const WorksheetWarnings = ({ warnings }) => (
  <section className="warnings no-print" role="status" aria-live="polite">
    {warnings.length > 0 ? (
      <div className="warning-card">
        <strong>Generation Notes</strong>
        <ul>
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </div>
    ) : null}
  </section>
);

export default WorksheetWarnings;
