import type React from "react";
import LanguageContext, { localeToInfo } from "./context";
import { useCallback, useEffect, useState } from "react";

// Namespaced root key for all future persisted app data
const STORAGE_ROOT_KEY = "nefo";
interface PersistedStateRoot {
  language?: {
    numberLocale?: string | null;
  };
  // other future slices (e.g. scores) can live alongside language
}

function readPersistedLocale(): string | null {
  if (typeof window === "undefined") return null; // SSR safety
  try {
    const raw = window.localStorage.getItem(STORAGE_ROOT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "language" in parsed &&
      typeof (parsed as PersistedStateRoot).language === "object" &&
      (parsed as PersistedStateRoot).language !== null
    ) {
      const locale = (parsed as PersistedStateRoot).language?.numberLocale;
      if (locale && locale in localeToInfo) return locale;
    }
  } catch {
    // Silently ignore malformed data
  }
  return null;
}

function writePersistedLocale(locale: string | null) {
  if (typeof window === "undefined") return; // SSR safety
  try {
    const raw = window.localStorage.getItem(STORAGE_ROOT_KEY);
    let root: PersistedStateRoot = {};
    if (raw) {
      try {
        root = JSON.parse(raw) as PersistedStateRoot;
      } catch {
        /* ignore parse error, will overwrite with fresh root */
      }
    }
    root.language = { ...(root.language || {}), numberLocale: locale };
    window.localStorage.setItem(STORAGE_ROOT_KEY, JSON.stringify(root));
  } catch {
    // Ignore write errors (quota, etc.)
  }
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [numberLocale, _setNumberLocale] = useState<string | null>(null);

  // initialize from storage once on mount
  useEffect(() => {
    const stored = readPersistedLocale();
    if (stored) _setNumberLocale(stored);
  }, []);

  const setNumberLocale = useCallback((locale: string) => {
    _setNumberLocale(locale);
    writePersistedLocale(locale);
  }, []);

  const numberLang = numberLocale
    ? {
        locale: numberLocale,
        ...localeToInfo[numberLocale as keyof typeof localeToInfo],
      }
    : null;

  return (
    <LanguageContext.Provider value={{ numberLang, setNumberLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
