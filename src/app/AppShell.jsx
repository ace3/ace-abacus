import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../features/theme/components/ThemeSwitcher.jsx";
import LanguageSwitcher from "../features/language/components/LanguageSwitcher.jsx";
import { useThemePreference } from "../features/theme/hooks/useThemePreference.js";

const AppShell = () => {
  const { t } = useTranslation();
  const { theme, updateTheme } = useThemePreference();
  const navItems = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/curriculum", label: t("nav.curriculum") },
    { to: "/generator", label: t("nav.generator") },
    { to: "/anki", label: t("nav.anki") },
    { to: "/time-attack", label: t("nav.timeAttack") }
  ];

  const renderNavItems = () =>
    navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        className={({ isActive }) => `site-nav-link${isActive ? " is-active" : ""}`}
      >
        {item.label}
      </NavLink>
    ));

  return (
    <div className="site-shell">
      <header className="site-header no-print">
        <div className="site-header-inner">
          <p className="site-brand">{t("app.brand")}</p>
          <nav className="site-nav" aria-label={t("app.primaryNav")}>
            {renderNavItems()}
          </nav>
          <div className="shell-tools">
            <LanguageSwitcher />
            <ThemeSwitcher value={theme} onChange={updateTheme} />
          </div>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <nav className="bottom-nav no-print" aria-label={t("app.bottomNav")}>
        {renderNavItems()}
      </nav>
    </div>
  );
};

export default AppShell;
