const WorksheetSettingsForm = ({
  config,
  errors,
  onChange,
  onGenerate,
  onPrintWorksheet,
  onPrintAnswerKey
}) => {
  const submitGenerate = (event) => {
    event.preventDefault();
    onGenerate();
  };

  return (
    <section className="control-panel no-print" aria-labelledby="settings-title">
      <h2 id="settings-title">Worksheet Settings</h2>
      <form onSubmit={submitGenerate} noValidate>
        <div className="field-grid">
          <label>
            Operation
            <select name="operationMode" value={config.operationMode} onChange={onChange}>
              <option value="addition">Addition</option>
              <option value="subtraction">Subtraction</option>
              <option value="mixed">Mixed</option>
            </select>
          </label>

          <label>
            Questions
            <input name="questionCount" type="number" min="1" max="200" value={config.questionCount} onChange={onChange} required />
          </label>

          <label>
            Rows per Question
            <input name="rowsPerQuestion" type="number" min="2" max="10" value={config.rowsPerQuestion} onChange={onChange} required />
          </label>

          <label>
            Max Digits per Row
            <input name="digits" type="number" min="1" max="5" value={config.digits} onChange={onChange} required />
          </label>

          <label>
            Paper Size
            <select name="paperSize" value={config.paperSize} onChange={onChange}>
              <option value="letter">US Letter</option>
              <option value="a4">A4</option>
            </select>
          </label>

          <label>
            Seed (Optional)
            <input name="seed" type="text" maxLength="60" value={config.seed} onChange={onChange} placeholder="Same seed = same worksheet" />
          </label>
        </div>

        <div className="toggle-grid">
          <label className="checkbox-field">
            <input name="allowNegativeIntermediate" type="checkbox" checked={config.allowNegativeIntermediate} onChange={onChange} />
            Allow negative intermediate totals
          </label>

          <label className="checkbox-field">
            <input name="allowNegativeFinal" type="checkbox" checked={config.allowNegativeFinal} onChange={onChange} />
            Allow negative final answers
          </label>

          <label className="checkbox-field">
            <input name="includeAnswerKey" type="checkbox" checked={config.includeAnswerKey} onChange={onChange} />
            Include separate answer key page
          </label>
        </div>

        <div className="form-errors" role="alert" aria-live="polite">
          {errors.length > 0 ? (
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="action-row">
          <button id="generateBtn" type="submit">Generate Worksheet</button>
          <button type="button" onClick={onPrintWorksheet}>Print Worksheet</button>
          <button type="button" onClick={onPrintAnswerKey}>Print Answer Key</button>
        </div>
      </form>
    </section>
  );
};

export default WorksheetSettingsForm;
