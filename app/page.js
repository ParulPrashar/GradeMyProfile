'use client';

import { useState } from 'react';

function scoreColor(score, max) {
  const pct = score / max;
  if (pct >= 0.7) return 'var(--good)';
  if (pct >= 0.4) return 'var(--warn)';
  return 'var(--bad)';
}

export default function Home() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/score', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong scoring your profile.');
        setStatus('error');
        return;
      }
      setResult(data);
      setStatus('done');
    } catch (err) {
      setErrorMsg('Could not reach the scoring service. Try again in a moment.');
      setStatus('error');
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setStatus('idle');
    setErrorMsg('');
  }

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px 96px' }}>
      <p style={{ fontSize: 13, letterSpacing: '0.02em', color: 'var(--text-muted)', marginBottom: 8 }}>
        A free tool from @CollegeGuide018
      </p>
      <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: '0 0 16px' }}>
        Find out what's actually wrong with your LinkedIn profile.
      </h1>
      <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 520 }}>
        Upload your profile as a PDF and get a section-by-section score, plus
        exact rewrite suggestions — not vague "add more keywords" advice.
      </p>

      {status !== 'done' && (
        <form onSubmit={handleSubmit} style={{ marginTop: 40 }}>
          <label
            htmlFor="pdf-upload"
            style={{
              display: 'block',
              border: `1px dashed var(--line)`,
              borderRadius: 4,
              padding: '32px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--paper-raised)',
            }}
          >
            <div style={{ fontSize: 15, marginBottom: 6 }}>
              {file ? file.name : 'Click to choose your LinkedIn PDF export'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              On your profile: More → Save to PDF
            </div>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </label>

          <button
            type="submit"
            disabled={!file || status === 'loading'}
            style={{
              marginTop: 20,
              width: '100%',
              padding: '14px 20px',
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
              background: !file || status === 'loading' ? '#A9AFC0' : 'var(--ink)',
              border: 'none',
              borderRadius: 4,
              cursor: !file || status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? 'Scoring your profile…' : 'Score my profile'}
          </button>

          {status === 'error' && (
            <p style={{ color: 'var(--bad)', marginTop: 12, fontSize: 14 }}>{errorMsg}</p>
          )}
        </form>
      )}

      {status === 'done' && result && (
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              padding: '28px 24px',
              background: 'var(--paper-raised)',
              border: `1px solid var(--line)`,
              borderRadius: 4,
              marginBottom: 32,
            }}
          >
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
              Overall score
            </div>
            <div style={{ fontSize: 48, fontFamily: 'Fraunces, serif', color: 'var(--ink)' }}>
              {result.overall_score}
              <span style={{ fontSize: 20, color: 'var(--text-muted)' }}>/100</span>
            </div>
          </div>

          <h2 style={{ fontSize: 20, marginBottom: 16 }}>Top priorities</h2>
          <ol style={{ paddingLeft: 20, marginBottom: 40, lineHeight: 1.7 }}>
            {result.top_3_priorities?.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>

          <h2 style={{ fontSize: 20, marginBottom: 16 }}>Section-by-section</h2>
          {result.sections?.map((s, i) => (
            <div
              key={i}
              style={{
                borderBottom: `1px solid var(--line)`,
                padding: '20px 0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 16, margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {s.name}
                </h3>
                <span style={{ fontWeight: 600, color: scoreColor(s.score, 10) }}>
                  {s.score}/10
                </span>
              </div>
              {s.whats_working && (
                <p style={{ fontSize: 14, color: 'var(--good)', marginTop: 8 }}>✓ {s.whats_working}</p>
              )}
              {s.issues?.length > 0 && (
                <ul style={{ fontSize: 14, color: 'var(--text)', marginTop: 8, paddingLeft: 18 }}>
                  {s.issues.map((issue, j) => (
                    <li key={j}>{issue}</li>
                  ))}
                </ul>
              )}
              {s.rewrite_suggestion && (
                <div
                  style={{
                    marginTop: 10,
                    padding: '10px 14px',
                    background: '#F3F1EA',
                    borderLeft: `3px solid var(--gold)`,
                    fontSize: 14,
                    fontStyle: 'italic',
                  }}
                >
                  Try: "{s.rewrite_suggestion}"
                </div>
              )}
            </div>
          ))}

          <button
            onClick={reset}
            style={{
              marginTop: 32,
              padding: '10px 18px',
              fontSize: 14,
              background: 'transparent',
              border: `1px solid var(--ink)`,
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Score another profile
          </button>
        </div>
      )}

      <p style={{ marginTop: 64, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        This is an early free version. Please don't upload anything you wouldn't
        want processed by a third-party AI model.
      </p>
    </main>
  );
}
