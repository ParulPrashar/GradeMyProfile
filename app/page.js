import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

const rubricSections = [
  ['Headline', 'A real identity, not just "Student at X University"'],
  ['Contact info', 'Recruiters can actually reach you'],
  ['About', "Opens with what you're building, easy to read"],
  ['Experience', 'Bullets with real, quantified impact'],
  ['Projects', "What you built, and what it's made of"],
  ['Honors & awards', 'Hackathons, competitions, talks — anything earned'],
  ['Skills', '5+ listed, aligned with what you actually say you do'],
];

const manualCheckItems = [
  ['Photo & banner', 'professional, and not left blank'],
  ['Company logos', 'showing correctly on each role'],
  ['Featured section', 'the most-skipped, highest-leverage spot'],
];

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GradeMyProfile',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Free tool that scores a LinkedIn profile section by section and gives specific rewrite suggestions, built for college students and early-career tech talent.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <main>
        <section
          className="wrap hero"
          style={{ padding: '72px 24px 56px', display: 'grid', gap: 48, alignItems: 'center' }}
        >
          <div>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 14 }}>
              A free tool from @CollegeGuide018
            </p>
            <h1 style={{ fontSize: 44, lineHeight: 1.12, marginBottom: 20, maxWidth: 560 }}>
              Your LinkedIn profile might be costing you interviews.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 460, marginBottom: 28 }}>
              Upload it as a PDF and get a score for every section — headline, About, experience,
              projects — plus exact rewrites you can paste in. Not "add more keywords" advice.
            </p>
            <Link href="/audit" className="btn btn-primary">Grade my profile</Link>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 4, padding: 24, maxWidth: 420 }}>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 10 }}>Headline</p>
            <p style={{ fontSize: 15, textDecoration: 'line-through', color: 'var(--ink-muted)', marginBottom: 10 }}>
              Computer Science Student at XYZ University
            </p>
            <p style={{ fontSize: 15, color: 'var(--pine)', fontWeight: 600, borderBottom: '2px solid var(--gold)', display: 'inline-block', paddingBottom: 2, marginBottom: 16 }}>
              Building applications in MERN | CS @ XYZ University
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ background: 'var(--rust)', color: 'var(--paper)', fontSize: 12, fontWeight: 600, padding: '3px 9px', borderRadius: 3 }}>2/10</span>
              <span style={{ color: 'var(--ink-muted)', fontSize: 13 }}>→</span>
              <span style={{ background: 'var(--pine)', color: 'var(--paper)', fontSize: 12, fontWeight: 600, padding: '3px 9px', borderRadius: 3 }}>target 8+</span>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="wrap" style={{ padding: '56px 24px', borderTop: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: 26, marginBottom: 36 }}>How it works</h2>
          <div className="three-col" style={{ display: 'grid', gap: 32 }}>
            {[
              ['1', 'Export your profile', 'On LinkedIn: More → Save to PDF'],
              ['2', 'Upload it', 'Takes ten seconds. Nothing is saved after you get your results.'],
              ['3', 'Get your grade', 'A score per section, plus exact rewrites you can paste straight in.'],
            ].map(([num, title, body]) => (
              <div key={num}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--gold-text)', marginBottom: 10 }}>{num}</div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap" style={{ padding: '56px 24px', borderTop: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: 26, marginBottom: 8 }}>What gets scored</h2>
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 32, maxWidth: 560 }}>
            Seven sections, scored from your profile text — based on what actually gets profiles
            noticed, not a generic checklist.
          </p>
          <div className="three-col" style={{ display: 'grid', gap: '20px 32px', marginBottom: 40 }}>
            {rubricSections.map(([name, desc]) => (
              <div key={name} style={{ borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                <h3 style={{ fontSize: 15, marginBottom: 4 }}>{name}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 4, padding: '20px 24px', maxWidth: 640 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
              Plus a manual checklist for what a PDF can't show us:
            </p>
            <ul style={{ fontSize: 13.5, color: 'var(--ink-muted)', lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
              {manualCheckItems.map(([name, desc]) => (
                <li key={name}><strong style={{ color: 'var(--ink)' }}>{name}</strong> — {desc}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="wrap" style={{ padding: '56px 24px', borderTop: '1px solid var(--line)' }}>
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Why it's free right now</h2>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 12 }}>
              This is a first version, built to actually be useful before it's polished. It runs on
              a free AI tier, so there's no cost to you and no account to make.
            </p>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              Nothing you upload is stored after you get your results. See exactly how your data is
              handled on the{' '}
              <Link href="/privacy" style={{ color: 'var(--gold-text)', fontWeight: 600 }}>privacy page</Link>.
            </p>
          </div>
        </section>

        <section className="wrap" style={{ padding: '48px 24px 72px' }}>
          <Link href="/audit" className="btn btn-primary">Grade my profile</Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
