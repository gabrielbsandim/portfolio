'use client';

import type { Lang } from '@/content/portfolio';
import s from './lang-toggle.module.css';

type Props = { lang: Lang; order: Lang[]; onChange: (lang: Lang) => void };

export function LangToggle({ lang, order, onChange }: Props) {
  return (
    <div className={s.toggle} role="group" aria-label="Language">
      {order.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={lang === option}
          className={lang === option ? s.active : s.option}
          onClick={() => onChange(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
