import { useMemo, useState } from "react";
import { generateWorksheet } from "../../../domain/worksheet/generator.js";
import { validateWorksheetConfig } from "../../../domain/worksheet/validation.js";
import { defaultWorksheetConfig } from "../config/defaultWorksheetConfig.js";

const normalizeCandidateConfig = (config) => ({
  ...config,
  questionCount: Number(config.questionCount),
  rowsPerQuestion: Number(config.rowsPerQuestion),
  digits: Number(config.digits),
  seed: String(config.seed || "")
});

export const useWorksheetGenerator = () => {
  const [config, setConfig] = useState(defaultWorksheetConfig);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [worksheetDoc, setWorksheetDoc] = useState(null);

  const generatedAtText = useMemo(() => {
    if (!worksheetDoc) {
      return "";
    }
    return new Date(worksheetDoc.meta.generatedAt).toLocaleString();
  }, [worksheetDoc]);

  const handleConfigChange = (event) => {
    const { name, value, type, checked } = event.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const generate = () => {
    const candidateConfig = normalizeCandidateConfig(config);
    const validation = validateWorksheetConfig(candidateConfig);

    if (!validation.valid) {
      setErrors(validation.errors);
      setWarnings([]);
      setWorksheetDoc(null);
      return false;
    }

    const result = generateWorksheet(validation.normalized);
    if (!result.ok) {
      setErrors(result.errors);
      setWarnings([]);
      setWorksheetDoc(null);
      return false;
    }

    setErrors([]);
    setWarnings(result.warnings);
    setWorksheetDoc(result.document);
    return true;
  };

  return {
    config,
    errors,
    warnings,
    worksheetDoc,
    generatedAtText,
    setErrors,
    handleConfigChange,
    generate
  };
};
