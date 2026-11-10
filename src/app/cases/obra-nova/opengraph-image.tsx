import { ImageResponse } from 'next/og';

export const alt = 'Obra Nova case study: an AI assistant for construction sites, chosen by evals';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STATS = [
  { v: '3.3 s', l: 'median reply' },
  { v: '6.4 s', l: 'p95 reply' },
  { v: '55 → 99.7', l: 'diary extraction' },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          background: 'linear-gradient(135deg, #12313b 0%, #101114 45%)',
          color: '#F3F2EE',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 100 100">
            <path d="M50 14 A36 36 0 1 0 86 50" fill="none" stroke="#F3F2EE" strokeWidth="16" />
            <rect x="50" y="42" width="44" height="16" fill="#F3F2EE" />
            <rect x="64" y="6" width="22" height="22" rx="4" fill="#5CC8E8" />
          </svg>
          <div style={{ display: 'flex', fontSize: 26, color: '#5CC8E8', letterSpacing: 3 }}>CASE STUDY · OBRA NOVA</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            An AI assistant for construction sites, chosen by evals
          </div>
        </div>
        <div style={{ display: 'flex', gap: 56 }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 52, fontWeight: 700 }}>{s.v}</div>
              <div style={{ display: 'flex', fontSize: 24, color: '#9a9ca5' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
