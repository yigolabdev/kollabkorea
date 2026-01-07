/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'ko';

interface Dictionary {
  [key: string]: string;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  // URL ?lang=en|ko > localStorage > navigator language > default 'en'
  try {
    const url = new URL(window.location.href);
    const fromQuery = url.searchParams.get('lang');
    if (fromQuery === 'en' || fromQuery === 'ko') return fromQuery;
  } catch {}
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'ko') return stored;
  } catch {}
  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('ko')) return 'ko';
  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());
  const [dict, setDict] = useState<Dictionary>({});

  const loadDict = useCallback(async (lang: Language) => {
    // Lazy load dictionary file
    const mod = await (lang === 'en'
      ? import('./i18n/en.json')
      : import('./i18n/ko.json'));
    setDict(mod.default as Dictionary);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('lang', lang); } catch {}
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    } catch {}
    try {
      document.documentElement.lang = lang;
    } catch {}
  }, []);

  useEffect(() => {
    loadDict(language);
    try { document.documentElement.lang = language; } catch {}
  }, [language, loadDict]);

  const t = useCallback(
    (key: string) => {
      return dict[key] ?? key;
    },
    [dict]
  );

  const value = useMemo<LanguageContextValue>(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

