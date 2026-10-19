'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/content/portfolio';

export function useLang(fallback: Lang, detect: boolean) {
  const [lang, setLang] = useState<Lang>(fallback);

  useEffect(() => {
    if (!detect || !/^pt/i.test(navigator.language || '')) return;
    setLang('pt');
  }, [detect]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return [lang, setLang] as const;
}
