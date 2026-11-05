// src/contexts/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

export type Language = 'es' | 'en' | 'fr' | 'pt' | 'de' | 'it';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  nativeName: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'en', label: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: LanguageOption[];
  currentLanguageMeta: LanguageOption;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  // Load language preference from localStorage if available
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('language') as Language;
      const validCodes = AVAILABLE_LANGUAGES.map(l => l.code);
      if (savedLang && validCodes.includes(savedLang)) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        // Check browser language
        const browserLang = navigator.language?.slice(0, 2) as Language;
        if (validCodes.includes(browserLang)) {
          setLanguageState(browserLang);
          document.documentElement.lang = browserLang;
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

  // Resolve translation dictionary with safe fallback
  const translationDict = (translations as any)[language] || translations.en || translations.es;

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
