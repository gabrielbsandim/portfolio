'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CASES, CASES_UI } from '@/content/cases';
import { CaseShell } from './case-shell';
import { useLang } from './use-lang';
import s from './privacy.module.css';
import c from './cases.module.css';

export function CasesIndex() {
  const [lang, setLang] = useLang('en', true);
  const ui = CASES_UI[lang];

  return (
    <CaseShell lang={lang} setLang={setLang}>
      <header className={s.header}>
        <div className={s.kicker}>{ui.indexKicker}</div>
        <h1 className={`${s.title} ${c.title}`}>{ui.indexTitle}</h1>
        <p className={s.intro}>{ui.indexIntro}</p>
      </header>
      <div className={c.grid}>
        {CASES.map((entry) => {
          const t = entry.copy[lang];
          return (
            <Link key={entry.slug} href={`/cases/${entry.slug}`} className={c.card}>
              <div className={c.cardTop}>
                <Image src={entry.icon} alt={entry.name} width={44} height={44} className={`${c.cardIcon} ${entry.plate ? c.iconPlate : ''}`} />
                <div>
                  <div className={c.cardName}>{entry.name}</div>
                  <div className={c.cardTag}>{t.tag}</div>
                </div>
              </div>
              <div className={c.cardTitle}>{t.title}</div>
              <div className={c.cardStats}>
                {t.stats.slice(0, 2).map((stat) => (
                  <div key={stat.label}>
                    <div className={c.cardStatValue}>{stat.v}</div>
                    <div className={c.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <span className={c.cardCta}>{ui.read} →</span>
            </Link>
          );
        })}
      </div>
    </CaseShell>
  );
}
