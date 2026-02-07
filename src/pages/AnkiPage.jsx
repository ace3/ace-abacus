import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnswerInputDisplay from "../features/practice/components/AnswerInputDisplay.jsx";
import Numpad from "../features/practice/components/Numpad.jsx";
import PracticeSettingsForm from "../features/practice/components/PracticeSettingsForm.jsx";
import { formatSignedRow } from "../features/practice/domain/practiceSession.js";
import { usePracticeQuestion } from "../features/practice/hooks/usePracticeQuestion.js";
import { usePracticeSettings } from "../features/practice/hooks/usePracticeSettings.js";
import { parseCurriculumPresetSearch } from "../shared/presets/curriculumPresetQuery.js";

const normalizeInput = (value) => {
  if (value === "" || value === "-") {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : null;
};

const AnkiPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const prefillSignature = searchParams.toString();
  const appliedPrefillSignatureRef = useRef("");
  const { settings, updateSetting, resetSettings, applyPreset } = usePracticeSettings();
  const { question, error, nextQuestion } = usePracticeQuestion(settings);
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });
  const [prefillMeta, setPrefillMeta] = useState(null);

  useEffect(() => {
    if (!prefillSignature || appliedPrefillSignatureRef.current === prefillSignature) {
      return;
    }

    const parsed = parseCurriculumPresetSearch(new URLSearchParams(prefillSignature));
    if (!parsed) {
      appliedPrefillSignatureRef.current = prefillSignature;
      return;
    }

    applyPreset(parsed.prefill);
    setPrefillMeta({ lesson: parsed.lesson, hasWarnings: parsed.hasWarnings });
    appliedPrefillSignatureRef.current = prefillSignature;
  }, [prefillSignature, applyPreset]);

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  const accuracy = useMemo(() => {
    if (stats.attempted === 0) {
      return 0;
    }

    return Math.round((stats.correct / stats.attempted) * 100);
  }, [stats.attempted, stats.correct]);

  const prefillMessages = useMemo(() => {
    if (!prefillMeta) {
      return [];
    }

    const messages = [t("practice.prefillLoaded", { lesson: prefillMeta.lesson })];
    if (prefillMeta.hasWarnings) {
      messages.push(t("practice.prefillInvalid"));
    }

    return messages;
  }, [prefillMeta, t]);

  const handleDigit = (digit) => {
    setAnswerInput((prev) => (prev === "0" ? digit : `${prev}${digit}`));
  };

  const handleToggleSign = () => {
    setAnswerInput((prev) => {
      if (!prev) {
        return "-";
      }

      return prev.startsWith("-") ? prev.slice(1) : `-${prev}`;
    });
  };

  const handleBackspace = () => {
    setAnswerInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setAnswerInput("");
  };

  const handleCheck = () => {
    if (!question) {
      return;
    }

    const parsed = normalizeInput(answerInput);
    if (parsed === null) {
      setResult({ valid: false, message: t("anki.enterValidInteger") });
      return;
    }

    const isCorrect = parsed === question.answer;
    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      attempted: prev.attempted + 1
    }));
    setResult({
      valid: true,
      isCorrect,
      message: isCorrect ? t("anki.correctShort") : t("anki.incorrectWithAnswer", { answer: question.answer })
    });
  };

  const handleNext = () => {
    setAnswerInput("");
    setResult(null);
    nextQuestion();
  };

  return (
    <section className="page practice-page">
      <header className="page-header">
        <h1>{t("anki.title")}</h1>
        <p>{t("anki.description")}</p>
      </header>

      {prefillMessages.length > 0 ? (
        <section className="warning-card" role="status" aria-live="polite">
          <ul>
            {prefillMessages.map((message) => <li key={message}>{message}</li>)}
          </ul>
        </section>
      ) : null}

      <PracticeSettingsForm settings={settings} onChange={updateSetting} onReset={resetSettings} />

      <section className="practice-card" aria-live="polite">
        <div className="practice-stats">
          <span>{t("anki.correct")}: {stats.correct}</span>
          <span>{t("anki.attempted")}: {stats.attempted}</span>
          <span>{t("anki.accuracy")}: {accuracy}%</span>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        {question ? (
          <>
            <div className="question-rows" aria-label={t("practice.questionRows")}>
              {question.rows.map((row, index) => (
                <div key={`${row}-${index}`}>{formatSignedRow(row, index, question.operationMode)}</div>
              ))}
            </div>

            <AnswerInputDisplay value={answerInput} />

            {result ? (
              <div className={`check-result ${result.valid && !result.isCorrect ? "is-wrong" : ""}`} role="status">
                {result.message}
              </div>
            ) : null}

            <Numpad
              onDigit={handleDigit}
              onToggleSign={handleToggleSign}
              onBackspace={handleBackspace}
              onClear={handleClear}
              onSubmit={result ? handleNext : handleCheck}
              submitLabel={result ? t("practice.next") : t("practice.check")}
            />
          </>
        ) : null}
      </section>
    </section>
  );
};

export default AnkiPage;
