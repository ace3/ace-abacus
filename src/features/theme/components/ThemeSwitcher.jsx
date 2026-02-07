import { useTranslation } from "react-i18next";

const ThemeSwitcher = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <label className="compact-field" htmlFor="theme-switcher">
      <span>{t("theme.label")}</span>
      <select id="theme-switcher" value={value} onChange={onChange}>
        <option value="neutral">{t("theme.neutral")}</option>
        <option value="bright-a">{t("theme.brightA")}</option>
        <option value="bright-b">{t("theme.brightB")}</option>
      </select>
    </label>
  );
};

export default ThemeSwitcher;
