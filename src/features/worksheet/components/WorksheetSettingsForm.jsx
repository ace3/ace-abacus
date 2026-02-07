import { useTranslation } from "react-i18next";

const WorksheetSettingsForm = ({
  config,
  errors,
  onChange,
  onGenerate,
  onPrintWorksheet,
  onPrintAnswerKey
}) => {
  const { t } = useTranslation();

  const submitGenerate = (event) => {
    event.preventDefault();
    onGenerate();
  };

  return (
    <section className="control-panel no-print" aria-labelledby="settings-title">
      <h2 id="settings-title">{t("worksheet.settingsTitle")}</h2>
      <form onSubmit={submitGenerate} noValidate>
        <div className="field-grid">
          <label>
            {t("worksheet.operation")}
            <select name="operationMode" value={config.operationMode} onChange={onChange}>
              <option value="addition">{t("common.mode.addition")}</option>
              <option value="subtraction">{t("common.mode.subtraction")}</option>
              <option value="mixed">{t("common.mode.mixed")}</option>
            </select>
          </label>

          <label>
            {t("worksheet.questions")}
            <input name="questionCount" type="number" min="1" max="200" value={config.questionCount} onChange={onChange} required />
          </label>

          <label>
            {t("worksheet.rowsPerQuestion")}
            <input name="rowsPerQuestion" type="number" min="2" max="10" value={config.rowsPerQuestion} onChange={onChange} required />
          </label>

          <label>
            {t("worksheet.maxDigits")}
            <input name="digits" type="number" min="1" max="5" value={config.digits} onChange={onChange} required />
          </label>

          <label>
            {t("worksheet.paperSize")}
            <select name="paperSize" value={config.paperSize} onChange={onChange}>
              <option value="letter">US Letter</option>
              <option value="a4">A4</option>
            </select>
          </label>

          <label>
            {t("worksheet.seed")}
            <input name="seed" type="text" maxLength="60" value={config.seed} onChange={onChange} placeholder={t("worksheet.seedPlaceholder")} />
          </label>
        </div>

        <div className="toggle-grid">
          <label className="checkbox-field">
            <input name="allowNegativeIntermediate" type="checkbox" checked={config.allowNegativeIntermediate} onChange={onChange} />
            {t("worksheet.allowNegativeIntermediate")}
          </label>

          <label className="checkbox-field">
            <input name="allowNegativeFinal" type="checkbox" checked={config.allowNegativeFinal} onChange={onChange} />
            {t("worksheet.allowNegativeFinal")}
          </label>

          <label className="checkbox-field">
            <input name="includeAnswerKey" type="checkbox" checked={config.includeAnswerKey} onChange={onChange} />
            {t("worksheet.includeAnswerKey")}
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
          <button id="generateBtn" type="submit">{t("worksheet.generate")}</button>
          <button type="button" onClick={onPrintWorksheet}>{t("worksheet.printWorksheet")}</button>
          <button type="button" onClick={onPrintAnswerKey}>{t("worksheet.printAnswerKey")}</button>
        </div>
      </form>
    </section>
  );
};

export default WorksheetSettingsForm;
