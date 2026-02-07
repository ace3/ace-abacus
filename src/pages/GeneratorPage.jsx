import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnswerKeyPreview from "../features/worksheet/components/AnswerKeyPreview.jsx";
import WorksheetPreview from "../features/worksheet/components/WorksheetPreview.jsx";
import WorksheetSettingsForm from "../features/worksheet/components/WorksheetSettingsForm.jsx";
import WorksheetWarnings from "../features/worksheet/components/WorksheetWarnings.jsx";
import { useWorksheetGenerator } from "../features/worksheet/hooks/useWorksheetGenerator.js";
import { parseCurriculumPresetSearch } from "../shared/presets/curriculumPresetQuery.js";
import { setPrintPageSize } from "../shared/print/printPage.js";

const GeneratorPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [printTarget, setPrintTarget] = useState("worksheet");
  const [prefillMeta, setPrefillMeta] = useState(null);

  const {
    config,
    errors,
    warnings,
    worksheetDoc,
    generatedAtText,
    setErrors,
    handleConfigChange,
    generate,
    applyPreset
  } = useWorksheetGenerator();

  useEffect(() => {
    const parsed = parseCurriculumPresetSearch(searchParams, { includeQuestionCount: true });
    if (!parsed) {
      return;
    }

    applyPreset(parsed.prefill);
    setPrefillMeta({ lesson: parsed.lesson, hasWarnings: parsed.hasWarnings });
  }, [searchParams, applyPreset]);

  useEffect(() => {
    document.body.dataset.paperSize = config.paperSize;
    document.body.dataset.printTarget = printTarget;
    setPrintPageSize(config.paperSize);
  }, [config.paperSize, printTarget]);

  useEffect(() => {
    const onAfterPrint = () => setPrintTarget("worksheet");
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("afterprint", onAfterPrint);
      delete document.body.dataset.paperSize;
      delete document.body.dataset.printTarget;
    };
  }, []);

  const prefillMessages = useMemo(() => {
    if (!prefillMeta) {
      return [];
    }

    const messages = [t("generatorPage.prefillLoaded", { lesson: prefillMeta.lesson })];
    if (prefillMeta.hasWarnings) {
      messages.push(t("generatorPage.prefillInvalid"));
    }

    return messages;
  }, [prefillMeta, t]);

  const handlePrintWorksheet = () => {
    if (!worksheetDoc) {
      setErrors([t("worksheet.printBeforeGenerate")]);
      return;
    }

    setErrors([]);
    setPrintTarget("worksheet");
    window.print();
  };

  const handlePrintAnswerKey = () => {
    if (!worksheetDoc || !config.includeAnswerKey) {
      setErrors([t("worksheet.answerKeyPrereq")]);
      return;
    }

    setErrors([]);
    setPrintTarget("answer-key");
    window.print();
  };

  return (
    <section className="page generator-page">
      <header className="page-header no-print">
        <h1>{t("generatorPage.title")}</h1>
        <p>{t("generatorPage.description")}</p>
      </header>

      {prefillMessages.length > 0 ? (
        <section className="warning-card no-print" role="status" aria-live="polite">
          <ul>
            {prefillMessages.map((message) => <li key={message}>{message}</li>)}
          </ul>
        </section>
      ) : null}

      <WorksheetSettingsForm
        config={config}
        errors={errors}
        onChange={handleConfigChange}
        onGenerate={generate}
        onPrintWorksheet={handlePrintWorksheet}
        onPrintAnswerKey={handlePrintAnswerKey}
      />

      <WorksheetWarnings warnings={warnings} />
      <WorksheetPreview worksheetDoc={worksheetDoc} generatedAtText={generatedAtText} />
      <AnswerKeyPreview worksheetDoc={worksheetDoc} includeAnswerKey={config.includeAnswerKey} />
    </section>
  );
};

export default GeneratorPage;
