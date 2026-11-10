'use client';

import Link from 'next/link';
import { CASE_OBRANOVA } from '@/content/case-obranova';
import { LINKS } from '@/content/portfolio';
import { LangToggle } from './lang-toggle';
import { useLang } from './use-lang';
import s from './privacy.module.css';
import c from './case-obranova.module.css';

export function CaseObraNova() {
  const [lang, setLang] = useLang('en', true);
  const t = CASE_OBRANOVA[lang];
  const sections = t.sections.map((sec, i) => ({ ...sec, id: `s${i + 1}`, n: String(i + 1).padStart(2, '0') }));

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
      <main className={s.main}>
        <header className={s.header}>
          <div className={s.kicker}>{t.kicker}</div>
          <h1 className={s.title}>{t.title}</h1>
          <p className={s.intro}>{t.intro}</p>
          <div className={s.pills}>
            {t.pills.map((pill) => (
              <span key={pill} className={s.pill}>{pill}</span>
            ))}
          </div>
          <div className={c.stats}>
            {t.stats.map((stat) => (
              <div key={stat.label} className={c.stat}>
                <div className={c.statValue}>{stat.v}</div>
                <div className={c.statLabel}>{stat.label}</div>
              </div>
            ))}
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
              {sec.table && (
                <figure className={c.figure}>
                  <div className={c.scroll}>
                    <table className={c.table}>
                      <thead>
                        <tr>
                          {sec.table.head.map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td key={`${row[0]}-${i}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <figcaption className={c.caption}>{sec.table.note}</figcaption>
                </figure>
              )}
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
              {sec.after?.map((para) => (
                <p key={para} className={s.para}>{para}</p>
              ))}
            </section>
          ))}
          <div className={c.ctas}>
            <a href={LINKS.obra} target="_blank" rel="noreferrer" className={c.cta}>{t.visit} ↗</a>
            <Link href="/" className={c.ghost}>{t.home}</Link>
          </div>
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
