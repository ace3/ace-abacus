import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import AppRoutes from "../src/app/routes.jsx";

const renderAtRoute = (route) =>
  render(
    <MemoryRouter
      initialEntries={[route]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppRoutes />
    </MemoryRouter>
  );

const enterAnswerWithNumpad = (value) => {
  const str = String(value);

  for (const char of str) {
    if (char === "-") {
      fireEvent.click(screen.getByRole("button", { name: "-" }));
    } else {
      fireEvent.click(screen.getByRole("button", { name: char }));
    }
  }
};

const computeDisplayedAnswer = () => {
  const rowContainer = screen.getByLabelText("Question rows");
  const lines = within(rowContainer).getAllByText(/^-|^\+|^\d/).map((line) => line.textContent || "0");
  return lines.reduce((sum, line) => sum + Number.parseInt(line.replace("+", "").replaceAll(" ", ""), 10), 0);
};

afterEach(() => {
  cleanup();
});

describe("Routes and pages", () => {
  it("renders home page and links", () => {
    renderAtRoute("/");

    expect(screen.getByText("Abacus Worksheet & Practice Studio")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Start Practice" })[0]).toHaveAttribute("href", "/anki");
  });

  it("redirects unknown route to home", () => {
    renderAtRoute("/missing-page");

    expect(screen.getByText("Abacus Worksheet & Practice Studio")).toBeInTheDocument();
  });
});

describe("Generator page", () => {
  it("generates worksheet and shows question cards", () => {
    renderAtRoute("/generator");

    fireEvent.click(screen.getByRole("button", { name: "Generate Worksheet" }));

    expect(screen.getByText("Abacus Worksheet")).toBeInTheDocument();
    expect(screen.getAllByText("Q1").length).toBeGreaterThan(0);
  });

  it("shows validation error for invalid questions input", () => {
    renderAtRoute("/generator");

    const input = screen.getByRole("spinbutton", { name: "Questions" });
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Generate Worksheet" }));

    expect(screen.getByText("questionCount must be between 1 and 200.")).toBeInTheDocument();
  });

  it("prints worksheet and answer key via window.print", () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
    renderAtRoute("/generator");

    fireEvent.click(screen.getByRole("button", { name: "Generate Worksheet" }));
    fireEvent.click(screen.getByRole("button", { name: "Print Worksheet" }));
    fireEvent.click(screen.getByRole("button", { name: "Print Answer Key" }));

    expect(printSpy).toHaveBeenCalledTimes(2);
    printSpy.mockRestore();
  });
});

describe("Practice pages", () => {
  it("supports Anki check then next flow", () => {
    renderAtRoute("/anki");

    const answer = computeDisplayedAnswer();
    enterAnswerWithNumpad(answer);

    fireEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(screen.getByText("Correct.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.queryByText("Correct.")).not.toBeInTheDocument();
  });

  it("runs time attack and finishes when timer reaches zero", () => {
    vi.useFakeTimers();
    renderAtRoute("/time-attack");

    fireEvent.click(screen.getByRole("button", { name: "Start" }));

    act(() => {
      vi.advanceTimersByTime(60_000);
    });

    expect(screen.getByText(/Session complete\./)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
