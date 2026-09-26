import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 80 }}>
      <div
        className="wrap"
        style={{
          padding: '32px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: 13,
          color: 'var(--ink-muted)',
        }}
      >
        <span>Built by Parul Prashar — @CollegeGuide018</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/audit">Grade my profile</Link>
        </div>
      </div>
    </footer>
  );
}
