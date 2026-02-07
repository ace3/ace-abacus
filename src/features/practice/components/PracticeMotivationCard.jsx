import { useTranslation } from "react-i18next";

const DAILY_TARGET_ATTEMPTED = 20;

const PracticeMotivationCard = ({ snapshot }) => {
  const { t } = useTranslation();

  const todayProgress = Math.min(100, Math.round((snapshot.today.attempted / DAILY_TARGET_ATTEMPTED) * 100));

  const milestoneItems = [
    { key: "firstSession", unlocked: snapshot.milestones.firstSession },
    { key: "hotStreak", unlocked: snapshot.milestones.hotStreak },
    { key: "accuracyAce", unlocked: snapshot.milestones.accuracyAce },
    { key: "speedRunner", unlocked: snapshot.milestones.speedRunner }
  ];

  return (
    <section className="motivation-card" aria-labelledby="motivation-title">
      <div className="practice-panel-header">
        <h2 id="motivation-title">{t("motivation.title")}</h2>
      </div>

      <div className="practice-stats">
        <span>{t("motivation.currentStreak")}: {snapshot.streak.current}</span>
        <span>{t("motivation.bestStreak")}: {snapshot.streak.best}</span>
        <span>{t("motivation.totalSessions")}: {snapshot.totals.sessions}</span>
        <span>{t("motivation.overallAccuracy")}: {snapshot.totals.accuracy}%</span>
      </div>

      <div className="target-progress" role="status" aria-live="polite">
        <p>{t("motivation.dailyTarget", { attempted: snapshot.today.attempted, target: DAILY_TARGET_ATTEMPTED })}</p>
        <div className="target-progress-track" aria-label={t("motivation.dailyTargetAria", { percent: todayProgress })}>
          <span style={{ width: `${todayProgress}%` }} />
        </div>
      </div>

      <div className="milestone-grid">
        {milestoneItems.map((item) => (
          <article key={item.key} className={`milestone-item${item.unlocked ? " is-unlocked" : ""}`}>
            <h3>{t(`motivation.badges.${item.key}.title`)}</h3>
            <p>{t(`motivation.badges.${item.key}.description`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PracticeMotivationCard;
