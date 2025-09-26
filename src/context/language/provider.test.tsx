import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import LanguageProvider from "./provider";
import LanguageContext from "./context";

const STORAGE_ROOT_KEY = "nefo"; // must mirror provider.tsx

function TestConsumer() {
  return (
    <LanguageContext.Consumer>
      {({ numberLang, setNumberLocale }) => (
        <div>
          <div data-testid="locale">{numberLang?.locale || "none"}</div>
          <button
            onClick={() => setNumberLocale("fr-fr")}
            data-testid="set-fr"
          />
          <button
            onClick={() => setNumberLocale("es-es")}
            data-testid="set-es"
          />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

describe("LanguageProvider persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("writes selected locale into a namespaced root key", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>,
    );

    expect(localStorage.getItem(STORAGE_ROOT_KEY)).toBeNull();

    act(() => {
      screen.getByTestId("set-fr").click();
    });

    const stored = localStorage.getItem(STORAGE_ROOT_KEY);
    expect(stored).not.toBeNull();
    const parsed: unknown = JSON.parse(stored!);
    interface Root {
      language?: { numberLocale?: unknown };
    }
    const locale = ((): string | undefined => {
      if (typeof parsed !== "object" || parsed === null) return undefined;
      const root = parsed as Root;
      if (!root.language) return undefined;
      const nl = root.language.numberLocale;
      return typeof nl === "string" ? nl : undefined;
    })();
    expect(locale).toBe("fr-fr");
  });

  it("initializes state from storage if present and valid", () => {
    localStorage.setItem(
      STORAGE_ROOT_KEY,
      JSON.stringify({
        language: { numberLocale: "es-es" },
        somethingElse: 123,
      }),
    );

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("locale").textContent).toBe("es-es");
  });

  it("ignores invalid stored locale", () => {
    localStorage.setItem(
      STORAGE_ROOT_KEY,
      JSON.stringify({ language: { numberLocale: "xx-zz" } }),
    );

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("locale").textContent).toBe("none");
  });

  it("ignores malformed JSON", () => {
    localStorage.setItem(STORAGE_ROOT_KEY, "{ not valid json");

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("locale").textContent).toBe("none");
  });
});
