import { useEffect, useState } from "react";
import AnswerKeyPreview from "./features/worksheet/components/AnswerKeyPreview.jsx";
import WorksheetPreview from "./features/worksheet/components/WorksheetPreview.jsx";
import WorksheetSettingsForm from "./features/worksheet/components/WorksheetSettingsForm.jsx";
import WorksheetWarnings from "./features/worksheet/components/WorksheetWarnings.jsx";
import { useWorksheetGenerator } from "./features/worksheet/hooks/useWorksheetGenerator.js";
import { setPrintPageSize } from "./shared/print/printPage.js";

const App = () => {
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
    return () => window.removeEventListener("afterprint", onAfterPrint);
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
    <main className="app-shell">
      <header className="app-header no-print">
        <h1>Abacus Worksheet Generator</h1>
        <p>Simple, local, print-first worksheet creation with no account required.</p>
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
    </main>
  );
};

export default App;
