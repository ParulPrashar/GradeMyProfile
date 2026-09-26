function scoreColor(score, max) {
  const pct = score / max;
  if (pct >= 0.7) return 'var(--pine)';
  if (pct >= 0.4) return 'var(--gold-text)';
  return 'var(--rust)';
}

export default function ScoreResults({ result, onReset }) {
  return (
    <div>
      <div
        style={{
          padding: '28px 24px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 4,
          marginBottom: 32,
        }}
      >
        <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 4 }}>Overall score</div>
        <div style={{ fontSize: 48, fontFamily: 'var(--serif)', color: 'var(--pine)' }}>
          {result.overall_score}
          <span style={{ fontSize: 20, color: 'var(--ink-muted)' }}>/100</span>
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
        <div key={i} style={{ borderBottom: '1px solid var(--line)', padding: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ fontSize: 16, margin: 0, fontFamily: 'var(--sans)', fontWeight: 600, color: 'var(--ink)' }}>
              {s.name}
            </h3>
            <span style={{ fontWeight: 600, color: scoreColor(s.score, 10) }}>{s.score}/10</span>
          </div>
          {s.whats_working && (
            <p style={{ fontSize: 14, color: 'var(--pine)', marginTop: 8 }}>✓ {s.whats_working}</p>
          )}
          {s.issues?.length > 0 && (
            <ul style={{ fontSize: 14, color: 'var(--ink)', marginTop: 8, paddingLeft: 18 }}>
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
                background: 'var(--paper)',
                borderLeft: '3px solid var(--gold)',
                fontSize: 14,
                fontStyle: 'italic',
              }}
            >
              Try: "{s.rewrite_suggestion}"
            </div>
          )}
        </div>
      ))}

      {result.visual_checklist?.length > 0 && (
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>Worth checking yourself</h2>
          <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', marginBottom: 18 }}>
            Your PDF export doesn't include images, so these can't be scored automatically — quick
            to check by eye on your actual profile.
          </p>
          {result.visual_checklist.map((item, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <h3 style={{ fontSize: 14.5, marginBottom: 3, fontFamily: 'var(--sans)', fontWeight: 600, color: 'var(--ink)' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{item.tip}</p>
            </div>
          ))}
        </div>
      )}

      {onReset && (
        <button onClick={onReset} className="btn btn-secondary" style={{ marginTop: 32 }}>
          Score another profile
        </button>
      )}
    </div>
  );
}
