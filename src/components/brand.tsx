'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import s from './brand.module.css';

const EASE = 'cubic-bezier(.65,0,.2,1)';

const TILES = [
  { src: '/assets/gbs-mark-mono.svg', bg: s.tilePaper, size: s.imgSmall },
  { src: '/assets/gbs-mark-signal.svg', bg: s.tileSignal, size: s.imgLarge },
  { src: '/assets/gbs-mark.svg', bg: s.tileInk, size: s.imgLarge },
  { src: '/assets/gbs-mark-light.svg', bg: s.tilePaper, size: s.imgLarge },
];

const FAVICON_SIZES = [88, 56, 32, 16];

const FAMILY = [
  { name: 'GBS Tecnologia', src: '/assets/gbs-mark.svg', icon: '' },
  { name: 'Obra Nova', src: '/assets/obranova-logo.png', icon: s.iconWhite },
  { name: 'Lifedeck', src: '/assets/lifedeck-icon.png', icon: s.iconRound },
  { name: 'Cashdeck', src: '/assets/cashdeck-icon.png', icon: s.iconRound },
];

const COLORS = [
  { name: 'Signal', hex: '#5CC8E8', swatch: s.swatchSignal },
  { name: 'Ink', hex: '#0E1013', swatch: s.swatchInk },
  { name: 'Paper', hex: '#F3F2EE', swatch: s.swatchPaper },
];

const RULES = [
  'Clear space around the mark equals the size of the blue square.',
  'The square is always signal blue, except on a signal-blue background, where it turns paper.',
  'Never rotate, outline or recolor the ring.',
];

const FILES = [
  ['gbs-mark.svg', 'gbs-mark.svg (app / favicon)'],
  ['gbs-mark-light.svg', 'gbs-mark-light.svg'],
  ['gbs-mark-signal.svg', 'gbs-mark-signal.svg'],
  ['gbs-mark-mono.svg', 'gbs-mark-mono.svg'],
  ['gbs-logo-on-dark.svg', 'gbs-logo-on-dark.svg'],
  ['gbs-logo-on-light.svg', 'gbs-logo-on-light.svg'],
] as const;

export function Brand() {
  const arcRef = useRef<SVGPathElement>(null);
  const barRef = useRef<SVGRectElement>(null);
  const pixRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const arc = arcRef.current;
    const bar = barRef.current;
    const pix = pixRef.current;
    if (!arc || !bar || !pix) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const len = arc.getTotalLength();
    arc.style.strokeDasharray = String(len);
    const anims = [
      arc.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration: 1200, easing: EASE, fill: 'backwards', delay: 200,
      }),
      bar.animate(
        [
          { transform: 'scaleX(0)', transformOrigin: '94px 50px' },
          { transform: 'scaleX(1)', transformOrigin: '94px 50px' },
        ],
        { duration: 600, delay: 1200, easing: EASE, fill: 'backwards' },
      ),
      pix.animate([{ transform: 'translate(0,-30px)', opacity: 0 }, { transform: 'none', opacity: 1 }], {
        duration: 700, delay: 1700, easing: 'cubic-bezier(.3,1.6,.5,1)', fill: 'backwards',
      }),
    ];
    return () => anims.forEach((a) => a.cancel());
  }, []);

  return (
    <main className={s.root}>
      <div className={s.top}>
        <div className={s.intro}>
          <div className={s.kicker}>GBS Tecnologia · Brand</div>
          <h1 className={s.title}>The missing piece.</h1>
          <p className={s.lede}>
            A geometric G built from a three-quarter ring and a bar. The quarter that is cut away comes back as a
            single square in signal blue: the pixel, the cursor, the part GBS adds. It works as a monogram on its own,
            carries the full name in a lockup and stays legible at 16px.
          </p>
        </div>
        <Link href="/" className={s.back}>← gbstec.dev.br</Link>
      </div>

      <div className={s.row}>
        <div className={s.hero}>
          <svg viewBox="0 0 100 100" className={s.heroMark} aria-label="GBS mark">
            <path ref={arcRef} d="M50 14 A36 36 0 1 0 86 50" fill="none" stroke="#F3F2EE" strokeWidth="16" />
            <rect ref={barRef} x="50" y="42" width="44" height="16" fill="#F3F2EE" />
            <rect ref={pixRef} x="64" y="6" width="22" height="22" rx="4" fill="#5CC8E8" />
          </svg>
          <div className={s.word}>
            <span className={s.wordName}>GBS</span>
            <span className={s.wordSub}>TECNOLOGIA</span>
          </div>
        </div>
        <div className={s.tiles}>
          {TILES.map((tile) => (
            <div key={tile.src} className={`${s.tile} ${tile.bg}`}>
              <img src={tile.src} alt="" className={tile.size} />
            </div>
          ))}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.lockup}>
          <img src="/assets/gbs-logo-on-light.svg" alt="GBS Tecnologia lockup" className={s.lockupImg} />
        </div>
        <div className={s.card}>
          <div className={s.label}>Favicon &amp; app sizes</div>
          <div className={s.sizes}>
            {FAVICON_SIZES.map((size) => (
              <img key={size} src="/assets/gbs-mark.svg" alt="" width={size} height={size} />
            ))}
          </div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.label}>Family · GBS and its products</div>
        <div className={s.family}>
          {FAMILY.map((item) => (
            <div key={item.name} className={s.member}>
              <img src={item.src} alt="" width={44} height={44} className={item.icon} />
              <span className={s.memberName}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.card}>
          <div className={s.label}>Colors</div>
          <div className={s.colors}>
            {COLORS.map((color) => (
              <div key={color.name} className={s.color}>
                <span className={`${s.swatch} ${color.swatch}`} />
                <span className={s.mono}>{color.name} {color.hex}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.label}>Rules</div>
          {RULES.map((rule) => (
            <span key={rule} className={s.rule}>{rule}</span>
          ))}
        </div>
        <div className={s.card}>
          <div className={s.label}>Files</div>
          {FILES.map(([file, label]) => (
            <a key={file} href={`/assets/${file}`} target="_blank" rel="noreferrer" className={s.file}>
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
