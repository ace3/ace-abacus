export const formatWorksheetRow = (value) => {
  if (value < 0) {
    return `- ${Math.abs(value)}`;
  }
  return `+ ${value}`;
};
