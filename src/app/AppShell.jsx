import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/generator", label: "Generator" },
  { to: "/anki", label: "Anki" },
  { to: "/time-attack", label: "Time Attack" }
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

const AppShell = () => (
  <div className="site-shell">
    <header className="site-header no-print">
      <div className="site-header-inner">
        <p className="site-brand">Abacus Practice</p>
        <nav className="site-nav" aria-label="Primary">
          {renderNavItems()}
        </nav>
      </div>
    </header>

    <main className="site-main">
      <Outlet />
    </main>

    <nav className="bottom-nav no-print" aria-label="Bottom navigation">
      {renderNavItems()}
    </nav>
  </div>
);

export default AppShell;
