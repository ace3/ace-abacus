import "@testing-library/jest-dom/vitest";
import i18n from "./src/i18n/index.js";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

i18n.changeLanguage("id");
