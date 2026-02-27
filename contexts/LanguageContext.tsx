"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type Locale, type Translations, translations } from "@/lib/translations";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextType | null>(null);

const LS_KEY = "portfolio-locale";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Read persisted preference on first client render
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) as Locale | null;
    if (stored === "en" || stored === "ptBR") setLocaleState(stored);
  }, []);

  // Sync document.lang + localStorage whenever locale changes
  useEffect(() => {
    document.documentElement.lang = locale === "ptBR" ? "pt-BR" : "en";
    localStorage.setItem(LS_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "en" ? "ptBR" : "en")),
    []
  );

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}
