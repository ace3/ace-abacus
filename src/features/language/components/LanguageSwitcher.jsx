import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <label className="compact-field" htmlFor="language-switcher">
      <span>{t("language.label")}</span>
      <select id="language-switcher" value={i18n.language} onChange={handleChange}>
        <option value="id">{t("language.id")}</option>
        <option value="en">{t("language.en")}</option>
      </select>
    </label>
  );
};

export default LanguageSwitcher;
