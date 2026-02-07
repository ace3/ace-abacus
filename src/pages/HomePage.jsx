import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InstallPromptCard from "../features/pwa/components/InstallPromptCard.jsx";

const HomePage = () => {
  const { t } = useTranslation();

  const featureCards = [
    {
      title: t("home.features.curriculum.title"),
      description: t("home.features.curriculum.description"),
      to: "/curriculum",
      cta: t("home.features.curriculum.cta")
    },
    {
      title: t("home.features.generator.title"),
      description: t("home.features.generator.description"),
      to: "/generator",
      cta: t("home.features.generator.cta")
    },
    {
      title: t("home.features.anki.title"),
      description: t("home.features.anki.description"),
      to: "/anki",
      cta: t("home.features.anki.cta")
    },
    {
      title: t("home.features.timeAttack.title"),
      description: t("home.features.timeAttack.description"),
      to: "/time-attack",
      cta: t("home.features.timeAttack.cta")
    }
  ];

  return (
    <section className="page home-page">
      <header className="hero-card">
        <p className="eyebrow">{t("home.eyebrow")}</p>
        <h1>{t("home.title")}</h1>
        <p>{t("home.description")}</p>
        <div className="hero-actions">
          <Link to="/anki" className="btn btn-primary">{t("home.startPractice")}</Link>
          <Link to="/generator" className="btn btn-secondary">{t("home.goGenerator")}</Link>
        </div>
      </header>

      <InstallPromptCard />

      <section className="feature-grid feature-grid-four" aria-label={t("home.capabilitiesLabel")}>
        {featureCards.map((card) => (
          <article key={card.title} className="feature-card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <Link to={card.to} className="btn btn-ghost">{card.cta}</Link>
          </article>
        ))}
      </section>

      <section className="benefits-card">
        <h2>{t("home.benefitsTitle")}</h2>
        <ul>
          {t("home.benefits", { returnObjects: true }).map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default HomePage;
