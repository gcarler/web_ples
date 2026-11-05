// src/contexts/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

export type Language = 'es' | 'en';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'es', label: 'Español', nativeName: 'Español' },
  { code: 'en', label: 'English', nativeName: 'English' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: LanguageOption[];
  currentLanguageMeta: LanguageOption;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Deep merge base dictionary with target override dictionary.
 * Ensures that if any key is missing in English, it seamlessly falls
 * back to Spanish without ever throwing undefined.
 */
function deepMergeFallback(base: any, override: any): any {
  if (!override) return base;
  if (typeof base !== 'object' || base === null) return override ?? base;
  if (Array.isArray(base)) {
    return Array.isArray(override) && override.length > 0 ? override : base;
  }
  const result: any = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] !== undefined && override[key] !== null) {
      if (
        typeof override[key] === 'object' &&
        !Array.isArray(override[key]) &&
        base[key] &&
        typeof base[key] === 'object' &&
        !Array.isArray(base[key])
      ) {
        result[key] = deepMergeFallback(base[key], override[key]);
      } else {
        result[key] = override[key];
      }
    }
  }
  return result;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  // Load language preference from localStorage if available
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('language') as Language;
      const validCodes: Language[] = ['es', 'en'];
      if (savedLang && validCodes.includes(savedLang)) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        const browserLang = (navigator.language?.slice(0, 2) || '').toLowerCase() as Language;
        if (browserLang === 'en') {
          setLanguageState('en');
          document.documentElement.lang = 'en';
        } else {
          setLanguageState('es');
          document.documentElement.lang = 'es';
        }
      }
    } catch {
      // Fallback in case localStorage is restricted
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors
    }
  };

  const currentLanguageMeta = AVAILABLE_LANGUAGES.find(l => l.code === language) || AVAILABLE_LANGUAGES[0];

  // Resolve translation dictionary
  const translationDict = language === 'en'
    ? deepMergeFallback(translations.es, translations.en)
    : translations.es;

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
    currentLanguageMeta,
    t: translationDict,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
