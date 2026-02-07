import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnswerInputDisplay from "../features/practice/components/AnswerInputDisplay.jsx";
import Numpad from "../features/practice/components/Numpad.jsx";
import PracticeSettingsForm from "../features/practice/components/PracticeSettingsForm.jsx";
import PracticeAudioControls from "../features/practice/components/PracticeAudioControls.jsx";
import PracticeMotivationCard from "../features/practice/components/PracticeMotivationCard.jsx";
import { formatSignedRow } from "../features/practice/domain/practiceSession.js";
import { usePracticeAudio } from "../features/practice/hooks/usePracticeAudio.js";
import { usePracticeAudioSettings } from "../features/practice/hooks/usePracticeAudioSettings.js";
import { usePracticeProgress } from "../features/practice/hooks/usePracticeProgress.js";
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
  const { audioSettings, updateAudioSetting, resetAudioSettings } = usePracticeAudioSettings();
  const { snapshot, recordSession } = usePracticeProgress();
  const { question, error, nextQuestion } = usePracticeQuestion(settings);
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });
  const [prefillMeta, setPrefillMeta] = useState(null);
  const [audioError, setAudioError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const { startAmbient, stopAll } = usePracticeAudio({
    enabled: audioSettings.bgmEnabled,
    ambientVolume: audioSettings.masterVolume,
    countdownVolume: audioSettings.countdownVolume,
    onError: () => setAudioError(t("audio.playbackError"))
  });

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

  useEffect(() => () => {
    stopAll();
  }, [stopAll]);

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
    startAmbient();
    setAudioError("");
    setSaveMessage("");
    setAnswerInput((prev) => (prev === "0" ? digit : `${prev}${digit}`));
  };

  const handleToggleSign = () => {
    startAmbient();
    setAudioError("");
    setSaveMessage("");
    setAnswerInput((prev) => {
      if (!prev) {
        return "-";
      }

      return prev.startsWith("-") ? prev.slice(1) : `-${prev}`;
    });
  };

  const handleBackspace = () => {
    startAmbient();
    setAudioError("");
    setSaveMessage("");
    setAnswerInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setSaveMessage("");
    setAnswerInput("");
  };

  const handleCheck = () => {
    startAmbient();
    setAudioError("");
    setSaveMessage("");
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
    startAmbient();
    setAudioError("");
    setSaveMessage("");
    setAnswerInput("");
    setResult(null);
    nextQuestion();
  };

  const handleResetAllSettings = () => {
    resetSettings();
    resetAudioSettings();
    stopAll();
    setAudioError("");
  };

  const handleSaveSession = () => {
    if (stats.attempted <= 0) {
      return;
    }

    recordSession({
      mode: "anki",
      correct: stats.correct,
      attempted: stats.attempted
    });
    setSaveMessage(t("motivation.sessionSaved"));
    setStats({ correct: 0, attempted: 0 });
    setResult(null);
    setAnswerInput("");
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

      <PracticeSettingsForm settings={settings} onChange={updateSetting} onReset={handleResetAllSettings} />
      <PracticeAudioControls settings={audioSettings} onChange={updateAudioSetting} />
      <PracticeMotivationCard snapshot={snapshot} />

      <section className="practice-card" aria-live="polite">
        <div className="practice-stats">
          <span>{t("anki.correct")}: {stats.correct}</span>
          <span>{t("anki.attempted")}: {stats.attempted}</span>
          <span>{t("anki.accuracy")}: {accuracy}%</span>
        </div>

        {error ? <p className="error-text">{error}</p> : null}
        {audioError ? <p className="error-text">{audioError}</p> : null}
        {saveMessage ? <p className="check-result" role="status">{saveMessage}</p> : null}

        <div className="action-row">
          <button
            type="button"
            className="btn btn-secondary"
            disabled={stats.attempted <= 0}
            onClick={handleSaveSession}
          >
            {t("motivation.saveSession")}
          </button>
        </div>

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
