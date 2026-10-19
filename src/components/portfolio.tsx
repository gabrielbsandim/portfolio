'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { COPY, LINKS, SKILLS } from '@/content/portfolio';
import { LangToggle } from './lang-toggle';
import { useLang } from './use-lang';
import s from './portfolio.module.css';

const EASE = 'cubic-bezier(.2,.7,.1,1)';
const ROTATE_MS = 2600;
const COPIED_MS = 1800;
const SKILLS_LOOP = [...SKILLS, ...SKILLS];
const INTRO_FADE: Keyframe[] = [
  { opacity: 0, transform: 'translateY(32px)', filter: 'blur(6px)' },
  { opacity: 1, transform: 'none', filter: 'blur(0)' },
];
const INTRO_SLIDE: Keyframe[] = [{ transform: 'translateY(32px)' }, { transform: 'none' }];

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function countUp(el: HTMLElement) {
  const node = el.firstChild;
  if (!node) return;
  const to = Number(el.dataset.count);
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / 1600);
    node.nodeValue = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function Portfolio() {
  const [lang, setLang] = useLang('en', true);
  const t = COPY[lang];
  const [word, setWord] = useState(0);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGRectElement>(null);
  const shotARef = useRef<HTMLDivElement>(null);
  const shotBRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % 4), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (reducedMotion()) return;
    wordRef.current?.animate([{ transform: 'translateY(100%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 650, easing: EASE });
  }, [word, lang]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(id);
  }, [copied]);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero || reducedMotion()) return;

    const anims: Animation[] = [];
    root.querySelectorAll<HTMLElement>('[data-intro]').forEach((el, i) =>
      anims.push(
        el.animate(el.dataset.intro === 'slide' ? INTRO_SLIDE : INTRO_FADE, {
          duration: 1000, delay: 100 + i * 110, easing: EASE, fill: 'backwards',
        }),
      ),
    );
    const loops: [Element | null, Keyframe[], KeyframeAnimationOptions][] = [
      [cursorRef.current, [{ opacity: 1 }, { opacity: 1, offset: 0.55 }, { opacity: 0.15, offset: 0.6 }, { opacity: 0.15, offset: 0.95 }, { opacity: 1 }], { duration: 1400, iterations: Infinity }],
      [marqueeRef.current, [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 42000, iterations: Infinity }],
      [shotARef.current, [{ transform: 'translateY(0)' }, { transform: 'translateY(-12px)' }, { transform: 'translateY(0)' }], { duration: 7000, iterations: Infinity, easing: 'ease-in-out' }],
      [shotBRef.current, [{ transform: 'translateY(0)' }, { transform: 'translateY(-12px)' }, { transform: 'translateY(0)' }], { duration: 7000, delay: 1200, iterations: Infinity, easing: 'ease-in-out' }],
    ];
    loops.forEach(([el, frames, opts]) => el && anims.push(el.animate(frames, opts)));

    const onMove = (e: PointerEvent) => {
      const b = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${e.clientX - b.left}px`);
      hero.style.setProperty('--my', `${e.clientY - b.top}px`);
    };
    hero.addEventListener('pointermove', onMove);

    const reveal = root.querySelectorAll<HTMLElement>('[data-reveal]');
    reveal.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) el.style.opacity = '0';
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (el.style.opacity !== '0') return;
          el.style.opacity = '';
          el.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 900, easing: EASE, fill: 'backwards' });
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    reveal.forEach((el) => io.observe(el));

    const cio = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          countUp(e.target as HTMLElement);
        }),
      { threshold: 0.5 },
    );
    root.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

    return () => {
      anims.forEach((a) => a.cancel());
      hero.removeEventListener('pointermove', onMove);
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  const copyEmail = () => {
    void navigator.clipboard?.writeText(LINKS.email);
    setCopied(true);
  };

  return (
    <div ref={rootRef} className={s.root}>
      <nav className={s.nav}>
        <div className={s.navInner}>
          <a href="#top" className={s.brand} aria-label="Gabriel Sandim, back to top">
            <svg viewBox="0 0 100 100" className={s.mark} aria-hidden="true">
              <path d="M50 14 A36 36 0 1 0 86 50" fill="none" stroke="#F3F2EE" strokeWidth="16" />
              <rect x="50" y="42" width="44" height="16" fill="#F3F2EE" />
              <rect ref={cursorRef} x="64" y="6" width="22" height="22" rx="4" className={s.markCursor} />
            </svg>
            <span className={s.brandName}>
              <span className={s.brandTitle}>Gabriel Sandim</span>
              <span className={s.brandDomain}>gbstec.dev.br</span>
            </span>
          </a>
          <div className={s.navLinks}>
            <a href="#ai" className={s.navLink}>{t.nav_ai}</a>
            <a href="#experience" className={s.navLink}>{t.nav_exp}</a>
            <a href="#studio" className={s.navLink}>{t.nav_studio}</a>
            <a href="#about" className={s.navLink}>{t.nav_about}</a>
            <LangToggle lang={lang} order={['en', 'pt']} onChange={setLang} />
            <a href="#contact" className={s.navCta}>{t.nav_contact}</a>
          </div>
        </div>
      </nav>

      <header id="top" ref={heroRef} className={s.hero}>
        <div className={s.heroGrid} />
        <div className={s.heroGlow} />
        <div className={s.heroInner}>
          <div data-intro="1" className={s.heroKicker}>
            <span>{t.kicker}</span>
          </div>
          <h1 className={s.heroTitle}>
            <span data-intro="1" className={s.block}>Gabriel</span>
            <span data-intro="1" className={s.outline}>
              Sandim<span className={s.period}>.</span>
            </span>
          </h1>
          <div className={s.heroBottom}>
            <div data-intro="slide" className={s.heroCopy}>
              <p className={s.role}>
                {t.role_prefix}{' '}
                <span className={s.wordClip}>
                  <span ref={wordRef} className={s.word}>{t.words[word]}</span>
                </span>
              </p>
              <p className={s.heroSub}>{t.hero_sub}</p>
              <div className={s.chips}>
                {t.glance.map((g) => (
                  <span key={g} className={s.chip}>{g}</span>
                ))}
              </div>
              <div className={s.ctas}>
                <a href="#ai" className={s.ctaPrimary}>
                  {t.cta_work} <span className={s.mono}>↓</span>
                </a>
                <Link href={LINKS.cv} className={s.ctaGhost}>
                  {t.cta_cv} <span className={s.mono}>→</span>
                </Link>
              </div>
            </div>
            <div data-intro="1" className={s.stats}>
              {t.stats.map((st) => (
                <div key={st.label} className={s.stat}>
                  <div className={s.statValue}>
                    <span>{st.pre}</span>
                    <span data-count={st.n}>{st.n}</span>
                    <span className={s.accent}>{st.suf}</span>
                  </div>
                  <div className={s.statLabel}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className={s.marqueeWrap}>
        <div ref={marqueeRef} className={s.marquee}>
          {SKILLS_LOOP.map((sk, i) => (
            <span key={`${sk}-${i}`} className={s.marqueeItem} aria-hidden={i >= SKILLS.length}>
              {sk}
              <span className={s.diamond} />
            </span>
          ))}
        </div>
      </div>

      <section id="ai" className={s.section}>
        <div data-reveal="1" className={s.sectionHead}>
          <div className={s.sectionHeadMain}>
            <div className={s.eyebrow}>01 / {t.sec_ai}</div>
            <h2 className={s.h2}>{t.ai_title}</h2>
          </div>
          <p className={s.sectionDesc}>{t.ai_desc}</p>
        </div>
        <div className={s.aiGrid}>
          {t.ai_items.map((ai) => (
            <div key={ai.k} data-reveal="1" className={s.aiCard}>
              <div className={s.aiCardTop}>
                <span className={s.aiKey}>{ai.k}</span>
                <span className={s.diamondOutline} />
              </div>
              <div className={s.aiTitle}>{ai.title}</div>
              <p className={s.aiDesc}>{ai.desc}</p>
              <div className={s.aiTags}>{ai.tags}</div>
            </div>
          ))}
        </div>
        <div data-reveal="1" className={s.aiFooter}>
          <div className={s.principles}>
            <div className={s.label}>{t.ai_principles_label}</div>
            <div className={s.principlesGrid}>
              {t.ai_principles.map((pp) => (
                <div key={pp.h} className={s.principle}>
                  <span className={s.principleH}>{pp.h}</span>
                  <span className={s.principleD}>{pp.d}</span>
                </div>
              ))}
            </div>
          </div>
          <a href={LINKS.kit} target="_blank" rel="noreferrer" className={s.proof}>
            <div className={s.proofHead}>
              <img src="/assets/task-funnel-icon.svg" alt="task-funnel" width={40} height={40} className={s.proofIcon} />
              <span className={s.proofRepo}>gabrielbsandim/task-funnel</span>
            </div>
            <p className={s.proofText}>{t.ai_proof}</p>
            <span className={s.proofCta}>{t.ai_proof_cta} ↗</span>
          </a>
        </div>
      </section>

      <section id="experience" className={s.bordered}>
        <div className={s.sectionInner}>
          <div data-reveal="1">
            <div className={s.eyebrow}>02 / {t.sec_exp}</div>
            <h2 className={`${s.h2} ${s.h2Narrow}`}>{t.exp_title}</h2>
          </div>
          <div className={s.jobs}>
            {t.jobs.map((j) => (
              <div key={j.company} data-reveal="1" className={s.job}>
                <div className={s.jobMeta}>
                  <div className={s.jobPeriod}>{j.period}</div>
                  <div className={s.jobCompany}>{j.company}</div>
                  <div className={s.jobRole}>{j.role}</div>
                  <div className={s.jobStack}>
                    {j.stack.map((st) => (
                      <span key={st} className={s.stackTag}>{st}</span>
                    ))}
                  </div>
                </div>
                <div className={s.jobItems}>
                  {j.items.map((it, i) => (
                    <div key={it.h}>
                      {it.g && <div className={s.jobGroup}>{it.g}</div>}
                      <div className={s.jobItem}>
                        <span className={s.jobIndex}>{String(i + 1).padStart(2, '0')}</span>
                        <p className={s.jobText}>
                          <span className={s.jobHead}>{it.h}</span> {it.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="studio" className={`${s.section} ${s.studio}`}>
        <div data-reveal="1" className={s.sectionHead}>
          <div className={s.studioHeadMain}>
            <div className={s.eyebrow}>03 / {t.sec_studio}</div>
            <h2 className={s.h2}>{t.studio_title}</h2>
            <p className={s.studioDesc}>{t.studio_desc}</p>
          </div>
          <div className={s.companyFacts}>
            {t.company_facts.map((cf) => (
              <div key={cf.k} className={s.companyFact}>
                <span className={s.companyKey}>{cf.k}</span>
                <span className={s.companyValue}>{cf.v}</span>
              </div>
            ))}
          </div>
        </div>

        <article data-reveal="1" className={s.obra}>
          <div className={s.obraBody}>
            <div className={s.obraTop}>
              <div className={s.obraHead}>
                <Image src="/assets/obranova-logo.png" alt="Obra Nova" width={60} height={60} className={s.obraLogo} />
                <div>
                  <div className={s.obraName}>Obra Nova</div>
                  <div className={s.obraTag}>{t.obra_tag}</div>
                </div>
              </div>
              <div className={s.obraBadges}>
                <span className={s.liveBadge}>
                  <span className={s.liveDot} />
                  {t.obra_status}
                </span>
                <span className={s.outlineBadge}>{t.obra_app}</span>
              </div>
              <p className={s.obraDesc}>{t.obra_desc}</p>
              <div className={s.obraPoints}>
                {t.obra_points.map((op) => (
                  <div key={op} className={s.obraPoint}>
                    <span className={s.diamondSmall} />
                    {op}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.obraLinks}>
              <a href={LINKS.obra} target="_blank" rel="noreferrer" className={s.obraVisit}>
                {t.visit} <span className={s.mono}>↗</span>
              </a>
              <a href={LINKS.obraPrivacy} target="_blank" rel="noreferrer" className={s.obraPrivacy}>
                {t.privacy}
              </a>
            </div>
          </div>
          <div className={s.obraShots}>
            <div ref={shotARef} className={s.shotA}>
              <div className={s.windowBar}>
                <span className={s.dotRed} />
                <span className={s.dotYellow} />
                <span className={s.dotGreen} />
              </div>
              <Image src="/assets/obranova-financeiro.webp" alt="Obra Nova: Financeiro" width={1600} height={1000} sizes="(max-width: 900px) 92vw, 640px" className={s.shotImg} />
            </div>
            <div ref={shotBRef} className={s.shotB}>
              <Image src="/assets/obranova-cronograma.webp" alt="Obra Nova: Planejado vs Realizado" width={1600} height={700} sizes="(max-width: 900px) 70vw, 420px" className={s.shotImg} />
            </div>
          </div>
        </article>

        <div className={s.products}>
          {t.products.map((p) => (
            <a key={p.name} data-reveal="1" href={p.url} target="_blank" rel="noreferrer" className={s.product}>
              <div className={s.productTop}>
                <Image src={p.icon} alt={p.name} width={48} height={48} className={s.productIcon} />
                <span className={s.productBadge}>{p.badge}</span>
              </div>
              <div>
                <div className={s.productTag}>{p.tag}</div>
                <div className={s.productName}>{p.name}</div>
              </div>
              <p className={s.productDesc}>{p.desc}</p>
              <div className={s.productFoot}>
                <span>{p.stack}</span>
                <span className={s.accent}>{p.cta} ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className={s.about}>
        <div className={s.aboutInner}>
          <div data-reveal="1" className={s.aboutSide}>
            <div className={s.eyebrow}>04 / {t.sec_about}</div>
            <div className={s.portrait}>
              <Image src="/assets/gabriel.jpg" alt="Gabriel Sandim" width={400} height={400} sizes="(max-width: 900px) 92vw, 360px" className={s.portraitImg} />
              <div className={s.portraitTag}>São Paulo · GMT-3</div>
            </div>
          </div>
          <div className={s.aboutMain}>
            <div data-reveal="1">
              <h2 className={s.aboutTitle}>{t.about_title}</h2>
              <p className={s.aboutP}>{t.about_p1}</p>
              <p className={s.aboutP2}>{t.about_p2}</p>
            </div>
            <div data-reveal="1" className={s.facts}>
              {t.facts.map((f) => (
                <div key={f.label} className={s.fact}>
                  <div className={s.label}>{f.label}</div>
                  <div className={s.factTitle}>{f.title}</div>
                  <div className={s.factMeta}>{f.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={s.contact}>
        <div className={s.contactInner}>
          <div data-reveal="1" className={s.eyebrow}>05 / {t.sec_contact}</div>
          <h2 data-reveal="1" className={s.contactTitle}>{t.contact_title}</h2>
          <p data-reveal="1" className={s.contactSub}>{t.contact_sub}</p>
          <div data-reveal="1" className={s.emailRow}>
            <a href={`mailto:${LINKS.email}`} className={s.email}>{LINKS.email}</a>
            <button type="button" onClick={copyEmail} className={s.copyBtn}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <div data-reveal="1" className={s.socials}>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className={s.social}>
              LinkedIn <span className={s.socialHint}>↗</span>
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className={s.social}>
              GitHub <span className={s.socialHint}>↗</span>
            </a>
            <a href={LINKS.cvPdf} target="_blank" rel="noreferrer" className={s.social}>
              {t.cv_short} <span className={s.socialHint}>PDF</span>
            </a>
          </div>
        </div>
        <footer className={s.footer}>
          <div className={s.footerInner}>
            <span>© 2026 GBS Tecnologia da Informação Ltda · CNPJ 44.000.992/0001-22</span>
            <div className={s.footerLinks}>
              <Link href={LINKS.brand}>Brand</Link>
              <Link href={LINKS.privacy}>{t.privacy}</Link>
              <a href="#top">{t.back_top} ↑</a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
