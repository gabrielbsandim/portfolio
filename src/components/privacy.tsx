'use client';

import Link from 'next/link';
import { PRIVACY } from '@/content/privacy';
import { LangToggle } from './lang-toggle';
import { useLang } from './use-lang';
import s from './privacy.module.css';

export function Privacy() {
  const [lang, setLang] = useLang('pt', false);
  const c = PRIVACY[lang];
  const sections = c.sections.map((sec, i) => ({ ...sec, id: `s${i + 1}`, n: String(i + 1).padStart(2, '0') }));

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
          <LangToggle lang={lang} order={['pt', 'en']} onChange={setLang} />
        </div>
      </nav>
      <main className={s.main}>
        <header className={s.header}>
          <div className={s.kicker}>{c.kicker}</div>
          <h1 className={s.title}>{c.title}</h1>
          <p className={s.intro}>{c.intro}</p>
          <div className={s.pills}>
            <span className={s.pill}>{c.updated}</span>
            <span className={s.pill}>GBS Tecnologia da Informação Ltda · CNPJ 44.000.992/0001-22</span>
          </div>
        </header>
        <aside className={s.toc}>
          {sections.map((sec) => (
            <a key={sec.id} href={`#${sec.id}`} className={s.tocLink}>
              {sec.n}. {sec.t}
            </a>
          ))}
        </aside>
        <div className={s.body}>
          {sections.map((sec) => (
            <section key={sec.id} id={sec.id} className={s.section}>
              <h2 className={s.h2}>
                <span className={s.num}>{sec.n}</span>
                {sec.t}
              </h2>
              {sec.p?.map((para) => (
                <p key={para} className={s.para}>{para}</p>
              ))}
              {sec.l && (
                <div className={s.list}>
                  {sec.l.map((li) => (
                    <div key={li} className={s.item}>
                      <span className={s.bullet} />
                      <span>{li}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <span>© 2026 GBS Tecnologia da Informação Ltda</span>
          <Link href="/">gbstec.dev.br</Link>
        </div>
      </footer>
    </div>
  );
}
