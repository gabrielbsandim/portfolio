'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Lang } from '@/content/portfolio';
import { LangToggle } from './lang-toggle';
import s from './privacy.module.css';

type Props = { lang: Lang; setLang: (lang: Lang) => void; children: ReactNode };

export function CaseShell({ lang, setLang, children }: Props) {
  return (
    <div className={s.root}>
      <nav className={s.nav}>
        <div className={s.navInner}>
          <Link href="/" className={s.brand}>
            <svg viewBox="0 0 100 100" className={s.mark} aria-hidden="true">
              <path d="M50 14 A36 36 0 1 0 86 50" fill="none" stroke="#F3F2EE" strokeWidth="16" />
              <rect x="50" y="42" width="44" height="16" fill="#F3F2EE" />
              <rect x="64" y="6" width="22" height="22" rx="4" fill="#5CC8E8" />
            </svg>
            <span className={s.domain}>gbstec.dev.br</span>
          </Link>
          <LangToggle lang={lang} order={['en', 'pt']} onChange={setLang} />
        </div>
      </nav>
      <main className={s.main}>{children}</main>
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <span>© 2026 GBS Tecnologia da Informação Ltda</span>
          <Link href="/">gbstec.dev.br</Link>
        </div>
      </footer>
    </div>
  );
}
