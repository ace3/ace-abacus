import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "../src/App.jsx";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("generates worksheet and shows question cards", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Generate Worksheet" }));

    expect(screen.getByText("Abacus Worksheet")).toBeInTheDocument();
    expect(screen.getAllByText("Q1").length).toBeGreaterThan(0);
  });

  it("shows validation error for invalid questions input", () => {
    render(<App />);

    const input = screen.getByRole("spinbutton", { name: "Questions" });
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Generate Worksheet" }));

    expect(screen.getByText("questionCount must be between 1 and 200.")).toBeInTheDocument();
  });

  it("hides answer key when toggle is disabled", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("checkbox", { name: "Include separate answer key page" }));
    fireEvent.click(screen.getByRole("button", { name: "Generate Worksheet" }));

    expect(screen.queryByText("Answer Key")).not.toBeInTheDocument();
  });

  it("prints worksheet and answer key via window.print", () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Generate Worksheet" }));
    fireEvent.click(screen.getByRole("button", { name: "Print Worksheet" }));
    fireEvent.click(screen.getByRole("button", { name: "Print Answer Key" }));

    expect(printSpy).toHaveBeenCalledTimes(2);
    printSpy.mockRestore();
  });
});
