"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import pt from "@/dictionaries/pt.json";
import en from "@/dictionaries/en.json";
import es from "@/dictionaries/es.json";

export type Locale = "pt" | "en" | "es";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
}

const dictionaries: Record<Locale, any> = { pt, en, es };

const I18nContext = createContext<I18nContextType>({
  locale: "pt",
  setLocale: () => {},
  t: (path, fallback) => fallback || path,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    // 1. Tenta resgatar de cookie ou localStorage
    const saved = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] as Locale | undefined;

    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLocaleState(saved);
    } else {
      // 2. Fallback para navegador
      const browserLang = navigator.language?.toLowerCase() || "";
      if (browserLang.startsWith("es")) {
        setLocaleState("es");
      } else if (browserLang.startsWith("en")) {
        setLocaleState("en");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: any = dictionaries[locale] || dictionaries.pt;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }

    return typeof current === "string" ? current : fallback || path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
