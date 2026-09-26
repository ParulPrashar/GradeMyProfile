import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'Privacy — how GradeMyProfile handles your data',
  description: 'A plain-language explanation of what happens to your LinkedIn PDF when you use GradeMyProfile.',
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap" style={{ maxWidth: 640, padding: '56px 24px 96px' }}>
        <h1 style={{ fontSize: 32, marginBottom: 24 }}>Privacy</h1>

        <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 20 }}>
          This is a free, early-stage tool, and the honest details of how it works matter more than
          a long legal document. Here's exactly what happens when you use it.
        </p>

        <h2 style={{ fontSize: 19, marginTop: 32, marginBottom: 10 }}>What we collect</h2>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 20 }}>
          When you upload your LinkedIn PDF, the text is extracted and sent to Google's Gemini API
          to be scored against our rubric. That's the only data involved — there's no account, no
          email collection, and no tracking of who you are.
        </p>

        <h2 style={{ fontSize: 19, marginTop: 32, marginBottom: 10 }}>What we don't do</h2>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 20 }}>
          Nothing is stored in a database. Once your results are shown on screen, we don't keep a
          copy of your profile text or your PDF.
        </p>

        <h2 style={{ fontSize: 19, marginTop: 32, marginBottom: 10 }}>One thing worth knowing</h2>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 20 }}>
          This tool runs on Google's free Gemini API tier. Google's own terms for that free tier
          allow them to use submitted content to improve their models. If there's anything in your
          profile you wouldn't want processed by a third-party AI model on those terms, it's worth
          knowing before you upload.
        </p>

        <h2 style={{ fontSize: 19, marginTop: 32, marginBottom: 10 }}>Questions</h2>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
          Reach out any time at{' '}
          <a href="mailto:parulprashar018@gmail.com" style={{ color: 'var(--gold-text)', fontWeight: 600 }}>
            parulprashar018@gmail.com
          </a>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
