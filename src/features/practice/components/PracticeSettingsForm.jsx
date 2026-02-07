const PracticeSettingsForm = ({ settings, onChange, onReset, extraControls }) => (
  <section className="practice-panel" aria-labelledby="practice-settings-title">
    <div className="practice-panel-header">
      <h2 id="practice-settings-title">Practice Settings</h2>
      <button type="button" className="btn btn-ghost" onClick={onReset}>Reset</button>
    </div>

    <div className="practice-field-grid">
      <label>
        Mode
        <select name="operationMode" value={settings.operationMode} onChange={onChange}>
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="mixed">Mixed</option>
        </select>
      </label>

      <label>
        Digits
        <input name="digits" type="number" min="1" max="5" value={settings.digits} onChange={onChange} />
      </label>

      <label>
        Rows per Question
        <input name="rowsPerQuestion" type="number" min="2" max="10" value={settings.rowsPerQuestion} onChange={onChange} />
      </label>

      {extraControls}
    </div>

    <div className="toggle-grid">
      <label className="checkbox-field">
        <input
          name="allowNegativeIntermediate"
          type="checkbox"
          checked={settings.allowNegativeIntermediate}
          onChange={onChange}
        />
        Allow negative intermediate totals
      </label>

      <label className="checkbox-field">
        <input name="allowNegativeFinal" type="checkbox" checked={settings.allowNegativeFinal} onChange={onChange} />
        Allow negative final answers
      </label>
    </div>
  </section>
);

export default PracticeSettingsForm;
