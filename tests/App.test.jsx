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
  const rowContainer = screen.getByLabelText("Baris soal");
  const lines = within(rowContainer).getAllByText(/^-|^\+|^\d/).map((line) => line.textContent || "0");
  return lines.reduce((sum, line) => sum + Number.parseInt(line.replace("+", "").replaceAll(" ", ""), 10), 0);
};

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("Routes and pages", () => {
  it("renders home page and links", () => {
    renderAtRoute("/");

    expect(screen.getByText("Studio Kurikulum & Latihan Abakus")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Mulai Latihan" })[0]).toHaveAttribute("href", "/anki");
  });

  it("redirects unknown route to home", () => {
    renderAtRoute("/missing-page");

    expect(screen.getByText("Studio Kurikulum & Latihan Abakus")).toBeInTheDocument();
  });

  it("renders curriculum page", () => {
    renderAtRoute("/curriculum");

    expect(screen.getByText("Kurikulum Abakus")).toBeInTheDocument();
    expect(screen.getByText("Level J1")).toBeInTheDocument();
  });
});

describe("Generator page", () => {
  it("generates worksheet and shows question cards", () => {
    renderAtRoute("/generator");

    fireEvent.click(screen.getByRole("button", { name: "Buat Worksheet" }));

    expect(screen.getByText("Worksheet Abakus")).toBeInTheDocument();
    expect(screen.getAllByText("Q1").length).toBeGreaterThan(0);
  });

  it("shows validation error for invalid questions input", () => {
    renderAtRoute("/generator");

    const input = screen.getByRole("combobox", { name: "Jumlah Soal" });
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Buat Worksheet" }));

    expect(screen.getByText("questionCount harus di antara 1 dan 10.")).toBeInTheDocument();
  });

  it("prints worksheet and answer key via window.print", () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
    renderAtRoute("/generator");

    fireEvent.click(screen.getByRole("button", { name: "Buat Worksheet" }));
    fireEvent.click(screen.getByRole("button", { name: "Cetak Worksheet" }));
    fireEvent.click(screen.getByRole("button", { name: "Cetak Kunci Jawaban" }));

    expect(printSpy).toHaveBeenCalledTimes(2);
    printSpy.mockRestore();
  });
});

describe("Practice pages", () => {
  it("keeps bgm disabled by default in practice pages", () => {
    renderAtRoute("/anki");

    const toggle = screen.getByRole("checkbox", { name: "Aktifkan BGM" });
    expect(toggle).not.toBeChecked();
  });

  it("supports Anki check then next flow", () => {
    renderAtRoute("/anki");

    const answer = computeDisplayedAnswer();
    enterAnswerWithNumpad(answer);

    fireEvent.click(screen.getByRole("button", { name: "Periksa" }));
    expect(screen.getByText("Benar.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Lanjut" }));
    expect(screen.queryByText("Benar.")).not.toBeInTheDocument();
  });

  it("keeps controls editable after curriculum prefill", () => {
    renderAtRoute("/anki?source=curriculum&lesson=J1-L1&operationMode=addition&digits=1&rowsPerQuestion=3");

    const modeSelect = screen.getByRole("combobox", { name: "Operasi" });
    const digitsInput = screen.getByRole("combobox", { name: "Digit" });

    fireEvent.change(modeSelect, { target: { value: "subtraction" } });
    fireEvent.change(digitsInput, { target: { value: "5" } });
    fireEvent.click(screen.getByRole("button", { name: "Periksa" }));

    expect(modeSelect).toHaveValue("subtraction");
    expect(digitsInput).toHaveValue("5");
  });

  it("applies multiplication curriculum preset in Anki", () => {
    renderAtRoute("/anki?source=curriculum&lesson=A1-L1&operationMode=multiplication&digits=4&rowsPerQuestion=2");

    const modeSelect = screen.getByRole("combobox", { name: "Operasi" });
    expect(modeSelect).toHaveValue("multiplication");
    expect(screen.getByText(/^× /)).toBeInTheDocument();
  });

  it("runs time attack and finishes when timer reaches zero", () => {
    vi.useFakeTimers();
    renderAtRoute("/time-attack");

    fireEvent.click(screen.getByRole("button", { name: "Mulai" }));

    act(() => {
      vi.advanceTimersByTime(60_000);
    });

    expect(screen.getByText(/Sesi selesai\./)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("saves anki session progress", () => {
    renderAtRoute("/anki");

    const answer = computeDisplayedAnswer();
    enterAnswerWithNumpad(answer);
    fireEvent.click(screen.getByRole("button", { name: "Periksa" }));
    fireEvent.click(screen.getByRole("button", { name: "Simpan Sesi" }));

    expect(screen.getByText("Sesi tersimpan. Progress diperbarui.")).toBeInTheDocument();
  });
});
