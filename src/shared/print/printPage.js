export const setPrintPageSize = (paperSize) => {
  let styleElement = document.getElementById("printPageSizeStyle");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "printPageSizeStyle";
    document.head.appendChild(styleElement);
  }

  const pageSize = paperSize === "a4" ? "A4" : "Letter";
  styleElement.textContent = `@page { size: ${pageSize}; margin: 0.4in; }`;
};
