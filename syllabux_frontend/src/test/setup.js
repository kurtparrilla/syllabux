import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

function createStorage() {
  const values = new Map();

  return {
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size;
    },
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  };
}

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: createStorage(),
});
Object.defineProperty(window, "sessionStorage", {
  configurable: true,
  value: createStorage(),
});
Object.defineProperty(window, "fetch", {
  configurable: true,
  value: vi.fn(),
  writable: true,
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  window.sessionStorage.clear();
});
