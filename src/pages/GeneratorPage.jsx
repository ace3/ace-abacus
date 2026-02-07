import { useEffect, useState } from "react";
import AnswerKeyPreview from "../features/worksheet/components/AnswerKeyPreview.jsx";
import WorksheetPreview from "../features/worksheet/components/WorksheetPreview.jsx";
import WorksheetSettingsForm from "../features/worksheet/components/WorksheetSettingsForm.jsx";
import WorksheetWarnings from "../features/worksheet/components/WorksheetWarnings.jsx";
import { useWorksheetGenerator } from "../features/worksheet/hooks/useWorksheetGenerator.js";
import { setPrintPageSize } from "../shared/print/printPage.js";

const GeneratorPage = () => {
  const [printTarget, setPrintTarget] = useState("worksheet");
  const {
    config,
    errors,
    warnings,
    worksheetDoc,
    generatedAtText,
    setErrors,
    handleConfigChange,
    generate
  } = useWorksheetGenerator();

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

  const handlePrintWorksheet = () => {
    if (!worksheetDoc) {
      setErrors(["Generate a worksheet before printing."]);
      return;
    }

    setErrors([]);
    setPrintTarget("worksheet");
    window.print();
  };

  const handlePrintAnswerKey = () => {
    if (!worksheetDoc || !config.includeAnswerKey) {
      setErrors(["Enable and generate an answer key before printing it."]);
      return;
    }

    setErrors([]);
    setPrintTarget("answer-key");
    window.print();
  };

  return (
    <section className="page generator-page">
      <header className="page-header no-print">
        <h1>Worksheet Generator</h1>
        <p>Generate printable abacus worksheets with configurable arithmetic rules.</p>
      </header>

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
