import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./AppShell.jsx";
import HomePage from "../pages/HomePage.jsx";
import GeneratorPage from "../pages/GeneratorPage.jsx";
import AnkiPage from "../pages/AnkiPage.jsx";
import TimeAttackPage from "../pages/TimeAttackPage.jsx";

const AppRoutes = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/generator" element={<GeneratorPage />} />
      <Route path="/anki" element={<AnkiPage />} />
      <Route path="/time-attack" element={<TimeAttackPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
