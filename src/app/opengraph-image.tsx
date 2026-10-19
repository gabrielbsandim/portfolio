import { ImageResponse } from 'next/og';

export const alt = 'Gabriel Sandim · Product Engineer, Frontend & AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #12313b 0%, #101114 45%)',
          color: '#F3F2EE',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="88" height="88" viewBox="0 0 100 100">
            <path d="M50 14 A36 36 0 1 0 86 50" fill="none" stroke="#F3F2EE" strokeWidth="16" />
            <rect x="50" y="42" width="44" height="16" fill="#F3F2EE" />
            <rect x="64" y="6" width="22" height="22" rx="4" fill="#5CC8E8" />
          </svg>
          <div style={{ display: 'flex', fontSize: 30, color: '#9a9ca5', letterSpacing: 2 }}>gbstec.dev.br</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 132, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            Gabriel Sandim<span style={{ color: '#5CC8E8' }}>.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 44, color: '#c9cad0' }}>
            Product Engineer · Frontend &amp; AI
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#9a9ca5' }}>
          React · TypeScript · AI agents · Founder of GBS Tecnologia
        </div>
      </div>
    ),
    size,
  );
}
