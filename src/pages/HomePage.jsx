import { Link } from "react-router-dom";

const featureCards = [
  {
    title: "Worksheet Generator",
    description: "Create printable multi-row arithmetic worksheets with answer keys in seconds.",
    to: "/generator",
    cta: "Open Generator"
  },
  {
    title: "Anki Practice",
    description: "Use card-by-card arithmetic practice with a tap-friendly numpad on phone and tablet.",
    to: "/anki",
    cta: "Start Practice"
  },
  {
    title: "Time Attack",
    description: "Train speed and accuracy with configurable countdown sessions and instant scoring.",
    to: "/time-attack",
    cta: "Start Time Attack"
  }
];

const HomePage = () => (
  <section className="page home-page">
    <header className="hero-card">
      <p className="eyebrow">Local-First Math Practice</p>
      <h1>Abacus Worksheet & Practice Studio</h1>
      <p>
        Build print-ready worksheets, run focused Anki-style drills, and push speed with countdown practice.
        No account or backend required.
      </p>
      <div className="hero-actions">
        <Link to="/anki" className="btn btn-primary">Start Practice</Link>
        <Link to="/generator" className="btn btn-secondary">Go to Generator</Link>
      </div>
    </header>

    <section className="feature-grid" aria-label="Website capabilities">
      {featureCards.map((card) => (
        <article key={card.title} className="feature-card">
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <Link to={card.to} className="btn btn-ghost">{card.cta}</Link>
        </article>
      ))}
    </section>

    <section className="benefits-card">
      <h2>What this website can do</h2>
      <ul>
        <li>Generate deterministic worksheets with seed support.</li>
        <li>Control operation mode, digits, rows, and negative-result rules.</li>
        <li>Print worksheet and answer key with US Letter or A4 presets.</li>
        <li>Practice using touch-first numpad workflows on phone and tablet.</li>
      </ul>
    </section>
  </section>
);

export default HomePage;
