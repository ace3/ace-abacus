import { useTranslation } from "react-i18next";

const PracticeSettingsForm = ({ settings, onChange, onReset, extraControls }) => {
  const { t } = useTranslation();

  return (
    <section className="practice-panel" aria-labelledby="practice-settings-title">
      <div className="practice-panel-header">
        <h2 id="practice-settings-title">{t("practice.settingsTitle")}</h2>
        <button type="button" className="btn btn-ghost" onClick={onReset}>{t("practice.reset")}</button>
      </div>

      <div className="practice-field-grid">
        <label>
          {t("worksheet.operation")}
          <select name="operationMode" value={settings.operationMode} onChange={onChange}>
            <option value="addition">{t("common.mode.addition")}</option>
            <option value="subtraction">{t("common.mode.subtraction")}</option>
            <option value="mixed">{t("common.mode.mixed")}</option>
          </select>
        </label>

        <label>
          {t("practice.digits")}
          <input name="digits" type="number" min="1" max="5" value={settings.digits} onChange={onChange} />
        </label>

        <label>
          {t("practice.rowsPerQuestion")}
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
          {t("practice.allowNegativeIntermediate")}
        </label>

        <label className="checkbox-field">
          <input name="allowNegativeFinal" type="checkbox" checked={settings.allowNegativeFinal} onChange={onChange} />
          {t("practice.allowNegativeFinal")}
        </label>
      </div>
    </section>
  );
};

export default PracticeSettingsForm;
