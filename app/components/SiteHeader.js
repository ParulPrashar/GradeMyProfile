import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header style={{ borderBottom: '1px solid var(--line)' }}>
      <div
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <img src="/logo.svg" alt="" width={26} height={26} style={{ borderRadius: 6 }} />
          <span style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 17, color: 'var(--pine)' }}>
            GradeMyProfile
          </span>
        </Link>
        <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <span className="nav-secondary" style={{ display: 'flex', gap: 20 }}>
            <Link href="/#how-it-works" style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
              How it works
            </Link>
            <Link href="/privacy" style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
              Privacy
            </Link>
          </span>
          <Link href="/audit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 14 }}>
            Grade my profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
