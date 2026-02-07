import { useTranslation } from "react-i18next";

const keypadRows = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["-", "0", "⌫"]
];

const Numpad = ({ onDigit, onToggleSign, onBackspace, onClear, onSubmit, submitLabel }) => {
  const { t } = useTranslation();

  const handleKey = (key) => {
    if (key === "-") {
      onToggleSign();
      return;
    }

    if (key === "⌫") {
      onBackspace();
      return;
    }

    onDigit(key);
  };

  return (
    <section className="numpad-shell" aria-label={t("practice.numpadLabel")}>
      <div className="numpad-grid">
        {keypadRows.flat().map((key) => (
          <button key={key} type="button" className="numpad-key" onClick={() => handleKey(key)}>
            {key}
          </button>
        ))}
      </div>
      <div className="numpad-actions">
        <button type="button" className="btn btn-secondary" onClick={onClear}>{t("practice.clear")}</button>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>{submitLabel}</button>
      </div>
    </section>
  );
};

export default Numpad;
