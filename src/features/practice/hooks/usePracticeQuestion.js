import { useCallback, useState } from "react";
import { buildPracticeQuestion } from "../domain/practiceSession.js";

let serial = 0;
const createSeed = () => {
  serial += 1;
  return `practice-${Date.now()}-${serial}`;
};

export const usePracticeQuestion = (settings) => {
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");

  const nextQuestion = useCallback(() => {
    const result = buildPracticeQuestion(settings, createSeed());

    if (!result.ok) {
      setQuestion(null);
      setError(result.error);
      return null;
    }

    setQuestion(result.question);
    setError("");
    return result.question;
  }, [settings]);

  return {
    question,
    error,
    nextQuestion
  };
};
