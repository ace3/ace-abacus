import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sipCurriculumStages } from "../domain/curriculum/sipCurriculum.js";
import { buildCurriculumToolLink } from "../shared/presets/curriculumPresetQuery.js";

const getLocalizedValue = (value, language) => {
  if (!value) {
    return "";
  }

  return value[language] || value.id || value.en || "";
};

const CurriculumPage = () => {
  const { t, i18n } = useTranslation();
  const [activeStageId, setActiveStageId] = useState(sipCurriculumStages[0].id);
  const language = i18n.language === "en" ? "en" : "id";

  const activeStage = useMemo(
    () => sipCurriculumStages.find((item) => item.id === activeStageId) || sipCurriculumStages[0],
    [activeStageId]
  );

  return (
    <section className="page curriculum-page">
      <header className="page-header">
        <h1>{t("curriculum.title")}</h1>
        <p>{t("curriculum.description")}</p>
      </header>

      <section className="stage-tab-row" aria-label={t("curriculum.stageLabel")}>
        {sipCurriculumStages.map((stage) => (
          <button
            key={stage.id}
            type="button"
            className={`stage-tab-btn${activeStageId === stage.id ? " is-active" : ""}`}
            onClick={() => setActiveStageId(stage.id)}
          >
            {t(`curriculum.stage.${stage.id}`)}
          </button>
        ))}
      </section>

      <section className="curriculum-level-grid">
        {activeStage.levels.map((level) => (
          <article key={level.code} className="level-card">
            <header className="level-card-header">
              <p className="level-chip">{t("curriculum.levelLabel")} {level.code}</p>
            </header>

            {level.lessons.map((lesson) => {
              const title = getLocalizedValue(lesson.title, language);
              return (
                <section key={lesson.id} className="lesson-card">
                  <h2>{title}</h2>

                  <div className="lesson-block">
                    <h3>{t("curriculum.objectives")}</h3>
                    <ul>
                      {lesson.objectives.map((objective) => (
                        <li key={`${lesson.id}-${getLocalizedValue(objective, language)}`}>{getLocalizedValue(objective, language)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="lesson-block">
                    <h3>{t("curriculum.rules")}</h3>
                    <ul>
                      {lesson.rules.map((rule) => (
                        <li key={`${lesson.id}-${getLocalizedValue(rule, language)}`}>{getLocalizedValue(rule, language)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="lesson-block">
                    <h3>{t("curriculum.drillPlan")}</h3>
                    <div className="lesson-actions">
                      <Link
                        to={buildCurriculumToolLink({
                          path: "/generator",
                          lessonId: lesson.id,
                          preset: lesson.drillPlan.generator
                        })}
                        className="btn btn-secondary"
                      >
                        {t("curriculum.openGenerator")}
                      </Link>
                      <Link
                        to={buildCurriculumToolLink({
                          path: "/anki",
                          lessonId: lesson.id,
                          preset: lesson.drillPlan.anki
                        })}
                        className="btn btn-secondary"
                      >
                        {t("curriculum.openAnki")}
                      </Link>
                      <Link
                        to={buildCurriculumToolLink({
                          path: "/time-attack",
                          lessonId: lesson.id,
                          preset: lesson.drillPlan.timeAttack
                        })}
                        className="btn btn-secondary"
                      >
                        {t("curriculum.openTimeAttack")}
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}
          </article>
        ))}
      </section>
    </section>
  );
};

export default CurriculumPage;
