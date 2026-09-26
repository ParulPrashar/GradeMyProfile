# GradeMyProfile (v1)

Free tool: upload a LinkedIn "Save to PDF" export, get a section-by-section
score plus specific rewrite suggestions — built for college students and
early-career tech talent.

## Site structure

- `/` — marketing homepage
- `/audit` — the actual tool (upload + results)
- `/privacy` — plain-language data handling explanation
- `/api/score` — backend route: extracts PDF text, calls Gemini, returns JSON

## Deploy this yourself

1. **Push this folder to a new GitHub repo.**
   ```
   git init
   git add .
   git commit -m "v1"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import the repo into Vercel** (vercel.com → New Project → import repo).
   Framework preset auto-detects as Next.js — leave defaults as-is.

3. **Add environment variables** in Vercel → Settings → Environment Variables:
   - `GEMINI_API_KEY` — required. Your free Google AI Studio key.
   - `NEXT_PUBLIC_SITE_URL` — recommended. Your real Vercel URL (or custom
     domain), e.g. `https://gradmyprofile.vercel.app`. Used for correct SEO
     metadata and the sitemap. Not secret.

4. **Deploy.** Env vars only apply to new deployments, so redeploy if you
   added them after the first deploy.

## Testing locally first

```
npm install
cp .env.local.example .env.local   # then paste your real key in
npm run dev
```
Visit http://localhost:3000, upload a test PDF, confirm it scores correctly.

## What was verified before this was handed off

- `npm run build` runs clean with no errors
- The exact PDF-extraction code path was tested against a real 8-page
  LinkedIn export — works, no crash
- The scoring rubric was manually run against that same real profile text
  and rendered through the actual results component — output is specific
  and grounded, not generic
- Every page was screenshotted at desktop and mobile widths and reviewed;
  two real bugs (a layout misalignment, a mobile header wrap issue) were
  found this way and fixed
- Color palette contrast was checked against WCAG AA (4.5:1) — one color
  failed as text and was replaced with a compliant shade
- **Not verified from here:** the actual live call to the Gemini API itself,
  since that requires your real key. Test this first thing after deploying.

## Important limitation, by design

LinkedIn's PDF export does not include photos, banners, logos, or Featured
section content — it's text only. So those are **not** scored by AI (an AI
guessing at things it can't see would be worse than not scoring them at
all). Instead they appear as a short manual checklist under the results.
This is intentional, not a missing feature.

## Notes

- `GEMINI_API_KEY` must stay a server-side env var — never expose it in any
  file under `app/` that runs in the browser.
- The scoring prompt lives in `app/api/score/route.js` (`SYSTEM_PROMPT`).
- The results UI is in `app/components/ScoreResults.js`, shared between the
  live tool and any future testing.
- Uses Gemini's free tier (`gemini-3-flash`) — no billing required, subject
  to Google's free-tier rate limits.
