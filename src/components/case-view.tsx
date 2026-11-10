'use client';

import Link from 'next/link';
import { CASES_UI, findCase } from '@/content/cases';
import { CaseShell } from './case-shell';
import { useLang } from './use-lang';
import s from './privacy.module.css';
import c from './cases.module.css';

export function CaseView({ slug }: { slug: string }) {
  const [lang, setLang] = useLang('en', true);
  const entry = findCase(slug);
  if (!entry) return null;
  const t = entry.copy[lang];
  const ui = CASES_UI[lang];

  return (
    <CaseShell lang={lang} setLang={setLang}>
      <header className={s.header}>
        <Link href="/cases" className={c.crumb}>← {ui.all}</Link>
        <div className={s.kicker}>{ui.kicker} · {entry.name}</div>
        <h1 className={`${s.title} ${c.title}`}>{t.title}</h1>
        <p className={s.intro}>{t.summary}</p>
        <div className={s.pills}>
          {t.meta.map((m) => (
            <span key={m} className={s.pill}>{m}</span>
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
      <div className={`${s.body} ${c.body}`}>
        {t.sections.map((sec) => (
          <section key={sec.t} className={s.section}>
            <h2 className={s.h2}>{sec.t}</h2>
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
                      {sec.table.rows.map((row, r) => (
                        <tr key={row[0]} className={r === sec.table?.pick ? c.pick : undefined}>
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
          {entry.links.map((link, i) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={i === 0 ? c.cta : c.ghost}>
              {link.label[lang]} ↗
            </a>
          ))}
          <Link href="/cases" className={c.ghost}>{ui.all}</Link>
        </div>
      </div>
    </CaseShell>
  );
}
