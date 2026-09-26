'use client';

import { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ScoreResults from '../components/ScoreResults';

export default function AuditPage() {
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
        setErrorMsg(data.error || 'Something went wrong scoring your profile. Please try again.');
        setStatus('error');
        return;
      }
      setResult(data);
      setStatus('done');
    } catch (err) {
      setErrorMsg('Could not reach the scoring service. Check your connection and try again.');
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
    <>
      <SiteHeader />
      <main className="wrap" style={{ maxWidth: 640, padding: '56px 24px 96px' }}>
        <h1 style={{ fontSize: 32, lineHeight: 1.15, marginBottom: 14 }}>
          Grade your LinkedIn profile
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 36 }}>
          Upload your profile as a PDF export. Nothing is saved after your results are shown.
        </p>

        {status !== 'done' && (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="pdf-upload"
              style={{
                display: 'block',
                border: '1px dashed var(--line)',
                borderRadius: 4,
                padding: '32px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'var(--surface)',
              }}
            >
              <div style={{ fontSize: 15, marginBottom: 6 }}>
                {file ? file.name : 'Click to choose your LinkedIn PDF export'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                On your profile: More → Save to PDF
              </div>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: 'hidden',
                  clip: 'rect(0,0,0,0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                }}
              />
            </label>

            <button
              type="submit"
              disabled={!file || status === 'loading'}
              className="btn btn-primary"
              style={{
                marginTop: 20,
                width: '100%',
                background: !file || status === 'loading' ? '#9AA79E' : 'var(--pine)',
                cursor: !file || status === 'loading' ? 'not-allowed' : 'pointer',
              }}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? 'Scoring your profile…' : 'Score my profile'}
            </button>

            <div role="status" aria-live="polite">
              {status === 'error' && (
                <p style={{ color: 'var(--rust)', marginTop: 12, fontSize: 14 }}>{errorMsg}</p>
              )}
            </div>
          </form>
        )}

        {status === 'done' && result && <ScoreResults result={result} onReset={reset} />}

        <p style={{ marginTop: 64, fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
          This is an early free version. Please don't upload anything you wouldn't want processed
          by a third-party AI model.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
