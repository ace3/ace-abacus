import { useEffect, useMemo, useState } from "react";
import AnswerInputDisplay from "../features/practice/components/AnswerInputDisplay.jsx";
import Numpad from "../features/practice/components/Numpad.jsx";
import PracticeSettingsForm from "../features/practice/components/PracticeSettingsForm.jsx";
import { formatSignedRow } from "../features/practice/domain/practiceSession.js";
import { usePracticeQuestion } from "../features/practice/hooks/usePracticeQuestion.js";
import { usePracticeSettings } from "../features/practice/hooks/usePracticeSettings.js";

const durationOptions = [30, 60, 120];

const normalizeInput = (value) => {
  if (value === "" || value === "-") {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : null;
};

const TimeAttackPage = () => {
  const { settings, updateSetting, resetSettings } = usePracticeSettings();
  const { question, error, nextQuestion } = usePracticeQuestion(settings);
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [status, setStatus] = useState("idle");
  const [answerInput, setAnswerInput] = useState("");
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });

  useEffect(() => {
    if (status !== "running") {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setStatus("finished");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [status]);

  const accuracy = useMemo(() => {
    if (stats.attempted === 0) {
      return 0;
    }

    return Math.round((stats.correct / stats.attempted) * 100);
  }, [stats.attempted, stats.correct]);

  const startSession = () => {
    setStats({ correct: 0, attempted: 0 });
    setAnswerInput("");
    setTimeLeft(duration);
    setStatus("running");
    nextQuestion();
  };

  const handleDigit = (digit) => {
    if (status !== "running") {
      return;
    }

    setAnswerInput((prev) => (prev === "0" ? digit : `${prev}${digit}`));
  };

  const handleToggleSign = () => {
    if (status !== "running") {
      return;
    }

    setAnswerInput((prev) => {
      if (!prev) {
        return "-";
      }

      return prev.startsWith("-") ? prev.slice(1) : `-${prev}`;
    });
  };

  const handleBackspace = () => {
    if (status !== "running") {
      return;
    }

    setAnswerInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setAnswerInput("");
  };

  const handleSubmit = () => {
    if (status !== "running" || !question) {
      return;
    }

    const parsed = normalizeInput(answerInput);
    if (parsed === null) {
      return;
    }

    const isCorrect = parsed === question.answer;
    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      attempted: prev.attempted + 1
    }));
    setAnswerInput("");
    nextQuestion();
  };

  return (
    <section className="page practice-page">
      <header className="page-header">
        <h1>Time Attack</h1>
        <p>Pick a countdown and solve as many as possible before time runs out.</p>
      </header>

      <PracticeSettingsForm
        settings={settings}
        onChange={updateSetting}
        onReset={resetSettings}
        extraControls={(
          <label>
            Duration
            <select aria-label="Duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
              {durationOptions.map((seconds) => (
                <option key={seconds} value={seconds}>{seconds}s</option>
              ))}
            </select>
          </label>
        )}
      />

      <section className="practice-card" aria-live="polite">
        <div className="practice-stats">
          <span>Time Left: {timeLeft}s</span>
          <span>Correct: {stats.correct}</span>
          <span>Attempted: {stats.attempted}</span>
          <span>Accuracy: {accuracy}%</span>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        {status !== "running" ? (
          <div className="session-panel">
            {status === "finished" ? (
              <p className="session-summary">Session complete. Score: {stats.correct} correct, {accuracy}% accuracy.</p>
            ) : (
              <p className="session-summary">Ready to start your timed drill.</p>
            )}
            <button type="button" className="btn btn-primary" onClick={startSession}>
              {status === "finished" ? "Try Again" : "Start"}
            </button>
          </div>
        ) : question ? (
          <>
            <div className="question-rows" aria-label="Question rows">
              {question.rows.map((row, index) => (
                <div key={`${row}-${index}`}>{formatSignedRow(row, index)}</div>
              ))}
            </div>
            <AnswerInputDisplay value={answerInput} />
            <Numpad
              onDigit={handleDigit}
              onToggleSign={handleToggleSign}
              onBackspace={handleBackspace}
              onClear={handleClear}
              onSubmit={handleSubmit}
              submitLabel="Submit"
            />
          </>
        ) : null}
      </section>
    </section>
  );
};

export default TimeAttackPage;
