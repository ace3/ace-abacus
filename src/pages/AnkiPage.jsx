import { useEffect, useMemo, useState } from "react";
import AnswerInputDisplay from "../features/practice/components/AnswerInputDisplay.jsx";
import Numpad from "../features/practice/components/Numpad.jsx";
import PracticeSettingsForm from "../features/practice/components/PracticeSettingsForm.jsx";
import { formatSignedRow } from "../features/practice/domain/practiceSession.js";
import { usePracticeQuestion } from "../features/practice/hooks/usePracticeQuestion.js";
import { usePracticeSettings } from "../features/practice/hooks/usePracticeSettings.js";

const normalizeInput = (value) => {
  if (value === "" || value === "-") {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : null;
};

const AnkiPage = () => {
  const { settings, updateSetting, resetSettings } = usePracticeSettings();
  const { question, error, nextQuestion } = usePracticeQuestion(settings);
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  const accuracy = useMemo(() => {
    if (stats.attempted === 0) {
      return 0;
    }

    return Math.round((stats.correct / stats.attempted) * 100);
  }, [stats.attempted, stats.correct]);

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
      setResult({ valid: false, message: "Enter a valid integer answer." });
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
      message: isCorrect ? "Correct." : `Incorrect. Correct answer: ${question.answer}`
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
        <h1>Anki Practice</h1>
        <p>Check your answer, review feedback, then move to the next card.</p>
      </header>

      <PracticeSettingsForm settings={settings} onChange={updateSetting} onReset={resetSettings} />

      <section className="practice-card" aria-live="polite">
        <div className="practice-stats">
          <span>Correct: {stats.correct}</span>
          <span>Attempted: {stats.attempted}</span>
          <span>Accuracy: {accuracy}%</span>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        {question ? (
          <>
            <div className="question-rows" aria-label="Question rows">
              {question.rows.map((row, index) => (
                <div key={`${row}-${index}`}>{formatSignedRow(row, index)}</div>
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
              submitLabel={result ? "Next" : "Check"}
            />
          </>
        ) : null}
      </section>
    </section>
  );
};

export default AnkiPage;
