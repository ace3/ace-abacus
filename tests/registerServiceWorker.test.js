import { afterEach, describe, expect, it, vi } from "vitest";

import { registerServiceWorker } from "../src/shared/pwa/registerServiceWorker.js";

describe("registerServiceWorker", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not register when not in production", async () => {
    const registerSpy = vi.fn();
    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: { register: registerSpy }
    });

    const result = await registerServiceWorker({ isProd: false });

    expect(result).toBeNull();
    expect(registerSpy).not.toHaveBeenCalled();
  });

  it("registers service worker in production", async () => {
    const registration = { scope: "/" };
    const registerSpy = vi.fn().mockResolvedValue(registration);
    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: { register: registerSpy }
    });

    const result = await registerServiceWorker({ isProd: true });

    expect(registerSpy).toHaveBeenCalledWith("/sw.js", { scope: "/" });
    expect(result).toBe(registration);
  });
});
