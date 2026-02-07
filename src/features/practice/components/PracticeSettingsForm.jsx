import { useTranslation } from "react-i18next";

const PracticeSettingsForm = ({ settings, onChange, onReset, extraControls }) => {
  const { t } = useTranslation();
  const oneToTen = Array.from({ length: 10 }, (_, index) => index + 1);

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
            <option value="multiplication">{t("common.mode.multiplication")}</option>
            <option value="division">{t("common.mode.division")}</option>
          </select>
        </label>

        <label>
          {t("practice.digits")}
          <select name="digits" value={String(settings.digits)} onChange={onChange}>
            {oneToTen.map((value) => (
              <option key={`pd-${value}`} value={value}>{value}</option>
            ))}
          </select>
        </label>

        <label>
          {t("practice.rowsPerQuestion")}
          <select name="rowsPerQuestion" value={String(settings.rowsPerQuestion)} onChange={onChange}>
            {oneToTen.map((value) => (
              <option key={`pr-${value}`} value={value}>{value}</option>
            ))}
          </select>
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
