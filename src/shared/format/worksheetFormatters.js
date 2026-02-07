const toSigned = (value, isFirstRow) => {
  if (isFirstRow) {
    return String(value);
  }
  if (value < 0) {
    return `- ${Math.abs(value)}`;
  }
  return `+ ${value}`;
};

export const formatWorksheetRow = (value, index, operationMode = "addition") => {
  if (operationMode === "multiplication") {
    return index === 0 ? String(value) : `× ${value}`;
  }

  if (operationMode === "division") {
    return index === 0 ? String(value) : `÷ ${value}`;
  }

  return toSigned(value, index === 0);
};
